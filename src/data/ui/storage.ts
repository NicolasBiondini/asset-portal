import { create } from "zustand";
import { InitialState, UIState, initialState } from "./state";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useUIState = create<UIState>()((set) => ({
  ...getInitialStorageState(),
  setMode: (mode) => {
    set((state) => ({ ...state, mode }));
  },
}));
