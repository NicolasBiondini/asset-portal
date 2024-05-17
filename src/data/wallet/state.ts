import { AssetMetadata } from "@/types/asset";

export interface InitialState {
  loaded: boolean;
  bears: number;
  storedNumber: number;
  assetsMetadata: AssetMetadata[];
}

export interface UIState extends InitialState {
  increase: (by: number) => void;
  updateStoredNumber: (storedNumber: number) => void;
  setAssetsMetadata: (assetsMetadata: AssetMetadata[]) => void;
}

export const initialState: InitialState = {
  loaded: false,
  bears: 0,
  storedNumber: 0,
  assetsMetadata: [],
};
