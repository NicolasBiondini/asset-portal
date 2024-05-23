import { InjectedExtension } from "@polkadot/extension-inject/types";

export type Web3Key = "polkadot-js" | "talisman" | "subwallet-js";

export interface InjectedWindow extends Window {
  injectedWeb3?: {
    [key in Web3Key]: {
      enable: any;
      version: string;
    };
  };
}

export type Wallet = {
  walletId: Web3Key;
  address: string; // Parsed assetHub address
  injected: InjectedExtension;
};
