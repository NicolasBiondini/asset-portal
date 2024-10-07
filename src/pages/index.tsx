import AssetPortal from "@/components/icons/assets/AssetPortal";
import { Button } from "@/components/ui/button";
import { SUB_MENU_LINKS } from "@/config/constants";
import Link from "next/link";

type Props = {};

export default function Home({}: Props) {
  return (
    <section className="flex h-screen flex-col gap-8 w-full px-8 lg:px-24 lg:py-14 justify-center items-center  dark text-foreground">
      <div className=" flex flex-col gap-4 justify-center items-center max-w-[300px] lg:max-w-[700px]">
        <AssetPortal className="w-[300px] md:w-[500px] h-auto" />
        <div className="flex flex-col gap-1">
          <h1 className="text-colors-pink-dot text-xl text-center font-bold font-unbounded">
            Welcome to AssetPortal!
          </h1>
          <p className="text-center text-xs">
            {
              "We're thrilled to have the support of our amazing community as we continue to build and improve."
            }
          </p>
          <p className="text-center text-xs">
            {
              "The team is hard at work developing the new version of AssetPortal, which will go live in Q1 2025."
            }
          </p>
          <p className="text-center text-xs">
            {
              "In the meantime, feel free to use our MVP and stay updated on all our latest news by following us on Twitter."
            }
          </p>
          <p className="text-center text-xs">{"Thank you!"}</p>
        </div>
        <div className="flex gap-4">
          <Link target="_blank" href={SUB_MENU_LINKS[1].link}>
            <Button>Follow us on twitter</Button>
          </Link>
          <Link href={"/mvp"}>
            <Button>Go to the MVP</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
