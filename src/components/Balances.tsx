import { useUIState } from "@/data/wallet/storage";
import { useAssets } from "@/query/wallet/assets";
import { useBalances } from "@/query/wallet/balances";
import { AssetMetadata } from "@/types/asset";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useState } from "react";

type Props = {};

function Balances({}: Props) {
  const [inputValue, setInputValue] = useState("");
  const { loaded, balances, address, setAddressList } = useUIState();
  const { assetsMetadata: assets } = useAssets();

  const handleClick = () => {
    setAddressList(inputValue);
  };

  //
  useBalances();

  return (
    <div>
      <p>Balances</p>
      <div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={handleClick}>Set address</button>
      </div>
      <div className="flex flex-col gap-7">
        {assets.length === 0 ? (
          <h1>Loading..</h1>
        ) : (
          assets
            .sort((a, b) => {
              const balanceA = Number(balances[a.id]) || 0;
              const balanceB = Number(balances[b.id]) || 0;
              return balanceB - balanceA; // Sort in descending order based on balance
            })
            .map((asset) => {
              return (
                <div key={asset.id} className="w-full gap-2 flex flex-col">
                  <p>Symbol: {asset.info.symbol}</p>
                  <p>Name: {asset.info.name}</p>
                  <p>Decimals: {asset.info.decimals}</p>
                  <p>Id: {asset.id}</p>
                  {address !== "" ? (
                    loaded ? (
                      <p>Balance: {balances[asset.id] || "0"}</p>
                    ) : (
                      <p>Balance: loading...</p>
                    )
                  ) : (
                    <p>Balance: 0</p>
                  )}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Balances;
