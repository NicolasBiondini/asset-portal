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
  setAssetApi: (assetApi) => {
    set((state) => ({ ...state, assetApi }));
  },
  setSafeXcmVersion: (safeXcmVersion) => {
    set((state) => ({ ...state, safeXcmVersion }));
  },
}));
