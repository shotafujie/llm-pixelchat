/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/ollama/:path*',
        destination: `${process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || 'http://localhost:11434'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
