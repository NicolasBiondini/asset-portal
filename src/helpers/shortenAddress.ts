export function shortenAddress(
  address: string,
  characters: number = 5
): string {
  if (address.length <= 10) {
    return address;
  }
  const start = address.slice(0, characters);
  const end = address.slice(-characters);
  return `${start}...${end}`;
}
