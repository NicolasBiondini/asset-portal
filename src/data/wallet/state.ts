import { AssetMetadata } from "@/types/asset";
import { Balance } from "@/types/balance";

export interface InitialState {
  loaded: boolean;
  assetsMetadata: AssetMetadata[];
  balances: Balance;
  address: string;
  addressList: string[];
  walletList: string[];
}

export interface UIState extends InitialState {
  setAssetsMetadata: (assetsMetadata: AssetMetadata[]) => void;
  setBalances: (balances: Balance) => void;
  setLoaded: (loaded: boolean) => void;
  setAddress: (address: string) => void;
  setAddressList: (address: string) => void;
  setWalletList: (address: string) => void;
}

export const initialState: InitialState = {
  loaded: false,
  assetsMetadata: [],
  balances: {},
  address: "",
  addressList: [],
  walletList: [],
};
