/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverExternalPackages: ["@prisma/client", "ws"],
    },

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("ws");
        }
        return config;
    },
};

export default nextConfig;
