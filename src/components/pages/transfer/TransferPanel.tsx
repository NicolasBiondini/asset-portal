import AddAddressModal from "@/components/modals/AddAddressModal";
import SelectAsset from "@/components/modals/SelectAsset";
import SelectAddress from "@/components/modals/transfer/SelectAddress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getAssetIcon } from "@/config/icons.config";
import { getWalletCopy } from "@/config/wallets.config";
import { useConnectionState } from "@/data/connection/storage";
import { useUIState } from "@/data/ui/storage";
import { useWalletState } from "@/data/wallet/storage";
import { convertBigInt } from "@/helpers/convertBigInt";
import { shortenAddress } from "@/helpers/shortenAddress";
import { cn } from "@/lib/utils";
import { transfer } from "@/methods";
import {
  ArrowBigRightIcon,
  ChevronDown,
  ExternalLink,
  Wallet,
} from "lucide-react";
import Skeleton from "./Skeleton";
import Link from "next/link";
import { LINKS } from "@/config/constants";
import { ToastAction } from "@radix-ui/react-toast";
import { useInvalidate } from "@/query/invalidate";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";

type Props = {};

function TransferPanel({}: Props) {
  const { api, assetApi, safeXcmVersion } = useConnectionState();
  const {
    address,
    wallet,
    walletList,
    assetsMetadata: assets,
    balances,
  } = useWalletState();
  const {
    pages: {
      transfer: { amount: tAmount, tokenId, address: toAddress },
    },
    setTransferAmount,
  } = useUIState();
  const { toast } = useToast();
  const { invalidateBalancesQuery } = useInvalidate();
  const [sending, setSending] = useState(false);

  const AssetIcon = getAssetIcon(tokenId);
  const assetInfo =
    assets.length > 0 && assets.filter((asset) => asset.id === tokenId)[0];

  // Check if it's wallet to get wallet Icon
  const isWallet = wallet?.address === toAddress ? wallet : false;
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
      return false;
    }
    return true;
  };
  const handleToast = () => {
    toast({
      title: `⌛️ Sending ${tAmount} ${assetInfo && assetInfo.info.symbol}`,
      description: "Sending, please wait.",
      variant: "default",
      duration: 70000000,
    });
  };

  const handleTransfer = async () => {
    if (api === null || assetApi === null || !assetInfo) return;

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
        tokenId,
        amount,
        address: toAddress,
      },
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
        title: "Successfull transaction 🎉",
        description: `You sent ${tAmount} of ${assetInfo.info.symbol}.`,
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

  return (
    <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  ">
      {assets.length === 0 || api === null ? (
        <Skeleton />
      ) : (
        <form className="flex flex-col w-full max-w-[400px] gap-4 ">
          <div className={cn("flex flex-col gap-1 rounded-md w-full relative")}>
            <div className="bg-colors-bg-secondary rounded-t-md justify-center ">
              <p className="text-xs font-bold pt-4 pl-4">{"You're sending"}</p>
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
                  setTransferAmount(e.target.value);
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
                <p className="text-center w-full">Select destination address</p>
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
          {walletList.filter((wallet) => wallet.address === address).length >
          0 ? (
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
              )}
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
    </div>
  );
}

export default TransferPanel;
