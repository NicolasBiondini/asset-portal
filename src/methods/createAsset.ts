import { Sender } from "@/types/transfer";
import { ApiPromise } from "@polkadot/api";

type AssetInfo = {
  assetId: number;
  admin: string;
  minBalance: number;
  name: string;
  symbol: string;
  decimals: number;
};

export const createAsset = async ({
  api,
  sender,
  assetInfo: { assetId, admin, minBalance, name, symbol, decimals },
}: {
  api: ApiPromise;
  sender: Sender;
  assetInfo: AssetInfo;
}) => {
  const createTx = api.tx.assets.create(assetId, admin, minBalance);
  const metadataTx = api.tx.assets.setMetadata(assetId, name, symbol, decimals);
  const batchTx = api.tx.utility.batch([createTx, metadataTx]);

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
