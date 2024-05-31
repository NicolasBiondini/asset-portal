export type Page = "transfer" | "teleport";

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
      parachainId: string;
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
  setTeleportParachainId: (parachainId: string) => void;
}

export const initialState: InitialState = {
  mode: "dark",
  pages: {
    transfer: {
      tokenId: "",
      address: "",
      amount: "",
    },
    teleport: {
      tokenId: "",
      address: "",
      amount: "",
      parachainId: "",
    },
  },
};
