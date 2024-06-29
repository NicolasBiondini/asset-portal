// queryClientStore.ts
import create from "zustand";
import { QueryClient } from "@tanstack/react-query";

interface QueryClientState {
  queryClient: QueryClient;
}

export const useQueryClientStore = create<QueryClientState>(() => ({
  queryClient: new QueryClient(),
}));
