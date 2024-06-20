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
import { useState } from "react";
import { useUIState } from "@/data/ui/storage";

import { SearchIcon } from "lucide-react";

import { getAssetIcon, getNetworkIcon } from "@/config/icons.config";
import { getNetworkInfo, networkList } from "@/config/networks.config";
import { Network } from "@/types/networks";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function SelectToNetwork({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    setTeleportParachainId,
    setTeleportTokenId,
    pages: {
      teleport: { parachainId },
    },
  } = useUIState();

  const selectNetwork = (network: Network, assetIdDefault: string) => {
    setTeleportParachainId(network);
    setTeleportTokenId(assetIdDefault);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark border-none max-w-[400px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-foreground pt-4">
            <p className="font-unbounded"> Select network</p>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please select the destination network.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full gap-4 flex flex-col px-2 py-2">
          <div className="flex w-full  justify-center ">
            <Input
              StartIcon={() => (
                <SearchIcon className="absolute left-2 top-1/2 transform transition-all -translate-y-1/2 h-5 w-5 text-colors-font-primary peer-focus:text-colors-pink-dot" />
              )}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search network"
              className="max-w-[500px] font-bold text-white !outline-colors-pink-secondary"
            />
          </div>
          <div className="h-[200px] overflow-y-auto flex flex-col w-full">
            {networkList.length > 0 &&
              networkList.map((network) => {
                const NetworkIcon = getNetworkIcon(network);
                const networkInfo = getNetworkInfo(network);
                return (
                  <Button
                    onClick={() => {
                      selectNetwork(network, networkInfo.assets[0]);
                    }}
                    variant={"ghost"}
                    className={cn(
                      "text-white w-full flex py-6 justify-between",
                      { "bg-accent": network === parachainId }
                    )}
                    key={`showasset-modal-selectasset-${network}`}
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <NetworkIcon className="w-8 h-8" />
                      <div className="flex flex-col gap-0 items-start">
                        <p className=" text-[12px] font-bold ">
                          {networkInfo.name}
                        </p>
                      </div>
                    </div>
                    {network === parachainId && (
                      <span className="flex h-2 w-2 animate-pulse bg-green-400 rounded-full"></span>
                    )}
                  </Button>
                );
              })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectToNetwork;
