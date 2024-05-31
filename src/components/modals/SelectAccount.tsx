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

type Props = { children: JSX.Element | JSX.Element[] };

function SelectAccount({ children }: Props) {
  const [open, setOpen] = useState(false);
  const {
    addressList,
    walletList,
    setAddress,
    setLoaded,
    removeAddress,
    address: activeAddress,
  } = useWalletState();

  const handleClick = (address: string) => {
    setAddress(address);
    setOpen(false);
  };

  const handleRemoveWallet = (address: string, walletId?: Web3Key) => {
    setLoaded(false);
    removeAddress(address, walletId);
  };

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
                handleClick={handleClick}
                handleRemove={handleRemoveWallet}
                disabled={address === activeAddress}
              />
            );
          })}
          {walletList.map((wallet) => {
            return (
              <AccountButton
                key={wallet.address}
                address={wallet.address}
                walletId={wallet.walletId}
                handleClick={handleClick}
                handleRemove={handleRemoveWallet}
                disabled={wallet.address === activeAddress}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectAccount;
