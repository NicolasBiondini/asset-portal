import {
  ArrowRightLeft,
  HomeIcon,
  Images,
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
  { name: "NFTs", Icon: Images, link: "/nfts" },
];

export const WIP_IMAGES = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGE5N2dnbHlnYTN6em9zY3FjYTBqZzRpMnQ4OGN6azI2aGN4YjJ2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO7A7bt1wsEP4cw/giphy.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmdrdDRuanc4aXltMWc5b3E0d2tva3pucTh0a2xham81YXpuc2FvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.webp",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFicGhoZ2lreWd0cDJ5ODRwM2Y0a3pod3Rlcm5odXQ5cmwxZGUzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aNqEFrYVnsS52/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVyeGs1cXNiZnd4NmNsNmVnNGc2dmdyNWdoenJmZ3NhdDR3eG5ucyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lzz3B3xLZluuY/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDcwM3FoeWw5c21nNXg4bnhzbmtxOWJjMm1xYm9rdHdjdDJoMGx6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wpoLqr5FT1sY0/giphy.webp",
];
