/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.futbin.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.futwiz.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
