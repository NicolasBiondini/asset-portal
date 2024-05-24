import { AssetMetadata } from "@/types/asset";
import { Balance } from "@/types/balance";
import { Wallet } from "@/types/wallets";

export interface InitialState {
  loaded: boolean;
  assetsMetadata: AssetMetadata[];
  balances: { [key: string]: Balance };
  address: string;
  addressList: string[];
  walletList: Wallet[];
}

export interface UIState extends InitialState {
  setAssetsMetadata: (assetsMetadata: AssetMetadata[]) => void;
  setBalances: (balances: Balance, address: string) => void;
  setLoaded: (loaded: boolean) => void;
  setAddress: (address: string) => void;
  setAddressList: (address: string) => void;
  setWalletList: (address: Wallet) => void;
}

export const initialState: InitialState = {
  loaded: false,
  assetsMetadata: [],
  balances: {},
  address: "",
  addressList: [],
  walletList: [],
};
