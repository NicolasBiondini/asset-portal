import { shortenAddress } from "@/helpers/shortenAddress";
import { CopyIcon, WalletIcon } from "lucide-react";
import React from "react";
import Tooltip from "./Tooltip";
import { Button } from "./ui/button";
import { copyToClipboard } from "@/helpers/copyToClipboard";
import { useToast } from "./ui/use-toast";

type Props = {
  address: string;
};

function AddressPill({ address }: Props) {
  const { toast } = useToast();

  return (
    <div className="w-full h-[32px] md:w-[170px] flex justify-center items-center gap-2 rounded-md bg-colors-bg-secondary border border-colors-bg-light ">
      <Tooltip
        message={"Your active address."}
        className="text-xs font-sans group"
        classNameParent="mt-2"
      >
        <div className="flex items-center">
          <WalletIcon className="w-3 h-3 text-colors-pink-secondary group-hover:text-colors-pink-dot" />
          <p className=" font-sans text-[10px] px-2 md:text-xs ">
            {shortenAddress(address, 6)}
          </p>
        </div>
      </Tooltip>
      <Button
        className="h-full w-[15px] bg-transparent hover:bg-transparent text-colors-font-seconday hover:text-white"
        size={"icon"}
        onClick={() => {
          copyToClipboard(address);
          toast({
            title: "✅ Address copied to clipboard.",
            variant: "success",
          });
        }}
      >
        <CopyIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default AddressPill;
