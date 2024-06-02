import Balances from "@/components/Balances";
import { useConnection } from "@/hooks/useConnection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Balances />;
}
