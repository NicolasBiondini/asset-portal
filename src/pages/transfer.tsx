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
import { ArrowBigRightIcon, ChevronDown } from "lucide-react";
import React from "react";

type Props = {};

function Transfer({}: Props) {
  const { api, assetApi } = useConnectionState();
  const { address, walletList, assetsMetadata: assets } = useWalletState();
  const {
    pages: {
      transfer: { amount: tAmount, tokenId, address: toAddress },
    },
    setTransferAmount,
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
    return false;
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
        tokenId,
        amount,
        address: toAddress,
      },
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
    <section className="flex flex-col gap-8 w-full ">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
            Transfer
          </h1>
          <p className="text-xs">
            Here you can check your balances on AssetHub.
          </p>
          <p className="text-xs">
            Please remember to always carefully check the assetId. AssetHub is
            permissionless, allowing anyone to create a new asset.
          </p>
        </div>
        <div className="flex flex-col w-full h-full items-center ">
          {assets.length === 0 || api === null ? (
            <h1>loading...</h1>
          ) : (
            <form
              onSubmit={handleTransfer}
              className="flex flex-col w-full max-w-[400px] gap-2 "
            >
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-md w-full border-2 border-transparent"
                )}
              >
                <div className="bg-colors-bg-secondary rounded-t-md justify-center ">
                  <p className="text-xs font-bold pt-4 pl-4">
                    {"You're sending"}
                  </p>
                  <Input
                    className={cn(
                      "h-[150px] focus-visible:ring-transparent bg-transparent outline-none border-none  text-4xl md:text-6xl font-bold text-center placeholder:text-center text-white caret-colors-pink-dot",
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
                <Button className="flex items-center bg-colors-bg-secondary hover:bg-colors-bg-secondary justify-start py-8  hover:opacity-70 font-bold ">
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
                          <p className="absolute text-xs text-colors-font-seconday -top-6 left-0">
                            To:{" "}
                          </p>
                          <Icon className="w-5 h-5 mt-3 ml-8" />{" "}
                          <p className="mt-3 text-colors-font-primary">
                            {shortenAddress(toAddress, 16)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>{shortenAddress(toAddress, 10)}</p>
                  )}
                </Button>
              </SelectAddress>
              <Button disabled={getDisabled()} type="submit">
                Transfer
              </Button>
            </form>
          )}
        </div>
        {/* <div className="flex">
          {api === null ? (
            <h1>loading ...</h1>
          ) : (
            <Button onClick={handleTransfer}>Transfer 0.1 DOT</Button>
          )}
        </div> */}
      </div>
    </section>
  );
}

export default Transfer;
