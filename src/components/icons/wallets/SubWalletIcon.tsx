import Image from "next/image";
import React from "react";
import SubWalletImage from "./assets/SubWallet.png";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function SubWalletIcon({ className }: Props) {
  return (
    <div className={cn(className, "relative")}>
      <Image
        src={SubWalletImage}
        className="object-cover"
        alt="SubWallet Icon png"
        fill
        priority
        sizes="16px 16px"
      />
    </div>
  );
}

export default SubWalletIcon;
