/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverExternalPackages: ["@prisma/client", "ws"],
    },
    // Adding webpack fallback just in case experimental fails
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("ws");
        }
        return config;
    },
};

export default nextConfig;
