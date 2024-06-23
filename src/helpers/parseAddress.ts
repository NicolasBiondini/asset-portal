import { Keyring } from "@polkadot/api";
import { encodeAddress, decodeAddress } from "@polkadot/util-crypto";

// Function to parse an address into a other chain address
// prefix = 0 default (assetHub prefix)

export function parseAddress(address: string, prefix: number = 0): string {
  if (address === "") return "";
  const decodedAddress = decodeAddress(address);

  return encodeAddress(decodedAddress, prefix);
}
