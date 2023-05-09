/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
