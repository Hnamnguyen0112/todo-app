/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars0.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
