import { Sender } from "@/types/transfer";
import { ApiPromise } from "@polkadot/api";

export const mintAsset = async ({
  api,
  sender,
  assetInfo: { assetId, amount },
}: {
  api: ApiPromise;
  sender: Sender;
  assetInfo: { assetId: number; amount: bigint };
}) => {
  const mintTx = api.tx.assets.mint(assetId, sender.address, amount);
  try {
    const unsub = await mintTx.signAndSend(
      sender.address,
      {
        signer: sender.injector.signer,
      },
      (result) => {
        console.log(`Current status: ${result.status}`);

        if (result.status.isInBlock) {
          console.log(
            `Batch transaction included at blockHash ${result.status.asInBlock}`
          );
        } else if (result.status.isFinalized) {
          console.log(
            `Batch transaction finalized at blockHash ${result.status.asFinalized}`
          );
          unsub();
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
