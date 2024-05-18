import { create } from "zustand";
import { InitialState, UIState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useUIState = create<UIState>()((set) => ({
  ...getInitialStorageState(),
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
  // updateStoredNumber: (storedNumber: number) => {
  //   set((state) => ({ ...state, storedNumber }));
  // },
  setAssetsMetadata: (assetsMetadata) => {
    set((state) => ({ ...state, assetsMetadata }));
  },
  setBalances: (balances) => {
    set((state) => ({ ...state, balances }));
  },
  setLoaded: (loaded) => {
    set((state) => ({ ...state, loaded }));
  },
}));
