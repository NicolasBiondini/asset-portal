export type Network =
  | "POLKADOT"
  | "ACALA"
  | "ASTAR"
  | "CENTRIFUGE"
  | "BITFROST"
  | "INTERLAY"
  | "HYDRADX"
  | "PHALA"
  | "PENDULUM";
//   | "CRUST"
//   | "EQUILIBRIUM"
//   | "COMPOSABLE"
//   | "UNIQUE"
//   | "POLKADEX"
//   | "AJUNA"
//   | "ZEITGEIST"
//   | "MANTA"
//   | "MYTHOS";

export type NetworkInfo = {
  id: string;
  name: string;
  assets: string[];
  prefix: number;
};

// DEFI Ecosystem
export type Parachains =
  | "Hydration"
  | "Bifrost"
  | "Acala"
  | "Equilibrium"
  | "Interlay";

export interface Parachain {
  id: string;
  name: string;
  description: string;
  link: string;
}
