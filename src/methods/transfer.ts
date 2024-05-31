import { AssetTransferApi } from "@substrate/asset-transfer-api";
import { Sender, TxInfo } from "@/types/transfer";

export const transfer = async ({
  assetApi,
  sender,
  txInfo,
  parachainId = "1000",
}: {
  assetApi: AssetTransferApi;
  sender: Sender;
  txInfo: TxInfo;
  parachainId?: string;
}): Promise<{ status: "ok" | "error"; hash: string }> => {
  try {
    const extrinsic = await assetApi.createTransferTransaction(
      // 1000 assethub parachain id
      parachainId,
      // to address
      txInfo.address,
      // asset
      [txInfo.tokenId],
      // asset amount
      [txInfo.amount],
      // config, where submittable is to be able to signAndSend
      { format: "submittable", keepAlive: false }
    );

    const hash = await extrinsic.tx.signAndSend(sender.address, {
      signer: sender.injector.signer,
    });

    console.log(hash, "response", "hash :  ", hash.toString());
    return { status: "ok", hash: hash.toString() };
  } catch (error) {
    console.log(error, "error");
    return { status: "error", hash: "" };
  }
};
