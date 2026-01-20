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
                    DEFAULT: "#7c2d12", // Warm Brown
                    light: "#9a3412",
                    dark: "#431407",
                },
                secondary: {
                    DEFAULT: "#166534", // Farm Green
                    light: "#15803d",
                    dark: "#064e3b",
                },
                accent: {
                    DEFAULT: "#f59e0b", // Guinea Pig Orange/Amber
                    light: "#fbbf24",
                    dark: "#b45309",
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
