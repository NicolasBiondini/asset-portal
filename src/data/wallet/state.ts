import { AssetMetadata } from "@/types/asset";
import { Balance } from "@/types/balance";

export interface InitialState {
  loaded: boolean;
  // bears: number;
  // storedNumber: number;
  assetsMetadata: AssetMetadata[];
  balances: Balance;
}

export interface UIState extends InitialState {
  // increase: (by: number) => void;
  // updateStoredNumber: (storedNumber: number) => void;
  setAssetsMetadata: (assetsMetadata: AssetMetadata[]) => void;
  setBalances: (balances: Balance) => void;
  setLoaded: (loaded: boolean) => void;
}

export const initialState: InitialState = {
  loaded: false,
  // bears: 0,
  // storedNumber: 0,
  assetsMetadata: [],
  balances: {},
};
