import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { useUIState } from "@/data/ui/storage";
import Layout from "@/components/Layout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { mode } = useUIState();
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased  text-foreground",
          fontSans.variable,
          { dark: mode === "dark" }
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
