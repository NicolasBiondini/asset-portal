export const convertBigInt = (
  number: string,
  decimals: number = 10
): string => {
  const planckFactor = Math.pow(10, decimals);
  const amount = Number(number) * planckFactor;
  return amount.toString();
};
