import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.hakush.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'starrailres.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
