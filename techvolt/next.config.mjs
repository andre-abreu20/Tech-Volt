/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],
    formats: ["image/webp"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:3000/socket.io/:path*",
      },
    ];
  },
};

export default nextConfig;
