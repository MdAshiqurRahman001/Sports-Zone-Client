/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          850: '#172033',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #431407 100%)',
        'card-gradient': 'linear-gradient(145deg, #1e293b, #0f172a)',
        'brand-gradient': 'linear-gradient(135deg, #1e293b 0%, #9a3412 100%)',
        'orange-glow': 'radial-gradient(circle at center, rgba(234,88,12,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(234, 88, 12, 0.3)',
        'glow-sm': '0 0 15px rgba(234, 88, 12, 0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(234,88,12,0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideRight: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary":   "#ea580c",
          "secondary": "#1e293b",
          "accent":    "#fb923c",
          "neutral":   "#0f172a",
          "base-100":  "#0f172a",
          "base-200":  "#1e293b",
          "base-300":  "#334155",
          "info":      "#38bdf8",
          "success":   "#22c55e",
          "warning":   "#f59e0b",
          "error":     "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")]
}
