import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useConnectionState } from "@/data/connection/storage";
import { useUIState } from "@/data/ui/storage";
import { useWalletState } from "@/data/wallet/storage";
import { convertBigInt } from "@/helpers/convertBigInt";
import { parseAddress } from "@/helpers/parseAddress";
import { transfer } from "@/methods";
import React from "react";

type Props = {};

function Teleport({}: Props) {
  const { api, assetApi } = useConnectionState();
  const { address, walletList } = useWalletState();
  const {
    pages: {
      teleport: { tokenId, parachainId, amount: tAmount, address: toAddress },
    },
  } = useUIState();
  const { toast } = useToast();

  const handleTransfer = async () => {
    if (api === null || assetApi === null) return;
    const amount = convertBigInt(tAmount);

    const injector = walletList.filter((w) => w.address === address)[0]
      .injected;
    const res = await transfer({
      assetApi,
      sender: {
        address,
        injector,
      },
      txInfo: {
        amount,
        tokenId,
        address: parseAddress(toAddress, 5),
      },
      parachainId,
    });
    if (res.status === "error")
      return toast({
        title: "Error sending.",
        variant: "destructive",
      });
    toast({
      title: "Successfull sending.",
      description: `Hash:  ${res.hash}`,
      variant: "success",
    });
  };

  return (
    <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
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
        <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
          <div className="flex">
            {api === null ? (
              <h1>loading ...</h1>
            ) : (
              <Button onClick={handleTransfer}>Teleport 0.1 DOT</Button>
            )}
          </div>{" "}
        </div>
      </div>
    </section>
  );
}

export default Teleport;
