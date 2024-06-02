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
import AddAddressModal from "@/components/modals/AddAddressModal";
import { ChevronDown, Wallet } from "lucide-react";
import { shortenAddress } from "@/helpers/shortenAddress";
import { getWalletCopy } from "@/config/wallets.config";
import SelectAddress from "@/components/modals/transfer/SelectAddress";
import SelectAsset from "@/components/modals/SelectAsset";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getAssetIcon } from "@/config/icons.config";

type Props = {};

function TeleportPanel({}: Props) {
  const { api, assetApi } = useConnectionState();
  const {
    address,
    walletList,
    assetsMetadata: assets,
    balances,
  } = useWalletState();
  const {
    pages: {
      teleport: { tokenId, parachainId, amount: tAmount, address: toAddress },
    },
    setTeleportAmount,
  } = useUIState();
  const { toast } = useToast();

  const AssetIcon = getAssetIcon(tokenId);
  const assetInfo =
    assets.length > 0 && assets.filter((asset) => asset.id === tokenId)[0];

  // Check if it's wallet to get wallet Icon
  const isWallet = walletList.filter((wallet) => wallet.address === toAddress);

  const getDisabled = () => {
    if (api === null || assetApi === null || tAmount === "" || tokenId === "")
      return true;
    if (balances[address]) {
      if (
        Number(tAmount) >= Number(balances[address][tokenId]) ||
        Number(tAmount) <= 0
      )
        return true;
      return false;
    }
    return true;
  };

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
          From AssetHub
        </TabsTrigger>
        <TabsTrigger
          value="to"
          className="w-full text-xs md:text-base data-[state=active]:text-white"
        >
          To AssetHub
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
            <form className="flex flex-col w-full max-w-[400px] gap-2 ">
              <div
                className={cn("flex flex-col gap-1 rounded-md w-full relative")}
              >
                <div className="bg-colors-bg-secondary rounded-t-md justify-center ">
                  <p className="text-xs font-bold pt-4 pl-4">
                    {"You're sending"}
                  </p>
                  <Input
                    className={cn(
                      "h-[150px] pb-6 focus-visible:ring-transparent bg-transparent outline-none border-none  text-4xl md:text-6xl font-bold text-center placeholder:text-center text-white caret-colors-pink-dot",
                      {
                        "text-center pr-[50px] placeholder:mr-[-35px]":
                          tAmount === "",
                      }
                    )}
                    value={tAmount}
                    placeholder="0"
                    onChange={(e) => {
                      setTeleportAmount(e.target.value);
                    }}
                    type="number"
                  />
                  {balances[address] && balances[address][tokenId] && (
                    <div className="flex absolute bottom-20 right-5 gap-1 items-center">
                      <Wallet className="w-4 h-4 mb-[1px] text-colors-pink-dot" />
                      <p className="text-sm font-bold text-white">
                        {balances[address][tokenId]}{" "}
                      </p>
                      <p className="text-[10px] font-bold self-end mb-[1px]">
                        {assetInfo && assetInfo.info.symbol}
                      </p>
                    </div>
                  )}
                </div>
                <SelectAsset>
                  <Button className="bg-colors-bg-secondary hover:bg-colors-bg-secondary !h-[60px]  rounded-t-none hover:opacity-70 font-bold justify-between">
                    <div className="flex gap-1 items-center">
                      <AssetIcon className="w-8 h-8" />
                      <p>{assetInfo && assetInfo.info.name}</p>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </Button>
                </SelectAsset>
              </div>

              <SelectAddress>
                <Button className="flex items-center bg-colors-bg-secondary hover:bg-colors-bg-secondary justify-start pt-7 pb-6  hover:opacity-70 font-bold ">
                  {toAddress === "" ? (
                    <p className="text-center w-full">
                      Select destination address
                    </p>
                  ) : isWallet.length > 0 ? (
                    isWallet.map((wallet) => {
                      const Icon = getWalletCopy.getIcon(wallet.walletId);
                      return (
                        <div
                          className="flex gap-1 h-full relative justify-center items-center"
                          key={`wallet-${wallet.address}-button-selected`}
                        >
                          <p className="absolute text-xs text-colors-font-seconday -top-5 left-0">
                            To:{" "}
                          </p>
                          <Icon className="w-5 h-5 mt-2 ml-6" />{" "}
                          <p className="mt-3 text-white">
                            {shortenAddress(toAddress, 16)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="flex gap-1 h-full relative justify-center items-center"
                      key={`toAddress-${toAddress}-button-selected`}
                    >
                      <p className="absolute text-xs text-colors-font-seconday -top-5 left-0">
                        To:{" "}
                      </p>
                      <Wallet className="w-5 h-5 mt-2 ml-6  text-colors-pink-dot" />

                      <p className="mt-3  text-white">
                        {shortenAddress(toAddress, 16)}
                      </p>
                    </div>
                  )}
                </Button>
              </SelectAddress>
              {walletList.filter((wallet) => wallet.address === address)
                .length > 0 ? (
                <Button
                  onClick={handleTransfer}
                  className="py-6 font-bold"
                  disabled={getDisabled()}
                  type="button"
                >
                  Transfer
                </Button>
              ) : (
                <AddAddressModal>
                  <Button className="py-6 font-bold flex gap-1 items-center">
                    <Wallet className="w-4 h-4 " />

                    <p>Connect wallet</p>
                  </Button>
                </AddAddressModal>
              )}
            </form>
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
