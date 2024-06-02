import { WIP_IMAGES } from "@/config/constants";
import Image from "next/image";
import React from "react";

type Props = {
  number?: number;
};

function WIP({ number = 0 }: Props) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="font-bold text-2xl text-center">
        {"Apologies 😔, we're still refining this feature 👨‍💻."}
      </h1>
      <h3 className="text-xl text-center">
        {"But trust me, it's going to look "}
        <span className="text-colors-pink-dot font-bold font-unbounded">
          ✨ stunning ✨😅
        </span>
      </h3>
      <Image
        alt="working hard"
        src={WIP_IMAGES[number]}
        width={300}
        height={100}
        priority
        className="w-[100%] h-auto"
      />
    </div>
  );
}

export default WIP;
