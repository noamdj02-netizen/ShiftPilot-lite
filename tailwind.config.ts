import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        violet: "#8976FD",
        blue: "#7180FF",
        yellow: "#FCA61F",
        sky: "#6CC8FF",
        'grey-text': "#5E587A",
        dark: "#1a1a2e",
        // Primary Colors
        primary: {
          DEFAULT: "#8976FD", // violet
          yellow: "#FCA61F", // yellow
          light: "#A78BFA",
          dark: "#6D28D9",
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#8976FD",
          600: "#6D28D9",
        },
        // Secondary Colors
        secondary: {
          skyBlue: "#6CC8FF", // sky
          purple: "#C08EF3", // Easter Purple
          blue: "#7180FF", // blue
          yellow: "#F1D049", // Selective Yellow
          turquoise: "#6EDCC3", // Light Turquoise
        },
        // Text Colors
        text: {
          bright: "#32325C", // Bright Grey
          purple: "#4A4A69", // Purple Haze
          mid: "#5E587A", // Mid Grey
          white: "#FFFFFF",
          DEFAULT: "#32325C",
        },
        // State Colors
        state: {
          info: "#70B0ED",
          success: "#27AE60",
          warning: "#E2B93B",
          error: "#EB5757",
        },
        // Background
        bg: {
          DEFAULT: "#FFFFFF",
          soft: "#F9FAFB",
          pastel: "linear-gradient(135deg, #F5F3FF 0%, #FEFCE8 50%, #FDF2F8 100%)",
        },
        // Legacy support (mapped to new system)
        foreground: {
          DEFAULT: "#32325C",
          muted: "#5E587A",
          light: "#9CA3AF",
        },
        accentYellow: {
          DEFAULT: "#FCA61F",
          light: "#FDE047",
          dark: "#EAB308",
        },
        border: {
          DEFAULT: "#E5E7EB",
          soft: "rgba(15, 23, 42, 0.08)",
        },
      },
      
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-lg": ["3.75rem", { lineHeight: "1.15", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.2", fontWeight: "600" }],
        "display-sm": ["2.25rem", { lineHeight: "1.25", fontWeight: "600" }],
      },
      
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      
      boxShadow: {
        "premium": "0 18px 48px rgba(0, 0, 0, 0.08)",
        "soft": "0 8px 32px rgba(0, 0, 0, 0.04)",
        "framer": "0 22px 60px rgba(15, 23, 42, 0.08)",
        "framer-lg": "0 32px 80px rgba(15, 23, 42, 0.12)",
        "pastel": "0 20px 40px rgba(137, 118, 253, 0.05)",
        "pastel-lg": "0 25px 50px rgba(137, 118, 253, 0.08)",
      },
      
      backgroundImage: {
        "gradient-hero": "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        "gradient-primary": "linear-gradient(135deg, #8976FD 0%, #7180FF 100%)",
        "gradient-yellow": "linear-gradient(135deg, #FCA61F 0%, #FBBF24 100%)",
        "gradient-text": "linear-gradient(135deg, #8976FD 0%, #7180FF 100%)",
      },
      
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
