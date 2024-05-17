import { RPC_ENDPOINT } from "@/config/constants";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useState } from "react";

export const useConection = () => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  useEffect(() => {
    const wsProvider = new WsProvider(RPC_ENDPOINT);
    ApiPromise.create({ provider: wsProvider })
      .then((response) => {
        setApi(response);
      })
      .catch((err) => {
        console.log(err);
        console.log("Something went worng with the RPC connection.");
      });
  }, []);

  return api;
};
