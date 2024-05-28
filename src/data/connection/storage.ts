import { create } from "zustand";
import { InitialState, ConnectionState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useConnectionState = create<ConnectionState>()((set) => ({
  ...getInitialStorageState(),
  setApi: (api) => {
    set((state) => ({ ...state, api }));
  },
  setChainInfo: (specName, safeXcm) => {
    set((state) => ({ ...state, specName, safeXcm }));
  },
}));
