/** @type {import('next').NextConfig} */

module.exports = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
}