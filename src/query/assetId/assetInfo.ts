import { useConnectionState } from "@/data/connection/storage";

import { AssetInfo } from "@/types/asset";
import { ApiPromise } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";

const defaultRes: AssetInfo = {
  accounts: "0",
  admin: "",
  approvals: "0",
  deposit: "0",
  freezer: "",
  isSufficient: false,
  issuer: "",
  minBalance: "0",
  owner: "",
  status: "Inactive",
  sufficients: "0",
  supply: "0",
};

const fetchAssetInfo = async (
  api: ApiPromise | null,
  assetId: string
): Promise<AssetInfo> => {
  if (api === null) return defaultRes;

  try {
    const data = await api.query.assets.asset(assetId).then((data) => {
      const humanData = data.toHuman() as { [key: string]: any };

      return {
        accounts: humanData.accounts ?? "0",
        admin: humanData.admin ?? "",
        approvals: humanData.approvals ?? "0",
        deposit: humanData.deposit ?? "0",
        freezer: humanData.freezer ?? "",
        isSufficient: humanData.isSufficient ?? false,
        issuer: humanData.issuer ?? "",
        minBalance: humanData.minBalance ?? "0",
        owner: humanData.owner ?? "",
        status: humanData.status ?? "Inactive",
        sufficients: humanData.sufficients ?? "0",
        supply: humanData.supply ?? "0",
      } as AssetInfo;
    });

    return data;
  } catch (error) {
    console.log(error);
    return defaultRes;
  }
};

export const useAssetInfo = (assetId: string) => {
  const { api } = useConnectionState();

  const {
    data: assetInfo,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["assetInfo", { id: assetId }],
    queryFn: () => fetchAssetInfo(api, assetId),
  });

  return { isLoading, assetInfo };
};
