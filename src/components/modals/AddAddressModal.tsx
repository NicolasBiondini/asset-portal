// import dynamic from "next/dynamic";
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
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
import ConnectWalletButton from "../ConnectWalletButton";
import { isValidAddress } from "@/helpers/isValidAddress";
// const ConnectWalletButton = dynamic(() => import("../ConnectWalletButton"), {
//   ssr: false,
// });
type Props = {
  children: JSX.Element | JSX.Element[];
};

function AddAddressModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setAddressList, setLoaded, walletList, addressList } =
    useWalletState();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaded(false);
    setAddressList(inputValue);
    setInputValue("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none gap-6">
        <DialogHeader>
          <DialogTitle className="text-foreground ">
            <p className="font-unbounded"> Add your address.</p>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please input your address to be able to see your assets on AssetHub.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="extensions"
          className="w-full h-[200px] flex flex-col justify-center relative"
        >
          <TabsList className="w-full absolute top-2">
            <TabsTrigger value="extensions" className="w-full">
              Extensions
            </TabsTrigger>
            <TabsTrigger value="read-only" className="w-full">
              Read only
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="extensions"
            className="absolute top-14 w-full left-0 "
          >
            <ConnectWalletButton handleClose={() => setOpen(false)} />
          </TabsContent>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AddAddressModal;
