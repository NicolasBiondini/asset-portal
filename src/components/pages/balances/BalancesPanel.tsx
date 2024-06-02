import { useWalletState } from "@/data/wallet/storage";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../../ui/input";
import Skeleton from "./Skeleton";
import AssetCard from "./AssetCard";

type Props = {};

function BalancesPanel({}: Props) {
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
              <Skeleton />
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

export default BalancesPanel;
