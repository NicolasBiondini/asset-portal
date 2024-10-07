import Layout from "@/components/Layout";
import TeleportPanel from "@/components/pages/teleport/TeleportPanel";
import React from "react";

type Props = {};

function Teleport({}: Props) {
  return (
    <Layout>
      <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14 ">
        <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
          <div className="flex flex-col">
            <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
              Teleport
            </h1>
            <p className="text-xs">
              Utilizing XCM technology, teleportation allows assets to be sent
              between various parachains connected to AssetHub.
            </p>
            <p className="text-xs">
              {
                "Explore seamless asset movement across connected parachains within AssetHub's ecosystem."
              }
            </p>
          </div>
          <TeleportPanel />
        </div>
      </section>
    </Layout>
  );
}

export default Teleport;
