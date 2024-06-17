import { Button } from "@/components/ui/button";
import { useConnectionState } from "@/data/connection/storage";
import { useWalletState } from "@/data/wallet/storage";
import { createAsset, mintAsset } from "@/methods";

import React from "react";

type Props = {};

function CreateAssetPanel({}: Props) {
  const { api } = useConnectionState();
  const { walletList, address } = useWalletState();

  const wallet =
    address !== "" && walletList.length > 0
      ? walletList.filter((wallet) => wallet.address === address)[0].injected
      : null;

  const injector = wallet;

  if (injector === null) return <h1>hello</h1>;
  return (
    <div className="flex flex-col gap-2">
      <p>CreateAssetPanel</p>
      {api !== null && wallet !== null && injector !== null && (
        <Button
          onClick={() =>
            createAsset({
              api,
              sender: { address, injector: injector },
              assetInfo: {
                assetId: 122,
                admin: address,
                minBalance: 10000,
                name: "Testing",
                symbol: "TESTING",
                decimals: 12,
              },
            })
          }
        >
          Click me
        </Button>
      )}
      {api !== null && wallet !== null && injector !== null && (
        <Button
          onClick={() =>
            mintAsset({
              api,
              sender: { address, injector: injector },
              assetInfo: {
                assetId: 122,
                amount: BigInt(100000000000000000),
              },
            })
          }
        >
          Mint asset
        </Button>
      )}
    </div>
  );
}

export default CreateAssetPanel;
