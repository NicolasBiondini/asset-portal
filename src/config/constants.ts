import {
  ArrowRightLeft,
  FoldHorizontal,
  Github,
  HomeIcon,
  Images,
  Link,
  PackagePlus,
  Replace,
  SendHorizonal,
  Twitter,
} from "lucide-react";
export const RPC_ENDPOINT = "wss://rpc-asset-hub-polkadot.luckyfriday.io/";
export const LINKS: {
  wallets: { "polkadot-js": string; talisman: string; "subwallet-js": string };
  socialMedia: {
    [key: string]: string;
  };
  subscan: string;
} = {
  wallets: {
    "polkadot-js": "https://polkadot.js.org/extension/",
    talisman: "https://www.talisman.xyz/",
    "subwallet-js": "https://www.subwallet.app/",
  },
  socialMedia: {
    twitter_nachito: "https://x.com/NachitoEth",
    twitter_nicolas: "https://x.com/BiondiniNicolas",
  },
  subscan: "https://assethub-polkadot.subscan.io",
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
  { name: "DOT-KSM", Icon: FoldHorizontal, link: "/bridge" },
  { name: "Create asset", Icon: PackagePlus, link: "/create" },
  { name: "NFTs", Icon: Images, link: "/nfts" },
];

export const SUB_MENU_LINKS = [
  {
    name: "github",
    Icon: Github,
    link: "https://github.com/NicolasBiondini/asset-portal",
  },
  {
    name: "twitter",
    Icon: Twitter,
    link: "https://x.com/AssetPortal",
  },
];

export const WIP_IMAGES = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGE5N2dnbHlnYTN6em9zY3FjYTBqZzRpMnQ4OGN6azI2aGN4YjJ2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO7A7bt1wsEP4cw/giphy.webp",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmdrdDRuanc4aXltMWc5b3E0d2tva3pucTh0a2xham81YXpuc2FvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.webp",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFicGhoZ2lreWd0cDJ5ODRwM2Y0a3pod3Rlcm5odXQ5cmwxZGUzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aNqEFrYVnsS52/giphy.webp",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVyeGs1cXNiZnd4NmNsNmVnNGc2dmdyNWdoenJmZ3NhdDR3eG5ucyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lzz3B3xLZluuY/giphy.webp",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDcwM3FoeWw5c21nNXg4bnhzbmtxOWJjMm1xYm9rdHdjdDJoMGx6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wpoLqr5FT1sY0/giphy.webp",
];

export const WIP_WORDS = [
  "stunning",
  "impressive",
  "amazing",
  "remarkable",
  "spectacular",
  "breathtaking",
  "awe-inspiring",
];

export const metadata = {
  title: "AssetPortal",
  description:
    "AssetPortal: Your gateway to the Polkadot ecosystem. View balances, transfer tokens, use XCM, explore DeFi, swap assets, add liquidity, and interact with NFTs all in one intuitive platform. Open source.",
  url: "https://assetportal.io/",
  image:
    "https://res.cloudinary.com/blogfilmania/image/upload/fl_preserve_transparency/v1719643012/Color_logo_with_background_iwvh3i.jpg?_s=public-apps",
};
