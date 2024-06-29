import { queryClientFinal } from "@/data/queryClient/queryClientInstance";

export const useInvalidate = () => {
  const queryClient = queryClientFinal;

  const invalidateAssetsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["assets"] });
  };

  const invalidateBalancesQuery = (address: string) => {
    queryClient.invalidateQueries({
      queryKey: ["balances"],
    });
  };

  return { invalidateAssetsQuery, invalidateBalancesQuery };
};
