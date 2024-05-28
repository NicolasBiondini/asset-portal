import { web3FromSource } from "@polkadot/extension-dapp";
import { ApiPromise } from "@polkadot/api";
import { AssetTransferApi } from "@substrate/asset-transfer-api";
import { InjectedExtension } from "@polkadot/extension-inject/types";

export const transfer = async (
  api: ApiPromise,
  specName: string,
  safeXcm: number,
  address: string,
  injector: InjectedExtension,
  amount: string
): Promise<{ status: "ok" | "error"; hash: string }> => {
  try {
    const assetsApi = new AssetTransferApi(api, specName, safeXcm);

    const extrinsic = await assetsApi.createTransferTransaction(
      // 1000 assethub parachain id
      "1000",
      // to address
      "",
      // asset
      ["DOT"],
      // asset amount
      [amount],
      // config, where submittable is to be able to signAndSend
      { format: "submittable", keepAlive: true }
    );

    const hash = await extrinsic.tx.signAndSend(address, {
      signer: injector.signer,
    });

    console.log(hash, "response", "hash :  ", hash.toString());
    return { status: "ok", hash: hash.toString() };
  } catch (error) {
    console.log(error, "error");
    return { status: "error", hash: "" };
  }
};
