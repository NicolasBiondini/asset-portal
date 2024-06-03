import React from "react";
import { Button } from "./ui/button";
import NavModal from "./NavModal";
import AddIcon from "./icons/AddIcon";
import { cn } from "@/lib/utils";
import { useWalletState } from "@/data/wallet/storage";
import { GlobeLock, Info, UserIcon, WalletIcon } from "lucide-react";
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
import { LINKS, SUB_MENU_LINKS } from "@/config/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import SelectNetworkAssetHub from "./modals/SelectNetworkAssetHub";
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

  const rourter = useRouter();

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
        <div className="w-[250px] px-6 hidden lg:flex flex-col gap-2 h-[87%] justify-between font-unbounded fixed top-20">
          <Menu />
          <div className="flex w-full gap-6 flex-col">
            <div className="flex flex-col gap-2">
              <SelectNetworkAssetHub>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-[35px] text-colors-font-seconday border-colors-bg-light hover:scale-[102%] transition-all  hover:bg-card gap-2 items-center hover:text-white w-full flex justify-between text-xs"
                  )}
                >
                  <div className="flex gap-2">
                    <GlobeLock className="w-4 h-4" />
                    <p> Network</p>
                  </div>
                  <span className="w-2 h-2 animate-pulse rounded-full bg-green-400 flex"></span>
                </Button>
              </SelectNetworkAssetHub>
              <Link className="w-full" href={"/about"}>
                <Button
                  variant={"outline"}
                  className={cn(
                    {
                      "text-white border-colors-pink-dot":
                        rourter.asPath === "/about",
                    },
                    {
                      "border-colors-bg-light text-colors-font-seconday":
                        rourter.asPath !== "/about",
                    },
                    "h-[35px] hover:scale-[102%] transition-all  hover:bg-card gap-2 items-center hover:text-white w-full flex justify-start text-xs"
                  )}
                >
                  <Info className="w-4 h-4" />
                  <p> About us</p>
                </Button>
              </Link>
            </div>

            <div className="flex gap-2 w-full">
              {SUB_MENU_LINKS.map((link) => {
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="group"
                    target="_blank"
                  >
                    <link.Icon className="w-5 h-5 text-colors-font-seconday group-hover:text-white transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-grow w-full flex flex-col justify-center lg:ml-[200px] xl:ml-[250px] pb-10 ">
          {children}
        </div>
      </div>
      <footer className="w-full h-[20px] bg-colors-bg-secondary flex gap-1 text-xs justify-center items-center sticky bottom-0">
        <p>Created by </p>
        <Link
          className="text-white transition-all hover:text-colors-pink-dot"
          href={LINKS.socialMedia["twitter_nachito"]}
          target="_blank"
        >
          @NachitoEth{" "}
        </Link>
        <p>&</p>
        <Link
          className="text-white transition-all hover:text-colors-pink-dot"
          href={LINKS.socialMedia["twitter_nicolas"]}
          target="_blank"
        >
          @BiondiniNicolas
        </Link>
      </footer>
    </main>
  );
}

export default Layout;
