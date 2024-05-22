export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    console.error("Clipboard API not supported");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
