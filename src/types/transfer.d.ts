import { InjectedExtension } from "@polkadot/extension-inject/types";

export type Sender = {
  address: string;
  injector: InjectedExtension;
};
export type TxInfo = {
  tokenId: string;
  amount: string;
  // toAddress
  address: string;
};
