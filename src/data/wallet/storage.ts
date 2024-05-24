import { create } from "zustand";
import { InitialState, UIState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useWalletState = create<UIState>()((set) => ({
  ...getInitialStorageState(),
  setAssetsMetadata: (assetsMetadata) => {
    set((state) => ({ ...state, assetsMetadata }));
  },
  setBalances: (balances, address) => {
    set((state) => {
      const prevBalances = state.balances;
      prevBalances[address] = balances;
      return { ...state, balances: prevBalances, loaded: true };
    });
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
  setWalletList: (wallet) => {
    set((state) => ({
      ...state,
      address: wallet.address,
      walletList: [...state.walletList, wallet],
    }));
  },
}));
