import { RPC_ENDPOINT } from "@/config/constants";
import { useConnectionState } from "@/data/connection/storage";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  AssetTransferApi,
  constructApiPromise,
} from "@substrate/asset-transfer-api";

export const useConnection = () => {
  const { setApi, setAssetApi, api } = useConnectionState();

  const fetchApiData = async () => {
    // Get connection
    const { api, specName, safeXcmVersion } = await constructApiPromise(
      RPC_ENDPOINT
    );
    // Create a new asset api to call transfer methods
    const assetsApi = new AssetTransferApi(api, specName, safeXcmVersion);

    return { api, assetsApi };
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetchApiData(),
    // Prevent refetch if you already have a connection to the blockchain
    enabled: api === null,
  });

  useEffect(() => {
    if (data !== undefined) {
      setApi(data.api);
      setAssetApi(data.assetsApi);
    }
  }, [data, setApi, setAssetApi]);
};
