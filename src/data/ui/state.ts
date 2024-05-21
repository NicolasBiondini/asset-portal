export interface InitialState {
  mode: "light" | "dark";
}

export interface UIState extends InitialState {
  setMode: (mode: "light" | "dark") => void;
}

export const initialState: InitialState = {
  mode: "dark",
};
