import Tooltip from "@/components/Tooltip";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import { getAssetIdInfo } from "@/config/assetId.config";
import { LINKS } from "@/config/constants";
import { getAssetIcon } from "@/config/icons.config";
import { useWalletState } from "@/data/wallet/storage";
import { shortenAddress } from "@/helpers/shortenAddress";
import { useAssetInfo } from "@/query/assetId/assetInfo";
import { AssetMetadata } from "@/types/asset";
import { Globe, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  asset: AssetMetadata;
};

function AssetPanel({ asset }: Props) {
  const { balances, address } = useWalletState();
  const {
    id: assetId,
    info: { name, symbol, decimals, deposit, isFrozen },
  } = asset;
  const { isLoading, assetInfo } = useAssetInfo(assetId);

  if (isLoading || !assetInfo)
    return (
      <section className="flex h-full flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col h-full gap-8 w-full max-w-[1024px] mx-auto justify-center items-center">
          <Spinner />
        </div>
      </section>
    );

  const Icon = getAssetIcon(assetId);
  const assetIdInfo = getAssetIdInfo(assetId);

  return (
    <section className="flex h-full flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
      <div className="flex flex-col gap-8 w-full max-w-[1024px] mx-auto">
        <div className="w-full flex justify-between items-baseline">
          <div className="flex gap-7 items-center">
            <div className="flex gap-2 items-center">
              <Icon className="w-12 h-12" />
              <div className="flex flex-col  justify-stretch p-0 gap-1 ">
                <p className="font-unbounded text-lg font-bold p-0 h-5 text-white">
                  {name}
                </p>
                <p className="text-sm">{symbol}</p>
              </div>
            </div>
            <Tooltip message={name}>
              <Badge variant="default" className="h-5 !text-xs">
                {assetId === "DOT" ? "Native" : `#${assetId}`}
              </Badge>
            </Tooltip>
          </div>
          <div className="flex gap-1">
            {assetIdInfo?.links.twitter && (
              <Link
                className="hover:text-white transition-all"
                href={assetIdInfo.links.twitter}
                target="_blank"
              >
                <Twitter />
              </Link>
            )}

            {assetIdInfo?.links.web && (
              <Link
                className="hover:text-white transition-all"
                href={assetIdInfo.links.web}
                target="_blank"
              >
                <Globe />
              </Link>
            )}
          </div>
        </div>
        {assetIdInfo?.text && (
          <div className="flex flex-col gap-1">
            <p className="w-full text-xs">{assetIdInfo.text}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="w-full h-auto flex flex-col md:flex-row gap-5">
            {assetId !== "DOT" && (
              <div className="w-full h-full flex flex-col p-7 gap-3 bg-colors-bg-secondary rounded-md">
                <p className="text-colors-pink-dot text-xl font-bold font-unbounded">
                  Team
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                      Owner:
                    </p>
                    <Link
                      href={`${LINKS.subscan}/account/${assetInfo.owner}`}
                      target="_blank"
                      className="font-bold text-white hover:text-colors-pink-dot transition-all"
                    >
                      {" "}
                      {shortenAddress(assetInfo.owner, 8)}
                    </Link>
                  </div>{" "}
                  <div className="flex justify-between">
                    <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                      Admin:
                    </p>
                    <Link
                      href={`${LINKS.subscan}/account/${assetInfo.admin}`}
                      target="_blank"
                      className="font-bold text-white hover:text-colors-pink-dot transition-all"
                    >
                      {" "}
                      {shortenAddress(assetInfo.admin, 8)}
                    </Link>
                  </div>{" "}
                  <div className="flex justify-between">
                    <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                      Issuer:
                    </p>
                    <Link
                      href={`${LINKS.subscan}/account/${assetInfo.issuer}`}
                      target="_blank"
                      className="font-bold text-white hover:text-colors-pink-dot transition-all"
                    >
                      {shortenAddress(assetInfo.issuer, 8)}
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                      Freezer:
                    </p>
                    <Link
                      href={`${LINKS.subscan}/account/${assetInfo.freezer}`}
                      target="_blank"
                      className="font-bold text-white hover:text-colors-pink-dot transition-all"
                    >
                      {shortenAddress(assetInfo.freezer, 8)}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full h-full flex flex-col p-7 gap-3 bg-colors-bg-secondary rounded-md">
              <p className="text-colors-pink-dot text-xl font-bold font-unbounded">
                Info
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                    Decimals:
                  </p>
                  <p className="font-bold text-white">{decimals}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                    Is Frozen:
                  </p>
                  <p className="font-bold text-white">
                    {isFrozen ? "Yes" : "No"}
                  </p>
                </div>
                {assetId !== "DOT" && (
                  <>
                    {" "}
                    <div className="flex justify-between">
                      <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                        Holders:
                      </p>
                      <p className="font-bold text-white">
                        {assetInfo.accounts ? assetInfo.accounts : "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-colors-font-primary text-sm font-bold font-unbounded">
                        Supply:
                      </p>
                      <p className="font-bold text-white flex gap-1 items-baseline">
                        {assetInfo.supply ? assetInfo.supply : "-"}
                        <span className="text-[10px] text-colors-font-seconday">
                          {symbol}
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col p-7 gap-3 bg-colors-bg-secondary rounded-md">
            <p className="text-colors-pink-dot text-xl font-bold font-unbounded">
              Your balance
            </p>
            <div className="flex h-full w-full justify-center items-center">
              <p className="text-white font-bold flex gap-1 items-baseline text-6xl">
                {!!address && balances[address] && balances[address][assetId]
                  ? balances[address][assetId]
                  : "0.00"}{" "}
                <span className="text-sm text-colors-font-seconday">
                  {symbol}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssetPanel;
