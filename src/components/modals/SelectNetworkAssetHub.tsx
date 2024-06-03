import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
import { Web3Key } from "@/types/wallets";
import AccountButton from "../AccountButton";
import { Button } from "../ui/button";
import { AssetHub } from "../icons/assets";

type Props = { children: JSX.Element | JSX.Element[] };

function SelectNetworkAssetHub({ children }: Props) {
  const [open, setOpen] = useState(false);
  const {
    addressList,
    walletList,
    setAddress,
    setLoaded,
    removeAddress,
    address: activeAddress,
  } = useWalletState();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none gap-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-start">
            <p className="font-unbounded text-base">Select network</p>
          </DialogTitle>
          <DialogDescription className="text-xs text-start">
            Pick which network do you want to interact.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button
            variant={"outline"}
            onClick={handleClick}
            className="flex justify-between"
          >
            <div className="flex gap-2 items-center">
              <AssetHub className="w-6 h-6" />
              <p className="text-white font-unbounded font-bold">
                Polkadot Asset Hub
              </p>
            </div>
            <span className="w-2 h-2 animate-pulse rounded-full bg-green-400 flex"></span>
          </Button>
          <Button
            variant={"outline"}
            disabled
            onClick={handleClick}
            className="flex justify-between"
          >
            <div className="flex gap-2 items-center">
              <AssetHub className="w-6 h-6" />
              <p className="text-white font-unbounded font-bold">
                Kusama Asset Hub
              </p>
            </div>
            <span className=" text-white font-bold !font-unbounded items-center justify-center flex">
              Soon 👀
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectNetworkAssetHub;
