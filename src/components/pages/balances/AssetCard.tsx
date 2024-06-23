import Tooltip from "@/components/Tooltip";
import { Badge } from "@/components/ui/badge";
import { getAssetIcon } from "@/config/icons.config";
import { useWalletState } from "@/data/wallet/storage";
import { parseNumber } from "@/helpers/parseNumber";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  symbol: string;
  name: string;
  decimals: string;
};

function AssetCard({ id, symbol, name }: Props) {
  const { loaded, balances, address } = useWalletState();
  const AssetIcon = getAssetIcon(id);
  return (
    <div className="w-full gap-2  flex items-center justify-between px-4 py-2 border rounded-lg border-colors-pink-secondary">
      <div className="flex gap-2  items-center">
        <AssetIcon className="w-7 h-7" />
        <p className="font-bold text-white ">{symbol}</p>
        <Tooltip message={name}>
          <Badge variant="default" className="h-5 !text-xs">
            {id === "DOT" ? "Native" : `#${id}`}
          </Badge>
        </Tooltip>
      </div>
      <div className="flex  gap-2 items-center">
        <Link href={`/asset/${id}`}>
          <Info className="w-4 h-4 text-colors-pink-dot hover:text-colors-pink-secondary transition-all" />
        </Link>
        {address !== "" ? (
          loaded && !!balances[address] ? (
            <p className="text-white font-bold ">
              {parseNumber(balances[address][id]) || "0"}{" "}
              <span className="text-[10px] font-light text-colors-font-primary">
                {symbol}
              </span>
            </p>
          ) : (
            <div className="animate-pulse">
              <div className="h-6 bg-colors-grey-line rounded-md w-[70px]"></div>
            </div>
          )
        ) : (
          <p className="text-white font-bold">
            0{" "}
            <span className="text-[10px] font-light text-colors-font-primary">
              {symbol}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AssetCard;
