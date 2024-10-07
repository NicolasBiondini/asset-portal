import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { useQueryClientStore } from "@/data/queryClient/storage";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useQueryClientStore((state) => state.queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  );
}
