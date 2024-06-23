import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useUIState } from "@/data/ui/storage";
import { cn } from "@/lib/utils";
import { GlobeLock, Info, MenuIcon } from "lucide-react";
import { Unbounded } from "next/font/google";
import { AssetHub } from "./icons/assets";
import Menu from "./Menu";
import { useState } from "react";
import Link from "next/link";
import { SUB_MENU_LINKS } from "@/config/constants";
import SelectNetworkAssetHub from "./modals/SelectNetworkAssetHub";
import { useRouter } from "next/router";
import AssetPortal from "./icons/assets/AssetPortal";
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "700"],
});
function NavModal() {
  const { mode } = useUIState();
  const rourter = useRouter();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:hidden bg-transparent text-card-foreground hover:scale-[102%] transition-all hover:bg-card h-10 w-10">
        <MenuIcon className="w-4 h-4 " />
      </SheetTrigger>
      <SheetContent
        className={cn({ dark: mode === "dark" }, unbounded.variable)}
        side={"left"}
      >
        <SheetHeader className="font-sans w-full flex gap-6 mt-8">
          <SheetTitle>
            <div className="flex font-unbounded items-center gap-1">
              <Link href={"/"}>
                <AssetPortal className="w-44 h-auto" />
              </Link>{" "}
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-2 font-unbounded justify-between h-full "></SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 h-[85%] pt-2 pb-10 justify-between text-colors-font-seconday font-unbounded">
          <Menu type="mobile" />
          <div className="flex w-full gap-6 flex-col">
            <div className="flex flex-col gap-2">
              <SelectNetworkAssetHub>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-[35px] border-colors-bg-light text-colors-font-seconday hover:scale-[102%] transition-all  hover:bg-card gap-2 items-center hover:text-white w-full flex justify-between text-xs"
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
              <div className="flex gap-2 h-full w-full">
                {SUB_MENU_LINKS.map((link) => {
                  return (
                    <Link
                      key={link.name}
                      href={link.link}
                      className="group"
                      target="_blank"
                    >
                      <link.Icon className="w-5 h-5 group-hover:text-white transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default NavModal;
