import { ApiPromise } from "@polkadot/api";
import { AssetTransferApi } from "@substrate/asset-transfer-api";

export interface InitialState {
  api: ApiPromise | null;
  assetApi: AssetTransferApi | null;
  safeXcmVersion: number;
}

export interface ConnectionState extends InitialState {
  setApi: (api: ApiPromise) => void;
  setAssetApi: (assetApi: AssetTransferApi) => void;
  setSafeXcmVersion: (safeXcmVersion: number) => void;
}

export const initialState: InitialState = {
  api: null,
  assetApi: null,
  safeXcmVersion: 3,
};
