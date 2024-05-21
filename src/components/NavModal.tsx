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

function NavModal() {
  const { mode } = useUIState();

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className={cn({ dark: mode === "dark" })} side={"left"}>
        <SheetHeader className="font-sans flex gap-6 mt-5">
          <SheetTitle>AssetHubHub</SheetTitle>
          <SheetDescription className="flex flex-col gap-2">
            <Button
              className={cn(
                { dark: mode === "dark" },
                "h-[35px] bg-card text-card-foreground hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs"
              )}
            >
              Home
            </Button>
            <Button className="h-[35px] bg-card text-card-foreground hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
              Teleport
            </Button>{" "}
            <Button className="h-[35px] bg-card text-card-foreground hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
              Transfer
            </Button>{" "}
            <Button className="h-[35px] bg-card text-card-foreground hover:scale-[102%] transition-all hover:bg-card hover:text-white w-full flex justify-start text-xs">
              Swap
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavModal;
