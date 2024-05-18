import { ApiPromise } from "@polkadot/api";

export interface InitialState {
  api: ApiPromise | null;
}

export interface ConnectionState extends InitialState {
  setApi: (api: ApiPromise) => void;
}

export const initialState: InitialState = {
  api: null,
};
