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
        // Backgrounds (du plus foncé au plus clair)
        background: {
          DEFAULT: "#030712",      // Presque noir
          secondary: "#0a0f1a",    // Bleu très foncé
          tertiary: "#111827",     // Gris bleuté foncé
          elevated: "#1a2332",     // Cartes élevées
          hover: "#1f2937",        // Hover states
        },
        
        // Foreground / Text
        foreground: {
          DEFAULT: "#f8fafc",      // Blanc cassé
          secondary: "#94a3b8",    // Gris moyen
          muted: "#64748b",        // Gris foncé
          subtle: "#475569",       // Très subtil
        },
        
        // Accent principal - Bleu électrique
        accent: {
          DEFAULT: "#3b82f6",      // Bleu principal
          light: "#60a5fa",        // Bleu clair
          dark: "#2563eb",         // Bleu foncé
          muted: "#3b82f620",      // Bleu transparent
          glow: "#3b82f640",       // Pour les glows
        },
        
        // Accent secondaire - Cyan
        cyan: {
          DEFAULT: "#06b6d4",
          light: "#22d3ee",
          dark: "#0891b2",
          muted: "#06b6d420",
        },
        
        // Accent tertiaire - Violet
        violet: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
          muted: "#8b5cf620",
        },
        
        // Success - Emerald
        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          muted: "#10b98120",
        },
        
        // Warning
        warning: {
          DEFAULT: "#f59e0b",
          muted: "#f59e0b20",
        },
        
        // Error
        error: {
          DEFAULT: "#ef4444",
          muted: "#ef444420",
        },
        
        // Borders
        border: {
          DEFAULT: "#1e293b",      // Bordure standard
          light: "#334155",        // Bordure hover
          accent: "#3b82f650",     // Bordure accent
        },
      },
      
      // Gradients personnalisés
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.05) 50%, transparent 75%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.3), transparent)',
        'card-gradient': 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      },
      
      // Box shadows
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 40px -10px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 60px -15px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 40px -10px rgba(6, 182, 212, 0.4)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-down': 'fadeDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'border-dance': 'borderDance 4s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderDance: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
