/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    eslint: {
        dirs: ["src"],
    },
};

module.exports = nextConfig;