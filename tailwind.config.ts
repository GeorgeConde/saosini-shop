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
                    DEFAULT: "#02733E", // Saosini Forest Green
                    light: "#038C4D",
                    dark: "#025939",
                },
                secondary: {
                    DEFAULT: "#A67D03", // Saosini Gold
                    light: "#F2E1AC",
                    dark: "#806000",
                },
                accent: {
                    DEFAULT: "#02733E",
                    light: "#038C4D",
                    dark: "#025939",
                },
                neutral: {
                    50: "#F2F2F2", // Using the new background as neutral 50
                    100: "#E5E5E5",
                    200: "#D4D4D4",
                    300: "#A3A3A3",
                    400: "#737373",
                    500: "#525252",
                    600: "#404040",
                    700: "#262626",
                    800: "#171717",
                    900: "#0A0A0A",
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
