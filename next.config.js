/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 600
  },
  optimizeFonts: false,
}

module.exports = nextConfig
