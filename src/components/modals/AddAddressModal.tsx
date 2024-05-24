import dynamic from "next/dynamic";

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
import { WalletIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormEvent, MouseEvent, useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
const ConnectWalletButton = dynamic(() => import("../ConnectWalletButton"), {
  ssr: false,
});
type Props = {
  children: JSX.Element | JSX.Element[];
};

function AddAddressModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setAddressList } = useWalletState();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddressList(inputValue);
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
        <ConnectWalletButton handleClose={() => setOpen(false)} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 "
        >
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Address"
          />
          <DialogClose asChild>
            <Button type="submit" size={"lg"} className="">
              Add address
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAddressModal;
