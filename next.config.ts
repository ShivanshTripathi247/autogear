/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        // Add path pattern to match all image variations
        pathname: '/**',
      }
    ],
    // For Next.js versions below 13.3
    domains: [
      'img.clerk.com',
      'images.clerk.dev',
      'ucarecdn.com'
    ]
  }
}