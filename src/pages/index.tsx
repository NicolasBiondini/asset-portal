import Balances from "@/components/Balances";
import { useConnection } from "@/hooks/useConnection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useConnection();
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-7 p-24 ${inter.className}`}
    >
      <h1>hello world</h1>
      <Balances />
    </main>
  );
}
