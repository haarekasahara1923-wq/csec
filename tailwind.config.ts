import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0F2A44",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#F4A300",
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#1E3D59",
                    foreground: "#FFFFFF",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                poppins: ["var(--font-poppins)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
