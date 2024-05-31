import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useConnectionState } from "@/data/connection/storage";
import { useUIState } from "@/data/ui/storage";
import { useWalletState } from "@/data/wallet/storage";
import { convertBigInt } from "@/helpers/convertBigInt";
import { transfer } from "@/methods";
import React from "react";

type Props = {};

function Transfer({}: Props) {
  const { api, assetApi } = useConnectionState();
  const { address, walletList } = useWalletState();
  const {
    pages: {
      transfer: { amount: tAmount, tokenId, address: toAddress },
    },
    setTransferAmount,
  } = useUIState();
  const { toast } = useToast();

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
          <form
            onSubmit={handleTransfer}
            className="flex flex-col w-full max-w-[400px] bg-colors-bg-secondary h-[400px] rounded-lg px-4 py-4"
          >
            <Input
              value={transferPage.amount}
              onChange={(e) => {
                setTransferAmount(e.target.value);
              }}
              type="number"
            />
            <Button disabled={getDisabled()} type="submit">
              Transfer
            </Button>
          </form>
        </div>
        <div className="flex">
          {api === null ? (
            <h1>loading ...</h1>
          ) : (
            <Button onClick={handleTransfer}>Transfer 0.1 DOT</Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Transfer;
