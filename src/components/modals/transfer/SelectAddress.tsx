import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
import { isValidAddress } from "@/helpers/isValidAddress";
import { useUIState } from "@/data/ui/storage";
import { parseAddress } from "@/helpers/parseAddress";
import AccountButton from "@/components/AccountButton";
import { getNetworkInfo } from "@/config/networks.config";

type Props = {
  children: JSX.Element | JSX.Element[];
  type?: "transfer" | "teleport";
};

function SelectAddress({ children, type = "transfer" }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { walletList, addressList, address: activeAddress } = useWalletState();
  const {
    setTransferAddress,
    setTeleportAddress,
    pages: {
      transfer: { address: toAddressTransfer },
      teleport: { address: toAddressTeleport, parachainId },
    },
  } = useUIState();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "transfer") {
      const parsedAddress = parseAddress(inputValue);
      setTransferAddress(parsedAddress);
    } else {
      const prefix = getNetworkInfo(parachainId).prefix;
      const parsedAddress = parseAddress(inputValue, prefix);
      setTeleportAddress(parsedAddress);
    }

    setInputValue("");
    setOpen(false);
  };

  const handleClick = (address: string) => {
    if (type === "transfer") {
      const parsedAddress = parseAddress(address);
      setTransferAddress(parsedAddress);
    } else {
      const prefix = getNetworkInfo(parachainId).prefix;
      const parsedAddress = parseAddress(address, prefix);
      setTeleportAddress(parsedAddress);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none gap-6">
        <DialogHeader>
          <DialogTitle className="text-foreground ">
            <p className="font-unbounded"> Select address</p>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please select your destination address.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="read-only"
          className="w-full h-[200px] flex flex-col justify-center relative"
        >
          <TabsList className="w-full absolute top-2">
            <TabsTrigger value="read-only" className="w-full">
              Read only
            </TabsTrigger>
            <TabsTrigger value="extensions" className="w-full">
              Extensions
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="absolute top-20 w-full left-0 "
            value="read-only"
          >
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-2 w-full"
            >
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Address"
                className="placeholder:font-bold text-white !outline-colors-pink-secondary"
              />
              <DialogClose asChild>
                <Button
                  disabled={
                    !isValidAddress(inputValue) ||
                    addressList.some((a) => a === inputValue) ||
                    walletList.some((a) => a.address === inputValue)
                  }
                  type="submit"
                  size={"lg"}
                  className="font-bold"
                >
                  Add address
                </Button>
              </DialogClose>
            </form>
          </TabsContent>
          <TabsContent
            value="extensions"
            className="absolute top-14 w-full left-0 "
          >
            {addressList.length === 0 && walletList.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center mt-5">
                <p className="font-bold font-unbounded text-lg text-white">
                  {"You don't have any connected wallet 😔."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {addressList.map((address) => {
                  return (
                    <AccountButton
                      key={address}
                      address={address}
                      handleClick={() => handleClick(address)}
                      disabled={address === activeAddress}
                      selected={
                        type === "transfer"
                          ? address === toAddressTransfer
                          : address === parseAddress(toAddressTeleport)
                      }
                    />
                  );
                })}
                {walletList.map((wallet) => {
                  return (
                    <AccountButton
                      key={wallet.address}
                      address={wallet.address}
                      walletId={wallet.walletId}
                      handleClick={() => handleClick(wallet.address)}
                      disabled={wallet.address === activeAddress}
                      selected={
                        type === "transfer"
                          ? wallet.address === toAddressTransfer
                          : wallet.address === parseAddress(toAddressTeleport)
                      }
                    />
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SelectAddress;
