import { Sender } from "@/types/transfer";
import { ApiPromise } from "@polkadot/api";

type AssetInfo = {
  assetId: number;
  admin: string;
  minBalance: number;
  name: string;
  symbol: string;
  decimals: number;
  amount: bigint;
};

export const createAsset = async ({
  api,
  sender,
  assetInfo: { assetId, admin, minBalance, name, symbol, decimals, amount },
  handleToast,
}: {
  api: ApiPromise;
  sender: Sender;
  assetInfo: AssetInfo;
  handleToast?: ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant:
      | "default"
      | "destructive"
      | "success"
      | "warning"
      | null
      | undefined;
  }) => void;
}): Promise<{ status: "ok" | "err"; hash: string | "unknown" }> => {
  const createTx = api.tx.assets.create(assetId, admin, minBalance);
  const metadataTx = api.tx.assets.setMetadata(assetId, name, symbol, decimals);
  const mintTx = api.tx.assets.mint(assetId, sender.address, amount);

  const batchTx = api.tx.utility.batch([createTx, metadataTx, mintTx]);

  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await batchTx.signAndSend(
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
            // TODO: add toast here for in block status
          } else if (result.status.isFinalized) {
            console.log(
              `Batch transaction finalized at blockHash ${result.status.asFinalized}`
            );
            // TODO: add toast here for finalized status

            // Check for errors in the events
            const allEvents = result.events;
            let extrinsicFailed = false;

            allEvents.forEach(({ event: { method, section } }) => {
              if (section === "system" && method === "ExtrinsicFailed") {
                extrinsicFailed = true;
                console.error("Extrinsic failed");
                // TODO: add toast here for extrinsic failed
                resolve({
                  status: "err",
                  hash: result.status.asFinalized.toString(),
                });
              }
            });

            if (!extrinsicFailed) {
              resolve({
                status: "ok",
                hash: result.status.asFinalized.toString(),
              });
            }

            unsub();
          }
        }
      );
    } catch (error) {
      console.log(error);
      // TODO: add toast here for error status
      reject({
        status: "err",
        hash: "unknown",
      });
    }
  });

  // try {
  //   const unsub = await batchTx.signAndSend(
  //     sender.address,
  //     {
  //       signer: sender.injector.signer,
  //     },
  //     (result) => {
  //       console.log(`Current status: ${result.status}`);

  //       if (result.status.isInBlock) {
  //         console.log(
  //           `Batch transaction included at blockHash ${result.status.asInBlock}`
  //         );
  //       } else if (result.status.isFinalized) {
  //         console.log(
  //           `Batch transaction finalized at blockHash ${result.status.asFinalized}`
  //         );
  //         unsub();
  //       }
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  // }
};
