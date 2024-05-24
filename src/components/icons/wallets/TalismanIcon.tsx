import Image from "next/image";
import React from "react";
import TalismanImage from "./assets/TalismanImage.png";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function TalismanIcon({ className }: Props) {
  return (
    <div className={cn(className, "relative")}>
      <Image
        src={TalismanImage}
        className="object-cover"
        alt="Talisman Icon png"
        fill
        priority
        sizes="16px 16px"
      />
    </div>
  );
}

export default TalismanIcon;
