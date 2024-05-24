import Image from "next/image";
import React from "react";
import PolkadotjsImage from "./assets/Polkadotjs.png";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function PolkadotjsIcon({ className }: Props) {
  return (
    <div className={cn(className, "relative")}>
      <Image
        src={PolkadotjsImage}
        className="object-cover"
        alt="Polkadotjs Icon png"
        fill
        priority
        sizes="16px 16px"
      />
    </div>
  );
}

export default PolkadotjsIcon;
