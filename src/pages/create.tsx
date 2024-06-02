import WIP from "@/components/WIP";
import React from "react";

type Props = {};

function create({}: Props) {
  return (
    <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
        <div className="flex flex-col">
          <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
            Create asset
          </h1>
          <p className="text-xs">
            Empower users to effortlessly create new assets on AssetHub,
            leveraging its permissionless nature.
          </p>
          <p className="text-xs">
            {
              "Explore the simplicity of creating assets on AssetHub's open platform."
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

export default create;
