import React from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import AddIcon from "./icons/AddIcon";
import { cn } from "@/lib/utils";
import { useWalletState } from "@/data/wallet/storage";
import { WalletIcon } from "lucide-react";
import { useUIState } from "@/data/ui/storage";
import AddAddressModal from "./modals/AddAddressModal";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: Props) {
  const { mode } = useUIState();
  const { address, loaded } = useWalletState();
  return (
    <div className="flex flex-col h-full w-full gap-1">
      <nav className="flex justify-between px-5 items-center h-[60px]">
        <NavModal />
        <h1 className="hidden lg:flex">AssetHubHub</h1>

        <div className="flex">
          {address !== "" ? (
            <>
              <Button
                size={"sm"}
                className={cn(
                  {
                    "border-r border-background rounded-r-none": address !== "",
                  },
                  " h-8 flex gap-2 items-center justify-center text-xs font-bold"
                )}
              >
                <WalletIcon className="w-3 h-3" />
                Accounts
              </Button>
              <AddAddressModal>
                <Button
                  size={"icon"}
                  className="rounded-l-none h-8 border-l border-background"
                >
                  <AddIcon className="" />
                </Button>
              </AddAddressModal>
            </>
          ) : (
            <AddAddressModal>
              <Button
                size={"sm"}
                className={cn(
                  " h-8 font-bold text-xs flex gap-2 items-center justify-center"
                )}
              >
                <WalletIcon className="w-3 h-3" />
                Connect
              </Button>
            </AddAddressModal>
          )}
        </div>
      </nav>
      <div className="flex w-full h-full">
        <div className="w-[250px] px-6 hidden lg:flex flex-col gap-2  ">
          <Button
            className={cn(
              { dark: mode === "dark" },
              { "dark:!bg-colors-bg-light": true },
              "h-[35px] bg-transparent text-card-foreground font-bold hover:scale-[102%] transition-all hover:bg-colors-font-seconday dark:hover:bg-card hover:text-white w-full flex justify-start text-xs"
            )}
          >
            Home
          </Button>
          <Button className="h-[35px] bg-transparent text-card-foreground font-bold hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
            Teleport
          </Button>{" "}
          <Button className="h-[35px] bg-transparent text-card-foreground font-bold hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
            Transfer
          </Button>{" "}
          <Button className="h-[35px] bg-card text-card-foreground font-bold hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
            Swap
          </Button>
        </div>
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
