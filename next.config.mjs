/** @type {import("next").NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5236/api/:path*'
      }
    ]
  },
  reactStrictMode: false
};

export default nextConfig;
