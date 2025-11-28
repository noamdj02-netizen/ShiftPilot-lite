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
        // Marketing Landing Page Design System
        bg: "#FFFFFF",
        "bg-soft": "#F9FAFF",
        navy: "#0C1033",
        purple: "#5F3FF1",
        peach: "#FFE1D7",
        "yellow-soft": "#FFEFB8",
        lilac: "#F4E8FF",
        border: "#ECECF5",
        "text-main": "#151515",
        "text-muted": "#70728C",
        success: "#3CCB7F",
        // Dashboard colors (dark mode)
        background: {
          DEFAULT: "#F9FAFB",
          secondary: "#FFFFFF",
          tertiary: "#F3F4F6",
          elevated: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#0B1120",
          muted: "#6B7280",
          subtle: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#4ADE80",
          hover: "#22C55E",
          muted: "#4ADE8020",
        },
        muted: "#6B7280",
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#F9FAFB",
        },
        // Dark mode (dashboard) - overrides when dark class is present
        dark: {
          background: {
            DEFAULT: "#0A0A0B",
            secondary: "#111113",
            tertiary: "#18181B",
            elevated: "#1F1F23",
          },
          foreground: {
            DEFAULT: "#FAFAFA",
            muted: "#A1A1AA",
            subtle: "#71717A",
          },
          border: {
            DEFAULT: "#27272A",
            hover: "#3F3F46",
          },
          card: {
            DEFAULT: "#18181B",
            hover: "#1F1F23",
          },
        },
        // Semantic colors
        warning: "#FBBF24",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(74, 222, 128, 0.15)",
        "glow-lg": "0 0 40px rgba(74, 222, 128, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
        "landing-card": "0 18px 40px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

