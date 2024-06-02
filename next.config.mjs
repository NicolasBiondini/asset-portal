/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "media3.giphy.com" },
      { hostname: "media4.giphy.com" },
      { hostname: "media0.giphy.com" },
      { hostname: "media2.giphy.com" },
      { hostname: "media1.giphy.com" },
    ],
  },
};

export default nextConfig;
