import { AssetMetadata } from "@/types/asset";
import { Balance } from "@/types/balance";
import { Wallet, Web3Key } from "@/types/wallets";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface InitialState {
  loaded: boolean;
  assetsMetadata: AssetMetadata[];
  balances: { [key: string]: Balance };
  address: string;
  wallet: Wallet | null;
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
  removeAddress: (address: string, walletId: Web3Key | undefined) => void;
}

export const initialState: InitialState = {
  loaded: false,
  assetsMetadata: [],
  balances: {},
  address: "",
  wallet: null,
  addressList: [],
  walletList: [],
};
