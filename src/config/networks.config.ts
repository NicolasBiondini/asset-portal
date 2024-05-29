import { Network, NetworkInfo } from "@/types/networks";

// Allowed XCM
export const networks: { [key in Network]: NetworkInfo } = {
  POLKADOT: { id: "0", name: "Polkadot", assets: ["DOT"] },
  ACALA: {
    id: "2000",
    name: "Acala",
    assets: ["DOT", "1337", "1984", "23", "100", "21"],
  },
  ASTAR: { id: "2006", name: "Astar", assets: ["DOT", "1337", "1984", "23"] },
  CENTRIFUGE: {
    id: "2031",
    name: "Centrifuge",
    assets: ["DOT", "1337", "1984"],
  },
  BITFROST: {
    id: "2030",
    name: "Bitfrost",
    assets: ["DOT", "1984", "1337", "30", "23"],
  },
  INTERLAY: { id: "2032", name: "Interlay", assets: ["DOT", "1984", "1337"] },
  HYDRADX: { id: "2034", name: "HydraDX", assets: ["DOT", "1984", "1337"] },
  PHALA: { id: "2035", name: "Phala Network", assets: ["DOT", "23"] },
  PENDULUM: {
    id: "2094",
    name: "Pendulum",
    assets: ["DOT", "1984", "1337", "23"],
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
