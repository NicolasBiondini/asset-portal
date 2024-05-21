import Balances from "@/components/Balances";
import { useConnection } from "@/hooks/useConnection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useConnection();
  return (
    <main
      className={`flex min-h-screen flex-col items-start gap-7 px-8 lg:px-24 lg:py-14 ${inter.className}`}
    >
      <Balances />
    </main>
  );
}
