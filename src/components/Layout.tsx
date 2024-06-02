import React from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import AddIcon from "./icons/AddIcon";
import { cn } from "@/lib/utils";
import { useWalletState } from "@/data/wallet/storage";
import { UserIcon, WalletIcon } from "lucide-react";
import { useUIState } from "@/data/ui/storage";
import AddAddressModal from "./modals/AddAddressModal";
import { Inter as FontSans, Unbounded } from "next/font/google";
import { AssetHub } from "./icons/assets";
import AddressPill from "./AddressPill";
import SelectAccount from "./modals/SelectAccount";
import { useConnection } from "@/hooks/useConnection";
import { useAssets } from "@/query/wallet/assets";
import { useBalances } from "@/query/wallet/balances";
import Menu from "./Menu";
type Props = {
  children: JSX.Element | JSX.Element[];
};

const unbounded = Unbounded({
  subsets: ["latin"], // puedes agregar otros subsets si es necesario
  variable: "--font-unbounded", // Nombre de la variable CSS para la fuente
  weight: ["400", "700"], // Pesos que quieres incluir
});
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function Layout({ children }: Props) {
  // Create assethub blockchain connection
  useConnection();
  // Fetch assets
  useAssets();
  // Fetch user balances
  useBalances();

  const { mode } = useUIState();
  const { address } = useWalletState();
  return (
    <main
      className={cn(
        "min-h-screen h-full flex flex-col gap-1 bg-background antialiased  text-foreground",
        fontSans.variable,
        unbounded.variable,
        { dark: mode === "dark" }
      )}
    >
      <nav className="flex justify-between px-5 items-center h-[120px]  md:h-[70px] sticky top-0 left-0 w-full !bg-background z-10">
        <NavModal />
        <div className="hidden lg:flex font-unbounded items-center gap-2">
          <AssetHub className="w-8 h-8" />
          <h1 className="font-bold">
            AssetHubHub
            <span className="text-[10px] font-sans text-colors-pink-dot">
              beta
            </span>
          </h1>
        </div>

        <div className="flex font-unbounded">
          {address !== "" ? (
            <div className="flex flex-col md:flex-row w-full gap-2 items-center">
              <AddressPill address={address} />
              <div className="flex order-first md:order-last">
                <SelectAccount>
                  <Button
                    size={"sm"}
                    className={cn(
                      {
                        "border-r border-background rounded-r-none":
                          address !== "",
                      },
                      " h-8 flex gap-1 items-center justify-center text-xs font-bold"
                    )}
                  >
                    <UserIcon className="w-[14px] h-[14px]" />
                    Accounts
                  </Button>
                </SelectAccount>
                <AddAddressModal>
                  <Button
                    size={"icon"}
                    className="rounded-l-none h-8 border-l border-background"
                  >
                    <AddIcon className="" />
                  </Button>
                </AddAddressModal>
              </div>
            </div>
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
      <div className="flex flex-grow relative">
        <div className="w-[250px] px-6 hidden lg:flex flex-col gap-2  font-unbounded fixed top-20">
          <Menu />
        </div>
        <div className="flex-grow w-full flex flex-col justify-center lg:ml-[200px] xl:ml-[250px]  ">
          {children}
        </div>
      </div>
    </main>
  );
}

export default Layout;
