import { create } from "zustand";
import { InitialState, UIState, initialState } from "./state";
import { parseAddress } from "@/helpers/parseAddress";

const getInitialStorageState = (): InitialState => {
  return initialState;
};

export const useWalletState = create<UIState>()((set) => ({
  ...getInitialStorageState(),
  setAssetsMetadata: (assetsMetadata) => {
    set((state) => ({ ...state, assetsMetadata }));
  },
  setBalances: (balances, address) => {
    set((state) => {
      const prevBalances = state.balances;
      prevBalances[address] = balances;
      return { ...state, balances: prevBalances, loaded: true };
    });
  },
  setLoaded: (loaded) => {
    set((state) => ({ ...state, loaded }));
  },
  setAddress: (address) => {
    set((state) => ({ ...state, address }));
  },
  setAddressList: (address) => {
    // Parse any substrate address into AssetHub address before save it
    const parsedAddress = parseAddress(address);
    set((state) => ({
      ...state,
      address: parsedAddress,
      addressList: [...state.addressList, parsedAddress],
    }));
  },
  setWalletList: (wallet) => {
    set((state) => ({
      ...state,
      address: wallet.address,
      walletList: [...state.walletList, wallet],
      wallet: wallet,
    }));
  },
  removeAddress: (address, walletId) => {
    set((state) => {
      let newSelectedAddress = "";
      let balancesCopy = state.balances;

      // delete balance for that address
      delete balancesCopy[address];

      // Set new default address
      // First read only
      if (state.addressList.length > 0) {
        const arr = state.addressList.filter((a) => a !== address);
        newSelectedAddress = arr.length > 0 ? arr[0] : "";
      }
      // Then wallet address
      if (state.walletList.length > 0 && newSelectedAddress === "") {
        const arr = state.walletList.filter((a) => a.address !== address);
        newSelectedAddress = arr.length > 0 ? arr[0].address : "";
      }

      if (!!walletId) {
        // Is wallet
        let newWallet = null;
        if (state.wallet?.address === address) {
          if (state.walletList.length > 0) {
            const arr = state.walletList.filter((a) => a.address !== address);
            newWallet = arr.length > 0 ? arr[0] : null;
          }
        }
        // remove it from the list
        return {
          ...state,
          address: newSelectedAddress,
          wallet: newWallet,
          walletList: state.walletList.filter((a) => a.address !== address),
          balances: balancesCopy,
          loaded: true,
        };
      } else {
        // Is read only
        // remove it from the array
        return {
          ...state,
          address: newSelectedAddress,
          addressList: state.addressList.filter((a) => a !== address),
          balances: balancesCopy,
          loaded: true,
        };
      }
    });
  },
}));
