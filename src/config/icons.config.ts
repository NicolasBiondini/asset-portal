import { DedIcon, DotIcon, AssetHub } from "@/components/icons/assets";

const AssetIcons: {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
} = {
  "30": DedIcon,
};

export const getAssetIcon = (assetId: string) => {
  if (Object.keys(AssetIcons).includes(assetId)) {
    return AssetIcons[assetId];
  } else {
    return AssetHub;
  }
};
