/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  tailwind: {
    config: './tailwind.config.js',
  },
};

export default nextConfig;
