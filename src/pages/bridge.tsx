import WIP from "@/components/WIP";
import React from "react";

type Props = {};

function bridge({}: Props) {
  return (
    <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
        <div className="flex flex-col">
          <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
            Bridge
          </h1>
          <p className="text-xs">
            The Polkadot-Kusama bridge enables seamless asset transfers between
            interconnected parachains within the Polkadot and Kusama ecosystems.{" "}
          </p>
          <p className="text-xs">
            {
              "Explore effortless asset movement across these networks, leveraging the bridge infrastructure."
            }
          </p>
        </div>
        <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
          <WIP number={3} />
        </div>
      </div>
    </section>
  );
}

export default bridge;
