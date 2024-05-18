import { RPC_ENDPOINT } from "@/config/constants";
import { useConnectionState } from "@/data/connection/storage";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useConnection = () => {
  const { setApi, api } = useConnectionState();

  const fetchApiData = async () => {
    const wsProvider = new WsProvider(RPC_ENDPOINT);
    const response = await ApiPromise.create({ provider: wsProvider });
    return response;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetchApiData(),
    // Prevent refetch if you already have a connection to the blockchain
    enabled: api === null,
  });

  useEffect(() => {
    if (data !== undefined) {
      setApi(data);
    }
  }, [data, setApi]);
};
