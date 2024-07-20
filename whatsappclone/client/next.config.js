/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
     NEXT_PUBLIC_ZEGO_APP_ID:1273960231,
     NEXT_PUBLIC_ZEGO_SERVER_ID: "3c4e644c686aac7d5d9eed4b6725b21f",
  },
  images:{
     domains: ["localhost"],
  },
};

module.exports = nextConfig;
