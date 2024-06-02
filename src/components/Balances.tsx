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
import { DotIcon, SearchIcon } from "lucide-react";
import DedIcon from "./icons/assets/DedIcon";
import { getAssetIcon } from "@/config/icons.config";
import { Input } from "./ui/input";
import { parseAddress } from "@/helpers/parseAddress";

type Props = {};

function Balances({}: Props) {
  const [search, setSearch] = useState("");
  const { balances, address, assetsMetadata: assets } = useWalletState();

  return (
    <section className="flex flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
            Balances
          </h1>
          <p className="text-xs">
            Here you can check your balances on AssetHub.
          </p>
          <p className="text-xs">
            Please remember to always carefully check the assetId. AssetHub is
            permissionless, allowing anyone to create a new asset.
          </p>
        </div>
        <div className="flex w-full justify-center ">
          <Input
            StartIcon={() => (
              <SearchIcon className="absolute left-2 top-1/2 transform transition-all -translate-y-1/2 h-5 w-5 text-colors-font-primary peer-focus:text-colors-pink-dot" />
            )}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search asset by Name, Symbol or ID"
            className="max-w-[500px] font-bold text-white !outline-colors-pink-secondary"
          />
        </div>
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex justify-between font-bold px-4 text-colors-font-seconday">
            <p>Asset</p>
            <p>Balance</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {assets.length === 0 ? (
              <AssetSkeleton />
            ) : (
              assets
                .filter(
                  // Search asset
                  (asset) =>
                    asset.id.toLowerCase().includes(search.toLowerCase()) ||
                    asset.info.symbol
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    asset.info.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => {
                  // Sort by id
                  if (a.id === "DOT") return -1;
                  if (b.id === "DOT") return 1;
                  const numA = parseInt(a.id, 10);
                  const numB = parseInt(b.id, 10);

                  return numA - numB;
                })
                .sort((a, b) => {
                  const balanceA = balances[address]
                    ? Number(balances[address][a.id])
                    : 0;
                  const balanceB = balances[address]
                    ? Number(balances[address][b.id])
                    : 0;
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
    <div className="w-full gap-2  flex items-center justify-between px-4 py-2 border rounded-lg border-colors-pink-secondary">
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
        loaded && !!balances[address] ? (
          <p className="text-white font-bold ">
            {balances[address][id] || "0"}{" "}
            <span className="text-[10px] font-light text-colors-font-primary">
              {symbol}
            </span>
          </p>
        ) : (
          <div className="animate-pulse">
            <div className="h-6 bg-colors-grey-line rounded-md w-[70px]"></div>
          </div>
        )
      ) : (
        <p className="text-white font-bold">
          0{" "}
          <span className="text-[10px] font-light text-colors-font-primary">
            {symbol}
          </span>
        </p>
      )}
    </div>
  );
};

// Loader
const AssetSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 gap-2">
      {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => {
        return (
          <div
            key={`${item}-skeleton`}
            className="h-11 bg-colors-grey-line rounded-lg w-full px-4 py-2"
          ></div>
        );
      })}
    </div>
  );
};
