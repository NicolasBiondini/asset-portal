import { MENU } from "@/config/constants";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useUIState } from "@/data/ui/storage";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  type?: "mobile" | "desktop";
  handleClose?: () => void;
};

function Menu({ type = "desktop", handleClose }: Props) {
  const { mode } = useUIState();
  const rourter = useRouter();

  return (
    <div className="flex flex-col gap-2 font-unbounded">
      {MENU.map((item) => {
        return (
          <Link
            onClick={handleClose && handleClose}
            key={`navmenu-${item.name}-${type}`}
            href={item.link}
          >
            <Button
              className={cn(
                { dark: mode === "dark" },
                {
                  "text-white bg-colors-bg-secondary":
                    rourter.asPath === item.link,
                },
                {
                  "bg-transparent text-colors-font-seconday":
                    rourter.asPath !== item.link,
                },
                "h-[35px]  hover:scale-[102%] transition-all hover:bg-card gap-2 items-center hover:text-white w-full flex justify-start text-xs"
              )}
            >
              <item.Icon className="w-4 h-4" />
              <p className="font-bold">{item.name}</p>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

export default Menu;
