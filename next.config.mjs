/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jypetjaadblrxnxsuxoz.supabase.co',
        pathname: '/storage/v1/object/sign/**'
      }
    ]
  }
  // output: 'export'
}

export default nextConfig
