import type { NextConfig } from 'next';

/**
 * Allow next/image to optimize Cloudinary URLs.
 * Reads your cloud name from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // match any path under your cloud
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
