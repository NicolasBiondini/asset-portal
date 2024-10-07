import Tooltip from "@/components/Tooltip";
import AssetPanel from "@/components/pages/asset/AssetPanel";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import { getAssetIcon } from "@/config/icons.config";
import { useConnectionState } from "@/data/connection/storage";
import { useWalletState } from "@/data/wallet/storage";
import { useAssetInfo } from "@/query/assetId/assetInfo";
import { Globe, Twitter, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

function AssetPage({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { assetsMetadata: assets } = useWalletState();
  const { api } = useConnectionState();

  if (!api || assets.length < 120)
    return (
      <section className="flex h-full flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col h-full gap-8 w-full max-w-[1024px] mx-auto justify-center items-center">
          <Spinner />
        </div>
      </section>
    );

  const asset = assets.filter((asset) => asset.id === id);

  if (asset.length === 0)
    return (
      <section className="flex h-full flex-col gap-8 w-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col gap-8 w-full max-w-[1024px] mx-auto justify-center items-center">
          <p>Asset not found 😔</p>
          <Link className="text-colors-pink-secondary" href={"/"}>
            Go home
          </Link>
        </div>
      </section>
    );

  return <AssetPanel asset={asset[0]} />;
}

export default AssetPage;
