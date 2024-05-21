import { useWalletState } from "@/data/wallet/storage";
import { useAssets } from "@/query/wallet/assets";
import { useBalances } from "@/query/wallet/balances";
import { AssetMetadata } from "@/types/asset";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import { useUIState } from "@/data/ui/storage";

type Props = {};

function Balances({}: Props) {
  const [inputValue, setInputValue] = useState("");
  const { loaded, balances, address, addressList, setAddress, setAddressList } =
    useWalletState();
  const { assetsMetadata: assets } = useAssets();
  const { mode, setMode } = useUIState();

  const handleClick = () => {
    setAddressList(inputValue);
  };

  useBalances();

  return (
    <div>
      <Button
        onClick={() => {
          if (mode === "dark") {
            setMode("light");
          } else {
            setMode("dark");
          }
        }}
      >
        Click change mode
      </Button>
      <p className="text-colors-pink-dot">Balances</p>
      <div className="bg-card w-full h-8">hello world</div>
      <div className="flex flex-col gap-2">
        {addressList.map((address) => {
          return (
            <button onClick={() => setAddress(address)} key={address}>
              {address}
            </button>
          );
        })}
      </div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button variant={"outline"} onClick={handleClick}>
          Set address
        </Button>
      </div>
      <div className="flex flex-col gap-7">
        {assets.length === 0 ? (
          <h1 className="text-secondary-pink">Loading..</h1>
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
                      <p className="text-dot-pink">
                        Balance: {balances[asset.id] || "0"}
                      </p>
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
