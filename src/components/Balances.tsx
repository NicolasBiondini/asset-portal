import { useWalletState } from "@/data/wallet/storage";
import { useAssets } from "@/query/wallet/assets";
import { useBalances } from "@/query/wallet/balances";
import { AssetMetadata } from "@/types/asset";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import { useUIState } from "@/data/ui/storage";
import AssetHub from "./icons/assets/AssetHub";
import { Badge } from "@/components/ui/badge";
import Tooltip from "./Tooltip";
import { DotIcon } from "lucide-react";
import DedIcon from "./icons/assets/DedIcon";
import { getAssetIcon } from "@/config/icons.config";

type Props = {};

function Balances({}: Props) {
  const { loaded, balances, address, addressList, setAddress, setAddressList } =
    useWalletState();
  const { assetsMetadata: assets } = useAssets();
  const { mode, setMode } = useUIState();

  // 14WBztUYmmqMgKuNbFPm4wYcx5JKNJ8z6iQCebKeA6s3tc9i
  // 14QEc4vzVLetpPVGXY558rf3BoMo16RTSL2Y9gynikUW4joZ
  useBalances();

  return (
    <section className="flex flex-col gap-8 w-full">
      {/* <Button
        onClick={() => {
          if (mode === "dark") {
            setMode("light");
          } else {
            setMode("dark");
          }
        }}
      >
        Click change mode
      </Button> */}
      {/* <div className="flex flex-col gap-2">
        {addressList.map((address) => {
          return (
            <button onClick={() => setAddress(address)} key={address}>
              {address}
            </button>
          );
        })}
      </div> */}
      <h1 className="text-colors-pink-dot text-2xl font-bold">Balances</h1>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between font-bold px-4 text-colors-font-seconday">
          <p>Asset</p>
          <p>Balance</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
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
                  <AssetCard
                    key={asset.id}
                    id={asset.id}
                    symbol={asset.info.symbol}
                    name={asset.info.name}
                    decimals={asset.info.decimals}
                  />
                );
              })
          )}
        </div>
      </div>
    </section>
  );
}

export default Balances;

// Asset card component
const AssetCard = ({
  id,
  symbol,
  name,
}: {
  id: string;
  symbol: string;
  name: string;
  decimals: string;
}) => {
  const { loaded, balances, address } = useWalletState();
  const AssetIcon = getAssetIcon(id);
  return (
    <div className="w-full gap-2 flex items-center justify-between px-4 py-2 border rounded-lg border-colors-pink-secondary">
      <div className="flex gap-2  items-center">
        <AssetIcon className="w-7 h-7" />
        <p className="font-bold text-white ">{symbol}</p>
        <Tooltip message={name}>
          <Badge variant="default" className="h-5 !text-xs">
            {id === "DOT" ? "Native" : `#${id}`}
          </Badge>
        </Tooltip>
      </div>
      {address !== "" ? (
        loaded ? (
          <p className="text-white font-bold ">{balances[id] || "0"}</p>
        ) : (
          <p className=" ">loading...</p>
        )
      ) : (
        <p className="text-white font-bold">0</p>
      )}
    </div>
  );
};
