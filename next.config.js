// Instructions: Remove the static export output configuration to fix build issues

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com'],
  },
  eslint: {
    // Disable ESLint during builds to allow deployment despite warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during builds
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig