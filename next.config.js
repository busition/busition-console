/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = process.env.NEXT_PUBLIC_BASE_PARAMS;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때의 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조를 동일하게 생성
};

module.exports = nextConfig;
