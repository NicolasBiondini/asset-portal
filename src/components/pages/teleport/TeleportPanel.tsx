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
import { ChevronDown, ExternalLink, Info, Wallet } from "lucide-react";
import { shortenAddress } from "@/helpers/shortenAddress";
import { getWalletCopy } from "@/config/wallets.config";
import SelectAddress from "@/components/modals/transfer/SelectAddress";
import SelectAsset from "@/components/modals/SelectAsset";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getAssetIcon, getNetworkIcon } from "@/config/icons.config";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import Tooltip from "@/components/Tooltip";
import { getNetworkInfo } from "@/config/networks.config";
import SelectToNetwork from "@/components/modals/teleport/SelectToNetwork";
import { useInvalidate } from "@/query/invalidate";
import Link from "next/link";
import { LINKS } from "@/config/constants";
import { ToastAction } from "@radix-ui/react-toast";
import Spinner from "@/components/ui/spinner";

type Props = {};

function TeleportPanel({}: Props) {
  const [checked, setChecked] = useState(false);
  const { api, assetApi, safeXcmVersion } = useConnectionState();
  const { invalidateBalancesQuery } = useInvalidate();

  const {
    address,
    wallet,
    walletList,
    assetsMetadata: assets,
    balances,
  } = useWalletState();
  const {
    pages: {
      teleport: { tokenId, parachainId, amount: tAmount, address: toAddress },
    },
    setTeleportAmount,
    setTeleportAddress,
  } = useUIState();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const NetworkIcon = getNetworkIcon(parachainId);

  const AssetIcon = getAssetIcon(tokenId);
  const assetInfo =
    assets.length > 0 && assets.filter((asset) => asset.id === tokenId)[0];

  const networkInfo = getNetworkInfo(parachainId);

  // Check if it's wallet to get wallet Icon
  const isWallet =
    toAddress !== "" && wallet?.address === parseAddress(toAddress)
      ? wallet
      : false;

  const Icon = !!isWallet && getWalletCopy.getIcon(isWallet.walletId);

  const getDisabled = () => {
    if (sending) return true;
    if (api === null || assetApi === null || tAmount === "" || tokenId === "")
      return true;
    if (balances[address]) {
      if (
        Number(tAmount) >= Number(balances[address][tokenId]) ||
        Number(tAmount) <= 0
      )
        return true;
      if (toAddress === "" && checked) return true;
      return false;
    }
    return true;
  };
  const handleToast = () => {
    toast({
      title: `⌛️ Teleporting ${tAmount} ${assetInfo && assetInfo.info.symbol}`,
      description: `Teleporting to ${networkInfo.name}, please wait.`,
      variant: "default",
      duration: 70000000,
    });
  };

  const handleTransfer = async () => {
    if (api === null || assetApi === null || !assetInfo || !address) return;
    const amount = convertBigInt(tAmount, Number(assetInfo.info.decimals));

    const injector =
      !!wallet && wallet.address === address ? wallet.injected : false;
    if (!injector) return;
    setSending(true);

    const result = await transfer({
      assetApi,
      sender: {
        address,
        injector,
      },
      txInfo: {
        amount,
        tokenId,
        address:
          toAddress === "" || !checked
            ? parseAddress(address, networkInfo.prefix)
            : toAddress,
      },
      parachainId: networkInfo.id,
      handleToast,
      safeXcmVersion,
    });
    if (result.status === "err") {
      setSending(false);

      return toast({
        title: "Something went wrong 😔",
        description:
          "Something went wrong with your transaction, please try again.",
        variant: "destructive",
      });
    } else {
      setSending(false);

      invalidateBalancesQuery(address);
      toast({
        title: "Successfull teleporting 🎉",
        description: `You sent ${tAmount} of ${assetInfo.info.symbol} to ${networkInfo.name}.`,
        variant: "success",
        action: (
          <Link href={`${LINKS.subscan}/tx/${result.hash}`} target="_blank">
            <ToastAction
              className="bg-colors-bg-light  p-3 rounded-md hover:text-white transition-all hover:bg-colors-grey-line font-unbounded text-sm font-bold"
              altText="Link"
            >
              <ExternalLink className="w-4 h-4" />
            </ToastAction>
          </Link>
        ),
      });
    }
  };

  // To parse address when the user change selected network
  useEffect(() => {
    if (toAddress === "" || !checked) return;
    if (toAddress === parseAddress(toAddress, networkInfo.prefix)) return;
    setTeleportAddress(parseAddress(toAddress, networkInfo.prefix));
  }, [parachainId, toAddress, networkInfo.prefix, setTeleportAddress, checked]);

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
            <form className="flex flex-col w-full max-w-[400px] gap-4 ">
              <div
                className={cn("flex flex-col gap-1 rounded-md w-full relative")}
              >
                {" "}
                <SelectToNetwork>
                  <Button className="bg-colors-bg-secondary hover:bg-colors-bg-secondary !h-[60px]  rounded-b-none hover:opacity-70 font-bold justify-between">
                    <div className="flex gap-1 items-center">
                      <p className=" text-colors-font-primary">To: </p>
                      <NetworkIcon className="w-8 h-8" />
                      <p>{networkInfo && networkInfo.name}</p>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </Button>
                </SelectToNetwork>
                <div className="bg-colors-bg-secondary  justify-center ">
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
                <SelectAsset filterAssets={networkInfo.assets}>
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
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center ">
                    <p className="">Custom address</p>
                    <Tooltip
                      className="max-w-[200px]"
                      message={
                        "When 'Custom Address' is disabled, the teleport will be performed to the account of the wallet currently in use. When enabled, you can specify a custom address."
                      }
                    >
                      <Info className="h-4 w-4 text-colors-pink-dot hover:text-colors-pink-secondary transition-all cursor-pointer" />
                    </Tooltip>
                  </div>
                  <Switch
                    checked={checked}
                    onCheckedChange={() => setChecked(!checked)}
                  />
                </div>
                {checked && (
                  <SelectAddress type="teleport">
                    <Button className="flex items-center bg-colors-bg-secondary hover:bg-colors-bg-secondary justify-start pt-7 pb-6  hover:opacity-70 font-bold ">
                      {toAddress === "" ? (
                        <p className="text-center w-full">
                          Select destination address
                        </p>
                      ) : !!isWallet ? (
                        <div
                          className="flex gap-1 h-full relative justify-center items-center"
                          key={`wallet-${isWallet.address}-button-selected`}
                        >
                          <p className="absolute text-xs text-colors-font-seconday -top-5 left-0">
                            To:{" "}
                          </p>
                          {!!Icon && <Icon className="w-5 h-5 mt-2 ml-6" />}
                          <p className="mt-3 text-white">
                            {shortenAddress(toAddress, 16)}
                          </p>
                        </div>
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
                )}
              </div>

              {walletList.filter((wallet) => wallet.address === address)
                .length > 0 ? (
                <Button
                  onClick={handleTransfer}
                  className="py-6 font-bold"
                  disabled={getDisabled()}
                  type="button"
                >
                  {sending ? (
                    <Spinner className="!fill-white w-6 h-6" />
                  ) : (
                    <p>Transfer</p>
                  )}{" "}
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
