/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy API calls to the backend in development (set API_URL in other environments).
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${process.env.API_URL ?? 'http://localhost:3000'}/api/:path*` }];
  }
};

export default nextConfig;
