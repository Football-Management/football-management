/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
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
