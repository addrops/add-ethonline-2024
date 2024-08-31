/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Fixes npm packages that depend on `fs` module
      }
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
