import { Network } from "@/types/networks";

export type Page = "transfer" | "teleport" | "create";

export interface InitialState {
  mode: "light" | "dark";
  pages: {
    transfer: {
      tokenId: string;
      address: string;
      amount: string;
    };
    teleport: {
      tokenId: string;
      address: string;
      amount: string;
      parachainId: Network;
    };
    create: {
      assetId: number;
      name: string;
      symbol: string;
      decimals: number;
      minBalance: string;
      initialMint: string;
    };
  };
}

export interface UIState extends InitialState {
  setMode: (mode: "light" | "dark") => void;
  // Transfer page
  setTransferData: ({ ...data }: InitialState["pages"]["transfer"]) => void;
  setTransferAmount: (amount: string) => void;
  setTransferAddress: (address: string) => void;
  setTransferTokenId: (tokenId: string) => void;
  // Teleport page
  setTeleportData: ({ ...data }: InitialState["pages"]["teleport"]) => void;
  setTeleportAmount: (amount: string) => void;
  setTeleportAddress: (address: string) => void;
  setTeleportTokenId: (tokenId: string) => void;
  setTeleportParachainId: (parachainId: Network) => void;
  // Create asset page
  setCreateData: ({ ...data }: InitialState["pages"]["create"]) => void;
  setCreateAssetId: (assetId: number) => void;
  setCreateName: (name: string) => void;
  setCreateSymbol: (symbol: string) => void;
  setCreateDecimals: (decimals: number) => void;
  setCreateMinBalance: (minBalance: string) => void;
  setCreateInitialMint: (initialMint: string) => void;
}

export const initialState: InitialState = {
  mode: "dark",
  pages: {
    transfer: {
      tokenId: "DOT",
      address: "",
      amount: "",
    },
    teleport: {
      tokenId: "DOT",
      address: "",
      amount: "",
      parachainId: "POLKADOT",
    },
    create: {
      assetId: 0,
      name: "",
      symbol: "",
      decimals: 0,
      minBalance: "",
      initialMint: "",
    },
  },
};
