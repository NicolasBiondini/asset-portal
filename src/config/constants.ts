import {
  ArrowRightLeft,
  HomeIcon,
  PackagePlus,
  Replace,
  SendHorizonal,
} from "lucide-react";
export const RPC_ENDPOINT = "wss://asset-hub-polkadot-rpc.dwellir.com/";
export const LINKS: {
  wallets: { "polkadot-js": string; talisman: string; "subwallet-js": string };
} = {
  wallets: {
    "polkadot-js": "https://polkadot.js.org/extension/",
    talisman: "https://www.talisman.xyz/",
    "subwallet-js": "https://www.subwallet.app/",
  },
};

export const MENU = [
  {
    name: "Home",
    Icon: HomeIcon,
    link: "/",
  },
  { name: "Transfer", Icon: SendHorizonal, link: "/transfer" },
  { name: "Teleport", Icon: Replace, link: "/teleport" },
  { name: "Swap", Icon: ArrowRightLeft, link: "/swap" },
  { name: "Create asset", Icon: PackagePlus, link: "/create" },
];
