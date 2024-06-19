import { AssetMetadata } from "@/types/asset";

export const validateAssetId = (value: string, assets: AssetMetadata[]) => {
  // Check if the value is not a number
  if (isNaN(Number(value))) {
    return "The value must be a number";
  }

  // Check if the value is not an integer
  if (!Number.isInteger(Number(value))) {
    return "The value must be an integer";
  }

  // Check if the value is not positive
  if (Number(value) <= 0) {
    return "The value must be a positive number";
  }

  // Check if the value matches any existing asset id
  if (assets.some((asset) => asset.id === value)) {
    return "The value must be unique and not match any existing asset id";
  }

  // If all checks pass, return null (no error)
  return "";
};

export const validateString = (value: string, length?: number) => {
  // Check if the value is an empty string
  if (value.trim() === "") {
    return "The value is required";
  }

  if (length && value.length < length) {
    return `Min length required is ${length}`;
  }

  // If all checks pass, return null (no error)
  return "";
};

export const validateDecimals = (value: string) => {
  // Check if the value is an empty string
  if (value.trim() === "") {
    return "The value is required";
  }
  // Check if the value is not a number
  if (isNaN(Number(value))) {
    return "The value must be a number";
  }

  // Check if the value is not an integer
  if (!Number.isInteger(Number(value))) {
    return "The value must be an integer";
  }

  // Check if the value is less than 6
  if (Number(value) < 6) {
    return "The value must be at least 6";
  }

  // Check if the value is greater than 18
  if (Number(value) > 18) {
    return "The value must be at most 18";
  }

  // If all checks pass, return null (no error)
  return "";
};

export const validateMinBalance = (value: string) => {
  // Check if the value is an empty string
  if (value.trim() === "") {
    return "The value is required";
  }
  // Check if the value is not a number
  if (isNaN(Number(value))) {
    return "The value must be a number";
  }
  // If all checks pass, return null (no error)
  return "";
};

export const validateInitialMint = (value: string) => {
  // Check if the value is an empty string
  if (value.trim() === "") {
    return "The value is required";
  }
  // Check if the value is not a number
  if (isNaN(Number(value))) {
    return "The value must be a number";
  }
  // Check if the value is greater than 1000000000000
  if (Number(value) > 1000000000000) {
    return "The value must be at most 1000000000000 units.";
  }
  // Check if the value is less than 10k
  if (Number(value) < 10000) {
    return "The value must be at least 10.000 units.";
  }

  // If all checks pass, return null (no error)
  return "";
};
