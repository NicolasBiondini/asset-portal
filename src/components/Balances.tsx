import { useUIState } from "@/data/wallet/storage";
import { useAssets } from "@/query/wallet/assets";
import { AssetMetadata } from "@/types/asset";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useState } from "react";

type Props = {};

function Balances({}: Props) {
  const { isLoading, assetsMetadata: assets } = useAssets();

  return (
    <div>
      <p>Balances</p>

      <div className="flex flex-col gap-7">
        {isLoading || assets.length === 0 ? (
          <h1>Loading..</h1>
        ) : (
          assets.map((asset) => {
            return (
              <div key={asset.id} className="w-full gap-2 flex flex-col">
                <p>Symbol: {asset.info.symbol}</p>
                <p>Name: {asset.info.name}</p>
                <p>Decimals: {asset.info.decimals}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Balances;
