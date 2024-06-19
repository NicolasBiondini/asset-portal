import { Network } from "@/types/networks";
import { ErrorLabel, InputUI } from "@/types/ui";

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
      assetId: InputUI;
      name: InputUI;
      symbol: InputUI;
      decimals: InputUI;
      minBalance: InputUI;
      initialMint: InputUI;
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
  resetCreate: () => void;
  setCreateAssetId: (assetId: InputUI) => void;
  setCreateName: (name: InputUI) => void;
  setCreateSymbol: (symbol: InputUI) => void;
  setCreateDecimals: (decimals: InputUI) => void;
  setCreateMinBalance: (minBalance: InputUI) => void;
  setCreateInitialMint: (initialMint: InputUI) => void;
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
      assetId: { value: "", err: "" },
      name: { value: "", err: "" },
      symbol: { value: "", err: "" },
      decimals: { value: "", err: "" },
      minBalance: { value: "", err: "" },
      initialMint: { value: "", err: "" },
    },
  },
};
