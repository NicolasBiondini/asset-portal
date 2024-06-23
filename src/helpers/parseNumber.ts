export function parseNumber(value: string, decimals?: number): string {
  const firstNum = value.replace(/,/g, "");
  const num = !!decimals ? Number(firstNum) / 10 ** decimals : Number(firstNum);

  if (!isNaN(num)) {
    if (num >= 1000000000) {
      return `${Math.round(num / 100000000) / 10}B`;
    } else if (num >= 1000000) {
      return `${Math.round(num / 100000) / 10}M`;
    } else if (num >= 1000) {
      return `${Math.round(num / 100) / 10}k`;
    } else {
      return num.toString();
    }
  } else {
    return "Invalid number";
  }
}
