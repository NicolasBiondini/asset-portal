import { WIP_IMAGES, WIP_WORDS } from "@/config/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  number?: number;
  size?: "md" | "sm";
};

function WIP({ number = 0, size }: Props) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center ">
      <h1 className="font-bold text-lg md:text-2xl text-center">
        {"Apologies 😔, we're still refining this feature 👨‍💻."}
      </h1>
      <h3 className="text-md md:text-xl text-center">
        {"But trust me, it's going to look "}
        <span className="text-colors-pink-dot font-bold font-unbounded">
          ✨ {WIP_WORDS[number]} ✨😅
        </span>
      </h3>
      <Image
        alt="working hard"
        src={WIP_IMAGES[number]}
        width={300}
        height={100}
        priority
        className={cn(
          "h-auto",
          { "w-[75%]": size !== "md" },
          { "w-[55%]": size !== "sm" },
          { "w-[100%]": !size }
        )}
      />
    </div>
  );
}

export default WIP;
