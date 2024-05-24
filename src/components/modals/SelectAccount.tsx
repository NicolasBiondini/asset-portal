import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useWalletState } from "@/data/wallet/storage";
import { shortenAddress } from "@/helpers/shortenAddress";
import { Web3Key } from "@/types/wallets";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { getWalletCopy } from "@/config/wallets.config";
import VisionIcon from "../icons/VisionIcon";
import WalletIcon from "../icons/WalletIcon";

type Props = { children: JSX.Element | JSX.Element[] };

function SelectAccount({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { addressList, walletList } = useWalletState();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none gap-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-start">
            <p className="font-unbounded text-base">Select your address.</p>
          </DialogTitle>
          <DialogDescription className="text-xs text-start">
            Pick which address do you want to interact.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {addressList.map((address) => {
            return (
              <AccountButton
                key={address}
                address={address}
                handleClose={() => {
                  setOpen(false);
                }}
              />
            );
          })}
          {walletList.map((wallet) => {
            return (
              <AccountButton
                key={wallet.address}
                address={wallet.address}
                walletId={wallet.walletId}
                handleClose={() => {
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectAccount;

const AccountButton = ({
  address,
  walletId,
  handleClose,
}: {
  address: string;
  walletId?: Web3Key;
  handleClose: () => void;
}) => {
  const {
    setAddress,
    address: activeAddress,
    removeAddress,
    setLoaded,
  } = useWalletState();
  const Icon = walletId && getWalletCopy.getIcon(walletId);

  const handleClick = (address: string) => {
    setAddress(address);
    handleClose();
  };

  const handleRemoveWallet = (address: string, walletId?: Web3Key) => {
    setLoaded(false);
    removeAddress(address, walletId);
  };

  return (
    <div className="w-full flex gap-1 items-stretch">
      <Button
        variant={"outline"}
        disabled={address === activeAddress}
        className="w-full flex items-center justify-between bg-colors-bg-light text-colors-font-primary hover:text-white hover:bg-colors-bg-secondary border-transparent"
        onClick={() => handleClick(address)}
      >
        <div className="flex items-center  gap-2 justify-center">
          {walletId && Icon !== undefined ? (
            <Icon className="w-4 h-4" />
          ) : (
            <WalletIcon className="!w-4 !h-4 text-colors-pink-dot" />
          )}
          <p className="p-0 m-0 mt-[2px]">{shortenAddress(address, 9)}</p>
          {!walletId && (
            <Badge
              variant="outline"
              className="h-4 px-2 !text-xs border-yellow-500 font-light text-yellow-500 "
            >
              Read only
            </Badge>
          )}
        </div>

        {activeAddress === address && (
          <Badge
            variant="outline"
            className="h-4 px-2 !text-xs border-green-400 font-normal text-green-400 "
          >
            Active
          </Badge>
        )}
      </Button>
      <Button
        onClick={() => handleRemoveWallet(address, walletId)}
        className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-transparent text-card-foreground text-colors-font-seconday hover:text-red-600 hover:scale-[102%] transition-all hover:bg-card  h-full"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
