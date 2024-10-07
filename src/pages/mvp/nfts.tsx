import Layout from "@/components/Layout";
import WIP from "@/components/WIP";
import React from "react";

type Props = {};

function nfts({}: Props) {
  return (
    <Layout>
      <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
          <div className="flex flex-col">
            <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
              NFTs
            </h1>
            <p className="text-xs">
              View and interact with your various NFTs on AssetHub, engaging
              with the diverse NFT ecosystem.
            </p>
            <p className="text-xs">
              {
                "Discover and engage with your NFT collection within AssetHub's ecosystem."
              }
            </p>
          </div>
          <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
            <WIP number={2} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default nfts;
