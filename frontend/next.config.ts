import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*'],
    },
  },
  webpack: (config, { isServer }) => {
    // Optimize chunk size
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
    }
    
    // Disable source maps in production
    if (!isServer) {
      config.optimization.minimize = true
      config.devtool = false
    }
    
    return config
  },
};

export default nextConfig;
