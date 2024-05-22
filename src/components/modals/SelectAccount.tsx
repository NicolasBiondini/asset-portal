import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { useWalletState } from "@/data/wallet/storage";
import { shortenAddress } from "@/helpers/shortenAddress";

type Props = { children: JSX.Element | JSX.Element[] };

function SelectAccount({ children }: Props) {
  const { addressList, walletList, setAddress } = useWalletState();

  const handleClick = (address: string) => {
    setAddress(address);
  };

  return (
    <Dialog>
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
        <div className="flex flex-col">
          {addressList.map((address) => {
            return (
              <DialogClose key={address} asChild>
                <Button onClick={() => handleClick(address)}>
                  {shortenAddress(address, 9)}
                </Button>
              </DialogClose>
            );
          })}
          {walletList.map((wallet) => {
            return (
              <DialogClose key={wallet} asChild>
                <Button onClick={() => handleClick(wallet)}>
                  {shortenAddress(wallet, 9)}
                </Button>
              </DialogClose>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectAccount;
