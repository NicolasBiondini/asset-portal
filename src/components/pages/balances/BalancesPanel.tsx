import { useWalletState } from "@/data/wallet/storage";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../../ui/input";
import Skeleton from "./Skeleton";
import AssetCard from "./AssetCard";
import { mainAssets } from "@/config/assets.config";
import { Switch } from "@/components/ui/switch";

type Props = {};

function BalancesPanel({}: Props) {
  const [onlyBalance, setOnlyBalance] = useState(false);
  const [search, setSearch] = useState("");
  const { balances, address, assetsMetadata: assets } = useWalletState();

  return (
    <section className="flex h-full flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
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
          <div className="w-full flex justify-end py-4 items-center gap-2">
            <Switch
              className="w-7 h-4"
              checked={onlyBalance}
              onCheckedChange={() => setOnlyBalance(!onlyBalance)}
            />
            <p className="text-xs">Hide empty balances</p>
          </div>
          <div className="flex justify-between font-bold px-4 text-colors-font-seconday">
            <p>Asset</p>
            <p>Balance</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {assets.length === 0 ? (
              <Skeleton />
            ) : (
              assets
                .filter((asset) =>
                  onlyBalance ? Number(balances[address][asset.id]) > 0 : true
                )
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
                  if (a.id === "DOT") return -1;
                  if (b.id === "DOT") return 1;

                  const aIsMainAsset = mainAssets.includes(a.id);
                  const bIsMainAsset = mainAssets.includes(b.id);

                  if (aIsMainAsset && !bIsMainAsset) {
                    return -1;
                  } else if (!aIsMainAsset && bIsMainAsset) {
                    return 1;
                  } else {
                    return 0;
                  }
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

export default BalancesPanel;
