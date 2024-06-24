import { Network, NetworkInfo } from "@/types/networks";

export const networkList: Network[] = [
  "POLKADOT",
  "ACALA",
  "ASTAR",
  "CENTRIFUGE",
  "BIFROST",
  "INTERLAY",
  "HYDRA",
  "PHALA",
  "PENDULUM",
];

// Allowed XCM
export const networks: { [key in Network]: NetworkInfo } = {
  POLKADOT: { id: "0", name: "Polkadot", assets: ["DOT"], prefix: 0 },
  ACALA: {
    id: "2000",
    name: "Acala",
    assets: ["1337", "1984", "23", "100", "21"],
    prefix: 10,
  },
  ASTAR: {
    id: "2006",
    name: "Astar",
    assets: ["1337", "1984", "23"],
    prefix: 5,
  },
  CENTRIFUGE: {
    id: "2031",
    name: "Centrifuge",
    assets: ["1337", "1984"],
    prefix: 36,
  },
  BIFROST: {
    id: "2030",
    name: "Bifrost",
    assets: ["1984", "1337", "30", "23"],
    prefix: 6,
  },
  INTERLAY: {
    id: "2032",
    name: "Interlay",
    assets: ["1984", "1337"],
    prefix: 2032,
  },
  HYDRA: {
    id: "2034",
    name: "Hydration",
    assets: ["1984", "1337"],
    prefix: 63,
  },
  PHALA: {
    id: "2035",
    name: "Phala Network",
    assets: ["23"],
    prefix: 30,
  },
  PENDULUM: {
    id: "2094",
    name: "Pendulum",
    assets: ["1984", "1337", "23"],
    prefix: 56,
  },
  // NOTICE: The following networks have XCM but does not accept XCM tokens by:
  // https://github.com/paritytech/asset-transfer-api-registry/blob/main/docs/registry.json
  //
  //   CRUST: { id: "2008", name: "Crust Parachain", assets: [] }, // Does not accept XCM tokens.
  //   EQUILIBRIUM: { id: "2011", name: "Equilibrium", assets: [] }, // Does not accept XCM tokens.
  //   COMPOSABLE: { id: "2019", name: "Composable", assets: [] }, // Does not accept XCM tokens.
  //   UNIQUE: { id: "2037", name: "Unique", assets: [] }, // Does not accept XCM tokens.
  //   POLKADEX: { id: "2040", name: "Polkadex Parachain", assets: [] }, // Does not accept XCM tokens.
  //   AJUNA: { id: "2051", name: "Ajuna", assets: [] }, // Does not accept XCM tokens.
  //   ZEITGEIST: { id: "2092", name: "Zeitgeist", assets: [] }, // Does not accept XCM tokens.
  //   MANTA: { id: "2104", name: "Manta Atlantic", assets: [] }, // Does not accept XCM tokens.
  //   MYTHOS: { id: "3369", name: "Mythos", assets: [] }, // Does not accept XCM tokens.
};

export const getNetworkInfo = (network: Network) => {
  return networks[network];
};
