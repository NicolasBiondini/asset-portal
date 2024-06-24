import { useQueryClient } from "@tanstack/react-query";

export const useInvalidate = () => {
  const queryClient = useQueryClient();

  const invalidateAssetsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["assets"] });
  };

  const invalidateBalancesQuery = (address: string) => {
    queryClient.invalidateQueries({
      queryKey: ["balances", { address }],
    });
  };

  return { invalidateAssetsQuery, invalidateBalancesQuery };
};
