import {
  PolkadotjsIcon,
  SubWalletIcon,
  TalismanIcon,
} from "@/components/icons/wallets";
import { Web3Key } from "@/types/wallets";

// Supported wallets
export const SupportedWallets: Web3Key[] = [
  "polkadot-js",
  "talisman",
  "subwallet-js",
];

export const getWalletCopy = {
  parsedName: (wallet: Web3Key) => {
    if (wallet === "polkadot-js") return "Polkadot.js";
    if (wallet === "talisman") return "Talisman";
    return "Subwallet";
  },
  getIcon: (wallet: Web3Key) => {
    if (wallet === "polkadot-js") return PolkadotjsIcon;
    if (wallet === "talisman") return TalismanIcon;
    return SubWalletIcon;
  },
};
