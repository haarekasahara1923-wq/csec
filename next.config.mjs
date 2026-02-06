/** @type {import('next').NextConfig} */
const nextConfig = {
    // serverExternalPackages is a top-level property in Next.js 14.2+
    serverExternalPackages: ["@prisma/client", "ws"],

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("ws");
        }
        return config;
    },
};

export default nextConfig;
