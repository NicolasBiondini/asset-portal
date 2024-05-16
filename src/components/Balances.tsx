import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect } from "react";

type Props = {};

function Balances({}: Props) {
  const getBalances = async () => {
    const wsProvider = new WsProvider(
      "wss://asset-hub-polkadot-rpc.dwellir.com/"
    );
    const api = await ApiPromise.create({ provider: wsProvider });

    return api;
  };

  useEffect(() => {
    getBalances()
      .then((api: ApiPromise) => {
        api.query.assets.metadata(100).then((data) => {
          console.log(data.toHuman());
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error trying to fetch the blockchain.");
      });
  }, []);

  return <div>Balances</div>;
}

export default Balances;
