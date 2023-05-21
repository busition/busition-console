/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = process.env.NEXT_PUBLIC_BASE_PARAMS;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때의 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조를 동일하게 생성
  async rewrites() {
    return [
      {
        source: "/api/route/:route/:direction",
        destination:
          "http://api.dev.busition.com:8001/latest/route/:route?shuttle_direction=:direction",
      },
      {
        source: "/api/route/",
        destination: "http://api.dev.busition.com:8001/latest/route/",
      },
    ];
  },
};

module.exports = nextConfig;
