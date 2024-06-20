import { useQueryClient } from "@tanstack/react-query";

export const useInvalidate = () => {
  const queryClient = useQueryClient();

  const invalidateAssetsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["assets"] });
  };

  const invalidateBalancesQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["balances"],
    });
  };

  return { invalidateAssetsQuery, invalidateBalancesQuery };
};
