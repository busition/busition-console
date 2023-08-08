/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = process.env.NEXT_PUBLIC_BASE_PARAMS;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // assetPrefix: !debug ? `/${repository}/` : "", // production 일때의 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조를 동일하게 생성
  async rewrites() {
    return [
      {
        source: "/api/socket",
        destination: "https://socket2.dev.busition.com",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://api.dev2.busition.com/latest/:path*",
      },
      {
        source: "/api/stations/",
        destination: "https://api.dev2.busition.com/latest/stations/",
      },
      {
        source: "/api/:path*",
        destination: "https://api.dev2.busition.com/latest/:path*",
      },
      {
        source: "/api/newOrder",
        destination: "http://localhost:5050/v1/inicis/new/order",
      },
    ];
  },
};

module.exports = nextConfig;
