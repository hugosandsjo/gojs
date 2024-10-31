/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hugosandsj-131694503.imgix.net",
      },
    ],
  },
};

export default nextConfig;
