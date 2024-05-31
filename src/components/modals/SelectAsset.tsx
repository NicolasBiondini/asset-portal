import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
import { isValidAddress } from "@/helpers/isValidAddress";
import { useUIState } from "@/data/ui/storage";
import { parseAddress } from "@/helpers/parseAddress";
import AccountButton from "@/components/AccountButton";
import { SearchIcon } from "lucide-react";
import { mainAssets } from "@/config/assets.config";
import { Badge } from "../ui/badge";
import { AssetMetadata } from "@/types/asset";
import { getAssetIcon } from "@/config/icons.config";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function SelectAsset({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const {
    walletList,
    addressList,
    balances,
    address,
    assetsMetadata: assets,
  } = useWalletState();
  const {
    setTransferTokenId,
    pages: {
      transfer: { address: toAddress },
    },
  } = useUIState();

  const selectAsset = (assetId: string) => {
    setTransferTokenId(assetId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none max-w-[400px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-foreground pt-4">
            <p className="font-unbounded"> Select asset</p>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please input your address to be able to see your assets on AssetHub.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full gap-4 flex flex-col px-2 py-2">
          <MainAssets assets={assets} selectAsset={selectAsset} />
          <div className="flex w-full  justify-center ">
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
          <div className="h-[200px] overflow-y-auto flex flex-col w-full">
            {assets.length > 0 &&
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
                  const AssetIcon = getAssetIcon(asset.id);

                  return (
                    <Button
                      onClick={() => {
                        selectAsset(asset.id);
                      }}
                      variant={"ghost"}
                      className="text-white w-full flex py-6 justify-start"
                      key={`showasset-modal-selectasset-${asset.id}`}
                    >
                      <div className="flex gap-2 justify-center items-center">
                        <AssetIcon className="w-10 h-10" />
                        <div className="flex flex-col gap-0 items-start">
                          <p className="!p-0 !m-0 text-[12px] font-bold !-mb-[6px]">
                            {asset.info.symbol}
                          </p>
                          <p className="text-[8px] text-colors-font-seconday ">
                            {asset.info.symbol}
                          </p>
                        </div>
                      </div>
                    </Button>
                  );
                })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectAsset;

const MainAssets = ({
  assets,
  selectAsset,
}: {
  assets: AssetMetadata[];
  selectAsset: (assetId: string) => void;
}) => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {assets
        .filter((asset) => mainAssets.includes(asset.id))
        .map((asset) => {
          const AssetIcon = getAssetIcon(asset.id);

          return (
            <Button
              onClick={() => {
                selectAsset(asset.id);
              }}
              size={"sm"}
              variant={"outline"}
              className="text-xs px-3 !py-1 h-[30px] gap-1 font-bold text-white"
              key={`mainAsset-${asset.id}`}
            >
              <AssetIcon className="w-5 h-5" />
              <p>{asset.info.name}</p>
            </Button>
          );
        })}
    </div>
  );
};
