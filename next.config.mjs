/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@prisma/client", "ws"],
    experimental: {
        serverActions: {
            bodySizeLimit: "100mb",
        },
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("ws");
        }
        return config;
    },
};

export default nextConfig;
