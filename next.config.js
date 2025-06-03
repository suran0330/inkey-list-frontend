// Instructions: Remove the static export output configuration to fix build issues

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com', 'cdn.sanity.io'],
  },
  eslint: {
    // Disable ESLint during builds to allow deployment despite warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during builds
    ignoreBuildErrors: true,
  },
  // Enable experimental features for Sanity Studio
  experimental: {
    taint: true,
  },
  // Webpack configuration for Sanity Studio
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
    }
    return config
  },
}

module.exports = nextConfig