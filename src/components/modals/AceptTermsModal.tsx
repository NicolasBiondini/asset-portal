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
import KusamaAssetHubIcon from "../icons/networks/KusamaAssetHubIcon";
import Link from "next/link";
import { SUB_MENU_LINKS } from "@/config/constants";
import { useRouter } from "next/router";
import { useUIState } from "@/data/ui/storage";

type Props = {
  open: boolean;
  handleClick: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AcceptTermsModal({ open, handleClick, setOpen }: Props) {
  const {
    addressList,
    walletList,
    setAddress,
    setLoaded,
    removeAddress,
    address: activeAddress,
  } = useWalletState();
  const { setTermsAccepted } = useUIState();
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className="dark border-none gap-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-start">
            <p className="font-unbounded text-base">Disclaimer</p>
          </DialogTitle>
          <DialogDescription className="text-xs text-start flex flex-col gap-2">
            <p>
              By using AssetPortal, you acknowledge and accept the following
              terms:
            </p>
            <ol className="flex flex-col gap-1 pl-5">
              <li>
                <strong>Responsibility:</strong> You are solely responsible for
                using AssetPortal.
              </li>
              <li>
                <strong>MVP Status:</strong> You understand that this is merely
                a Minimum Viable Product (MVP) and a simple demo.
              </li>
              <li>
                <strong>Open Source:</strong> AssetPortal is completely open
                source. You can view the source code{" "}
                <Link
                  href={SUB_MENU_LINKS[0].link}
                  target="_blank"
                  className="text-colors-pink-dot underline hover:text-colors-pink-secondary transition-all"
                >
                  here
                </Link>
                .
              </li>
              <li>
                <strong>Wallet Usage:</strong> Do not use wallets containing
                valuable assets or amounts you are not willing to lose, as we
                are not liable for any issues that may arise.
              </li>
              <li>
                <strong>Understanding and Acceptance:</strong> You fully
                understand the functionality of the app and accept all
                consequences of its use.
              </li>
            </ol>{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-2">
          <Button
            variant={"outline"}
            onClick={handleBack}
            className="flex w-full "
          >
            Reject
          </Button>
          <Button
            onClick={() => {
              setTermsAccepted(true);
              handleClick();
            }}
            className="flex w-full "
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AcceptTermsModal;
