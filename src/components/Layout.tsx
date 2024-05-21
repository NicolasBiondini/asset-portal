import React from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import AddIcon from "./icons/AddIcon";
import { cn } from "@/lib/utils";
import { useWalletState } from "@/data/wallet/storage";
import { WalletIcon } from "lucide-react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: Props) {
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
              <Button
                size={"icon"}
                className="rounded-l-none h-8 border-l border-background"
              >
                <AddIcon className="" />
              </Button>
            </>
          ) : (
            <Button
              size={"sm"}
              className={cn(
                " h-8 font-bold text-xs flex gap-2 items-center justify-center"
              )}
            >
              <WalletIcon className="w-3 h-3" />
              Connect
            </Button>
          )}
        </div>
      </nav>
      <div className="flex w-full h-full">
        <div className="w-[250px] hidden lg:flex flex-col bg-red-700 "></div>
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
