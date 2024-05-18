import { useUIState } from "@/data/wallet/storage";
import { useConection } from "@/hooks/useConection";
import { AssetMetadata } from "@/types/asset";
import { Balance } from "@/types/balance";
import { ApiPromise } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type DotBalanceResponse = {
  nonce: string;
  consumers: string;
  providers: string;
  data: { flags: string; free: string; frozen: string; reserved: string };
};

const fetchBalances = async (
  api: ApiPromise | null,
  address: string,
  assets: AssetMetadata[],
  setLoaded: (loaded: boolean) => void
) => {
  if (api === null) return {};

  let balances: Balance = {};
  let dotAmount = "0";

  try {
    const { data } = (
      await api.query.system.account(address)
    ).toHuman() as DotBalanceResponse;
    dotAmount = (
      Number(BigInt(data.free.toString().replace(/,/g, ""))) /
      10 ** 10
    ).toFixed(4);
  } catch (error) {
    console.log("Error: ", error);
  }

  // Check if DOT balance is different than zero
  if (dotAmount !== "0") {
    // Add DOT native balance
    balances["3"] = dotAmount;
  }

  for (const asset of assets) {
    const assetId = asset.id;
    try {
      const assetBalance = (
        await api.query.assets.account(Number(assetId), address)
      ).toHuman() as {
        balance: string;
        status: string;
        reason: string;
        extra: null;
      };
      const freeAssetBalanceString = assetBalance.balance
        .toString()
        .replace(/,/g, "");
      const freeAssetBalance =
        Number(BigInt(freeAssetBalanceString)) /
        10 ** Number(asset.info.decimals);
      console.log(
        `Balance del asset ${assetId}: ${freeAssetBalance
          .toFixed(4)
          .toString()} unidades`
      );
      balances[assetId] = freeAssetBalance.toFixed(4).toString();
    } catch (error) {}
  }
  setLoaded(true);
  return balances;
};

export const useBalances = (address: string) => {
  const api = useConection();
  const {
    assetsMetadata,
    setBalances,
    balances: storedBalances,
    setLoaded,
  } = useUIState();
  const {
    data: balances,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["user", "balances"],
    queryFn: () => fetchBalances(api, address, assetsMetadata, setLoaded),
  });

  useEffect(() => {
    if (api !== null && assetsMetadata.length > 0) refetch();
  }, [api, refetch, assetsMetadata]);

  useEffect(() => {
    if (balances !== undefined && Object.keys(balances)?.length > 0) {
      setBalances(balances);
    }
  }, [balances, setBalances]);
};
