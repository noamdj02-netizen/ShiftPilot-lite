import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ===== ENTERPRISE PALETTE =====
        
        // Primary - Professional Blue
        primary: {
          DEFAULT: '#3B82F6',       // Professional Blue
          light: '#60A5FA',
          dark: '#2563EB',
          muted: '#DBEAFE',
        },
        
        // Accent - Deep Violet
        accent: {
          DEFAULT: '#6C63FF',       // Deep Violet (Low saturation)
          light: '#8B84FF',
          dark: '#5B52E6',
          muted: '#E8E6FF',
        },
        
        // Dashboard specific colors
        card: '#1C1C1E',
        
        // Backgrounds
        background: {
          DEFAULT: '#F3F4F6',       // Cool Gray (Light mode)
          dark: '#0D1B2A',          // Deep Navy (Dark mode)
          light: '#F3F4F6',         // Cool Gray
          secondary: '#FFFFFF',     // White
          tertiary: '#E5E7EB',      // Light Gray
        },
        
        // Surfaces
        surface: {
          DEFAULT: '#FFFFFF',       // White (Light mode)
          dark: '#1B263B',          // Business Blue (Dark mode)
          light: '#FFFFFF',
          secondary: '#F9FAFB',     // Very Light Gray
        },
        
        // Steel (Borders/Accents)
        steel: {
          DEFAULT: '#E0E5EB',       // Steel Light
          dark: '#415A77',          // Steel Dark
          light: '#E0E5EB',
        },
        
        // Text
        foreground: {
          DEFAULT: '#1F2937',       // Dark Gray (Light mode)
          secondary: '#6B7280',     // Medium Gray
          muted: '#9CA3AF',         // Light Gray
          light: '#D1D5DB',         // Very Light Gray
          inverse: '#FFFFFF',       // White
        },
        
        // Legacy colors for compatibility
        'background-dark': '#0D1B2A',
        'background-light': '#F3F4F6',
        'surface-dark': '#1B263B',
        'surface-light': '#FFFFFF',
        'steel-dark': '#415A77',
        'steel-light': '#E0E5EB',
        
        // Succès - Vert
        success: {
          DEFAULT: '#22C55E',       // Vert
          light: '#4ADE80',         // Vert clair
          dark: '#16A34A',          // Vert foncé
          muted: '#F0FDF4',         // Vert très clair (bg)
        },
        
        // Warning - Jaune/Orange
        warning: {
          DEFAULT: '#EAB308',       // Jaune
          light: '#FACC15',         // Jaune clair
          dark: '#CA8A04',          // Jaune foncé
          muted: '#FEFCE8',         // Jaune très clair (bg)
        },
        
        // Erreur - Rouge
        error: {
          DEFAULT: '#EF4444',       // Rouge
          light: '#F87171',         // Rouge clair
          dark: '#DC2626',          // Rouge foncé
          muted: '#FEF2F2',         // Rouge très clair (bg)
        },
        
        // Info - Bleu
        info: {
          DEFAULT: '#3B82F6',       // Bleu
          light: '#60A5FA',         // Bleu clair
          dark: '#2563EB',          // Bleu foncé
          muted: '#EFF6FF',         // Bleu très clair (bg)
        },
        
        // Bordures
        border: {
          DEFAULT: '#E7E5E4',       // Gris chaud clair
          light: '#F5F5F4',         // Très clair
          dark: '#D6D3D1',          // Gris moyen
          focus: '#F97316',         // Orange (focus)
        },
        
        // Shifts (Planning)
        shift: {
          morning: '#3B82F6',        // Bleu - Matin
          afternoon: '#F97316',      // Orange - Après-midi
          evening: '#8B5CF6',        // Violet - Soir
          night: '#1E293B',          // Slate foncé - Nuit
          rest: '#E2E8F0',           // Gris - Repos
        },
      },
      
      // ===== TYPOGRAPHIE =====
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      
      // ===== ESPACEMENTS =====
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      
      // ===== CONTAINERS RESPONSIVE =====
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      // ===== BORDER RADIUS (Corporate/Enterprise) =====
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',        // Reduced max radius for corporate feel
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      // ===== SHADOWS =====
      boxShadow: {
        'soft-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft-sm': '0 2px 4px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 8px 32px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 6px 10px -3px rgba(0, 0, 0, 0.06), 0 3px 6px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 20px -5px rgba(0, 0, 0, 0.08), 0 4px 8px -3px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 8px 16px -5px rgba(0, 0, 0, 0.06)',
        'soft-2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.12), 0 12px 24px -8px rgba(0, 0, 0, 0.08)',
        'premium': '0 18px 48px rgba(0, 0, 0, 0.08)',
        'glow-primary': '0 0 30px -5px rgba(249, 115, 22, 0.4)',
        'glow-secondary': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'glow-success': '0 0 30px -5px rgba(34, 197, 94, 0.4)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      
      // ===== ANIMATIONS =====
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.5s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 0.4s ease-out forwards',
        'slide-in-top': 'slideInTop 0.4s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      // ===== BACKGROUNDS =====
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #F97316 0%, #8B5CF6 100%)',
        'gradient-primary-reverse': 'linear-gradient(135deg, #8B5CF6 0%, #F97316 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF7ED 0%, #FDF2F8 50%, #F5F3FF 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent)',
        'dot-pattern': 'radial-gradient(circle, #E7E5E4 1px, transparent 1px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
