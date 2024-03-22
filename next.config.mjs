/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "imagedelivery.net",
        },
      ],
    },
    reactStrictMode: true,
  };
  
  export default nextConfig;
  