import WIP from "@/components/WIP";
import { AssetHub } from "@/components/icons/assets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defiEcosystem } from "@/config/defi.config";
import { Parachain } from "@/types/networks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
              "Access AssetHub's liquidity pools via the swaps feature, facilitating low-fee asset exchanges (with fees directed to the treasury) or just explore the Polkadot DEFI Ecosystem."
            }{" "}
          </p>
          <p className="text-xs">
            {
              "Enjoy efficient asset swaps with AssetHub's built-in liquidity pools and explore our DEFI Ecosystem."
            }
          </p>
        </div>
        <Tabs
          defaultValue="list"
          className=" flex flex-col w-full h-full justify-start gap-2 relative "
        >
          <TabsList className="w-full h-auto">
            <TabsTrigger
              value="list"
              className="w-full text-xs md:text-base data-[state=active]:text-white"
            >
              DEFI Ecosystem
            </TabsTrigger>
            <TabsTrigger
              value="swap"
              className="w-full text-xs md:text-base data-[state=active]:text-white"
            >
              Swap on AssetHub
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="w-full h-full justify-center items-center"
            value="list"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-stretch items-center gap-4 ">
              {defiEcosystem.map((parachain) => (
                <DefiEcosystemCard
                  key={`card=${parachain.name}`}
                  parachain={parachain}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            className="w-full h-full justify-center items-center"
            value="swap"
          >
            <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
              <WIP />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default swap;

const DefiEcosystemCard = ({ parachain }: { parachain: Parachain }) => {
  return (
    <div className="w-full h-[180px] flex flex-col gap-3 justify-center bg-colors-bg-secondary rounded-md py-6 px-6">
      <div className="flex gap-2 flex-col">
        {" "}
        <div className="flex gap-2 items-center justify-start">
          <AssetHub className="w-8 h-8" />
          <h1 className="font-unbounded font-bold text-base text-white">
            {parachain.name}
          </h1>
        </div>
        <p className="text-xs">{parachain.description}</p>
      </div>

      <Link
        href={parachain.link}
        target="_blank"
        className="self-end justify-self-end"
      >
        <Button
          size={"sm"}
          className="!text-[10px] hover:scale-[102%] transition-all !py-0 h-[30px] flex justify-center items-center px-2 gap-1 font-bold font-unbounded"
        >
          <p> Go to {parachain.name}</p> <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};
