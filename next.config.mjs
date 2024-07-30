/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jypetjaadblrxnxsuxoz.supabase.co',
        pathname: '/storage/v1/object/sign/**'
      }
    ]
  }
}

export default nextConfig
