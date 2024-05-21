import { useConnectionState } from "@/data/connection/storage";
import { useWalletState } from "@/data/wallet/storage";
import { useConnection } from "@/hooks/useConnection";
import { AssetMetadata } from "@/types/asset";
import { ApiPromise } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchAssets = async (api: ApiPromise | null) => {
  if (api === null) return [];

  const parsedData: AssetMetadata[] = await api.query.assets.metadata
    .entries()
    .then((data) => {
      return data.map((token) => {
        return {
          id: token[0].toHuman()?.toString().replace(/,/g, "") || "1",
          info: token[1].toHuman() as {
            decimals: string;
            deposit: string;
            isFrozen: false;
            name: string;
            symbol: string;
          },
        };
      });
    });
  parsedData.push({
    id: "DOT",
    info: {
      decimals: "10",
      deposit: "0",
      isFrozen: false,
      name: "DOT",
      symbol: "DOT",
    },
  });
  return parsedData;
};

export const useAssets = () => {
  const { setAssetsMetadata, assetsMetadata } = useWalletState();
  const { api } = useConnectionState();
  const {
    data: assets,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: () => fetchAssets(api),
    enabled: api !== null,
  });

  useEffect(() => {
    if (api !== null) refetch();
  }, [api, refetch]);

  useEffect(() => {
    if (assets !== undefined && assets?.length > 0) {
      setAssetsMetadata(assets);
    }
  }, [assets, setAssetsMetadata]);

  return { isLoading, assetsMetadata };
};
