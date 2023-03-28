/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["images.otstatic.com", "resizer.otstatic.com"],
    },
};

module.exports = nextConfig;
