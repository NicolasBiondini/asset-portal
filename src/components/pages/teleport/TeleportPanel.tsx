import WIP from "@/components/WIP";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useConnectionState } from "@/data/connection/storage";
import { useUIState } from "@/data/ui/storage";
import { useWalletState } from "@/data/wallet/storage";
import { convertBigInt } from "@/helpers/convertBigInt";
import { parseAddress } from "@/helpers/parseAddress";
import { transfer } from "@/methods";
import { Skeleton } from "./Skeleton";

type Props = {};

function TeleportPanel({}: Props) {
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
    <Tabs
      defaultValue="from"
      className=" flex flex-col w-full h-full justify-start gap-2 relative "
    >
      <TabsList className="w-full h-auto">
        <TabsTrigger
          value="from"
          className="w-full text-xs md:text-base data-[state=active]:text-white"
        >
          Send from AssetHub
        </TabsTrigger>
        <TabsTrigger
          value="to"
          className="w-full text-xs md:text-base data-[state=active]:text-white"
        >
          Receive on AssetHub
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className="w-full h-full justify-center items-center"
        value="from"
      >
        <div className="flex flex-col w-full h-full justify-center items-center  ">
          {api === null ? (
            <Skeleton />
          ) : (
            <Button onClick={handleTransfer}>Teleport 0.1 DOT</Button>
          )}
        </div>{" "}
      </TabsContent>
      <TabsContent
        className="w-full h-full justify-center items-center"
        value="to"
      >
        <div className="flex justify-center w-full h-full items-center">
          {api === null ? <Skeleton /> : <WIP number={1} size="sm" />}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default TeleportPanel;
