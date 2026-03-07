import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend.test/api/:path*',
      },
      {
        source: '/sanctum/csrf-cookie',
        destination: 'http://backend.test/sanctum/csrf-cookie',
      },
    ];
  },
};

export default nextConfig;
