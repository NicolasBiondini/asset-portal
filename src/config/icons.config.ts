import {
  DedIcon,
  DotIcon,
  AssetHub,
  UsdtIcon,
  UsdcIcon,
  PinkIcon,
  StinkIcon,
} from "@/components/icons/assets";
import {
  AcalaIcon,
  AstarIcon,
  BifrostIcon,
  CentrifugeIcon,
  EquilibriumIcon,
  HydraIcon,
  InterlayIcon,
  PendulumIcon,
  PhalaIcon,
} from "@/components/icons/networks";
import { Network } from "@/types/networks";

const AssetIcons: {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
} = {
  "30": DedIcon,
  DOT: DotIcon,
  "1984": UsdtIcon,
  "1337": UsdcIcon,
  "23": PinkIcon,
  "42069": StinkIcon,
};

export const getAssetIcon = (assetId: string) => {
  if (Object.keys(AssetIcons).includes(assetId)) {
    return AssetIcons[assetId];
  } else {
    return AssetHub;
  }
};

const NetworkIcons: {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
} = {
  POLKADOT: DotIcon,
  ACALA: AcalaIcon,
  ASTAR: AstarIcon,
  BIFROST: BifrostIcon,
  HYDRA: HydraIcon,
  EQUILIBRIUM: EquilibriumIcon,
  INTERLAY: InterlayIcon,
  CENTRIFUGE: CentrifugeIcon,
  PHALA: PhalaIcon,
  PENDULUM: PendulumIcon,
};

export const getNetworkIcon = (network: Network) => {
  if (Object.keys(NetworkIcons).includes(network)) {
    return NetworkIcons[network];
  } else {
    return AssetHub;
  }
};

const ParachainsIcons: {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
} = {
  Acala: AcalaIcon,
  Bifrost: BifrostIcon,
  Hydration: HydraIcon,
  Equilibrium: EquilibriumIcon,
  Interlay: InterlayIcon,
};

export const getParachainsIcon = (parachain: string) => {
  if (Object.keys(ParachainsIcons).includes(parachain)) {
    return ParachainsIcons[parachain];
  } else {
    return AssetHub;
  }
};
