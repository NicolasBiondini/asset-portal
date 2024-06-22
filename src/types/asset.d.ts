export type AssetMetadata = {
  id: string;
  info: {
    decimals: string;
    deposit: string;
    isFrozen: boolean;
    name: string;
    symbol: string;
  };
};

export interface AssetInfo {
  accounts: string;
  admin: string;
  approvals: string;
  deposit: string;
  freezer: string;
  isSufficient: boolean;
  issuer: string;
  minBalance: string;
  owner: string;
  status: string;
  sufficients: string;
  supply: string;
}
