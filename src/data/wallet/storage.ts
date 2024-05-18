import { create } from "zustand";
import { InitialState, UIState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useUIState = create<UIState>()((set) => ({
  ...getInitialStorageState(),
  setAssetsMetadata: (assetsMetadata) => {
    set((state) => ({ ...state, assetsMetadata }));
  },
  setBalances: (balances) => {
    set((state) => ({ ...state, balances }));
  },
  setLoaded: (loaded) => {
    set((state) => ({ ...state, loaded }));
  },
  setAddress: (address) => {
    set((state) => ({ ...state, address }));
  },
  setAddressList: (address) => {
    set((state) => ({
      ...state,
      address: address,
      addressList: [...state.addressList, address],
    }));
  },
  setWalletList: (address) => {
    set((state) => ({ ...state, addressList: [...state.walletList, address] }));
  },
}));
