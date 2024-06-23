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
  DOT: {
    text: "DOT is the native token of the Polkadot network, designed to facilitate interoperability between different blockchains within the Polkadot ecosystem. As one of the leading projects in the blockchain space, DOT has garnered significant attention for its innovative approach to scalability, governance, and security. The Polkadot community actively participates in governance decisions using DOT tokens, making it a key asset for network governance. DOT's utility extends beyond the Polkadot network, with integrations and partnerships across various decentralized finance (DeFi) platforms.",
    links: {
      twitter: "https://twitter.com/Polkadot",
      web: "https://polkadot.network/",
    },
  },
  "1984": {
    text: "USDt is a stablecoin pegged to the US Dollar, designed to provide stability and liquidity in the decentralized finance (DeFi) ecosystem. As a popular choice for traders and investors, USDt offers a reliable means of transferring value on the Polkadot network and other blockchain platforms. Its integration with Polkadot's parachains and cross-chain functionalities enhances the interoperability and usability of USDt within the broader blockchain ecosystem.",
    links: {
      twitter: "https://twitter.com/Tether_to",
      web: "https://tether.to/",
    },
  },
  "1337": {
    text: "USDC is a stablecoin backed by US dollars, offering stability and liquidity for users within the Polkadot ecosystem and beyond. With its focus on regulatory compliance and transparency, USDC has become a trusted asset for traders, investors, and decentralized applications (dApps) on various blockchain platforms. Its integration with Polkadot's infrastructure enables seamless cross-chain transactions and enhances the overall utility of USDC in decentralized finance (DeFi) applications.",
    links: {
      twitter: "https://twitter.com/centre_io",
      web: "https://www.centre.io/usdc",
    },
  },
  "23": {
    text: "PINK is a memecoin on the Polkadot network, known for its vibrant community and engagement in the decentralized finance (DeFi) space. As a memecoin, PINK embodies the creative and playful aspects of blockchain communities, often used in social experiments and community-driven initiatives. Its presence on Polkadot's ecosystem adds diversity and inclusivity to the network, showcasing the versatility and adaptability of blockchain technology.",
    links: {
      twitter: "https://x.com/pinkonomic",
      web: "https://dotispink.com/",
    },
  },
};

export const getAssetIdInfo = (assetId: string) => {
  if (assetIdInfo[assetId]) {
    return assetIdInfo[assetId];
  }
};
