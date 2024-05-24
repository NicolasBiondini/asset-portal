import { checkAddress } from "@polkadot/util-crypto";
import { parseAddress } from "./parseAddress";

export function isValidAddress(address: string): boolean {
  try {
    const parsedAddress = parseAddress(address);
    const [isValid] = checkAddress(parsedAddress, 0);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
