import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useUIState } from "@/data/ui/storage";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Unbounded } from "next/font/google";
import { AssetHub } from "./icons/assets";
import Menu from "./Menu";
import { useState } from "react";
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "700"],
});
function NavModal() {
  const [open, setOpen] = useState(false);
  const { mode } = useUIState();

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open}>
      <SheetTrigger
        onClick={handleClose}
        className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:hidden bg-transparent text-card-foreground hover:scale-[102%] transition-all hover:bg-card h-10 w-10"
      >
        <MenuIcon className="w-4 h-4 " />
      </SheetTrigger>
      <SheetContent
        className={cn({ dark: mode === "dark" }, unbounded.variable)}
        side={"left"}
      >
        <SheetHeader className="font-sans w-full flex gap-6 mt-8">
          <SheetTitle>
            <div className="flex font-unbounded items-center gap-1">
              <AssetHub className="w-6 h-6" />
              <h1 className="font-bold text-[13px] mt-1">
                AssetHubHub
                <span className="text-[8px] font-sans text-colors-pink-dot">
                  beta
                </span>
              </h1>
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-2 font-unbounded">
            <Menu type="mobile" handleClose={handleClose} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavModal;
