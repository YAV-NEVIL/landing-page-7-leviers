/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      colors: {
        carbon: {
          DEFAULT: '#0A0A0F',
          deep: '#050508',
          card: '#141420',
          surface: '#1A1A28',
          border: 'rgba(245, 158, 11, 0.22)'
        },
        amberGold: {
          DEFAULT: '#F59E0B',
          bright: '#FBBF24',
          dark: '#D97706',
          light: '#FEF3C7',
          glow: 'rgba(245, 158, 11, 0.35)'
        },
        crimson: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          glow: 'rgba(239, 68, 68, 0.35)'
        },
        slateCustom: {
          DEFAULT: '#2A2A38',
          text: '#94A3B8',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'gold-glow': '0 0 50px -10px rgba(245, 158, 11, 0.45)',
        'gold-sm': '0 0 25px -5px rgba(245, 158, 11, 0.45)',
        'card-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
};
