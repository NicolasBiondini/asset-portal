import WIP from "@/components/WIP";
import React from "react";

type Props = {};

function swap({}: Props) {
  return (
    <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
        <div className="flex flex-col">
          <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
            Swap
          </h1>
          <p className="text-xs">
            {
              "Access AssetHub's liquidity pools via the swaps feature, facilitating low-fee asset exchanges (with fees directed to the treasury)."
            }{" "}
          </p>
          <p className="text-xs">
            {
              "Enjoy efficient asset swaps with AssetHub's built-in liquidity pools."
            }
          </p>
        </div>
        <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
          <WIP />
        </div>
      </div>
    </section>
  );
}

export default swap;
