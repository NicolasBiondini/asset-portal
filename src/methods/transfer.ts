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

    const unsub = await extrinsic.tx.signAndSend(
      sender.address,
      {
        signer: sender.injector.signer,
      },
      ({ status, events, dispatchError }) => {
        if (status.isInBlock) {
          console.log("Transaction is in block:", status.asInBlock.toHex());
        } else if (status.isFinalized) {
          console.log("Transaction is finalized:", status.asFinalized.toHex());
          unsub();
        }

        if (dispatchError) {
          if (dispatchError.isModule) {
            // const decoded = assetApi.registry.findMetaError(dispatchError.asModule);
            // const { documentation, method, section } = decoded;
            // console.error(`${section}.${method}: ${documentation.join(' ')}`);
            console.log("error");
          } else {
            console.error(dispatchError.toString());
          }
        }

        if (events) {
          events.forEach(({ event: { data, method, section } }) => {
            console.log("Event:", `${section}.${method}`, data.toString());
            if (method === "ExtrinsicSuccess") {
              console.log("Transaction succeeded");
            } else if (method === "ExtrinsicFailed") {
              console.log("Transaction failed");
            }
          });
        }
      }
    );

    return { status: "ok", hash: "" };
  } catch (error) {
    console.log(error, "error");
    return { status: "error", hash: "" };
  }
};
