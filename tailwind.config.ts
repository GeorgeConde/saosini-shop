import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#00473e", // Saosini Dark Green
                    light: "#006356",
                    dark: "#002b26",
                },
                secondary: {
                    DEFAULT: "#b68a00", // Saosini Gold
                    light: "#dca700",
                    dark: "#8a6900",
                },
                accent: {
                    DEFAULT: "#00473e", // Reusing brand green or a variation
                    light: "#008a78",
                    dark: "#002b26",
                },
                neutral: {
                    50: "#fafaf9",
                    100: "#f5f5f4",
                    200: "#e7e5e4",
                    300: "#d6d3d1",
                    400: "#a8a29e",
                    500: "#78716c",
                    600: "#57534e",
                    700: "#44403c",
                    800: "#292524",
                    900: "#1c1917",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
                display: ["var(--font-plus-jakarta)", "ui-sans-serif", "system-ui"],
            },
        },
    },
    plugins: [],
} satisfies Config;
