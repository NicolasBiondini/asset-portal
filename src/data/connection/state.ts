import { ApiPromise } from "@polkadot/api";

export interface InitialState {
  api: ApiPromise | null;
  specName: string;
  safeXcm: number;
}

export interface ConnectionState extends InitialState {
  setApi: (api: ApiPromise) => void;
  setChainInfo: (specName: string, safeXcm: number) => void;
}

export const initialState: InitialState = {
  api: null,
  specName: "",
  safeXcm: 0,
};
