const assetIdInfo: {
  [key: string]: { text: string; links: { twitter?: string; web?: string } };
} = {
  "30": {
    text: "DED is a new memecoin on the Polkadot network that has gained substantial attention. Launched in March 2024, it distributed tokens via a free airdrop to DOT holders, with a snapshot taken on March 18. This method sparked a rapid increase in community engagement, reminiscent of Dogecoin and Shiba Inu. Key players in Polkadot, like Talisman and Nova Wallet, support DED, aiding smooth adoption. DED’s rise highlights Polkadot’s ability to host community-driven projects. The humor and grassroots marketing around DED have boosted Polkadot’s network activity, with increased transaction fees and user activity. The excitement around DED suggests it could influence the crypto market and drive demand for DOT, Polkadot’s native token, showcasing the network’s potential for innovative projects.",
    links: {
      twitter: "https://x.com/dotisded",
      web: "https://www.dotisded.io/",
    },
  },
};

export const getAssetIdInfo = (assetId: string) => {
  if (assetIdInfo[assetId]) {
    return assetIdInfo[assetId];
  }
};
