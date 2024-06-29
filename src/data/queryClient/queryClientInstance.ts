// queryClientInstance.ts
import { useQueryClientStore } from "./storage";

export const queryClientFinal = useQueryClientStore.getState().queryClient;
