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
        obsidian: {
          DEFAULT: '#0D0D12',
          deep: '#07070B',
          card: '#13131D',
          surface: '#1A1A26',
          border: 'rgba(201, 168, 76, 0.15)'
        },
        gold: {
          DEFAULT: '#F59E0B',
          bright: '#FBBF24',
          champagne: '#C9A84C',
          dark: '#B45309',
          glow: 'rgba(245, 158, 11, 0.25)'
        },
        slateCustom: {
          DEFAULT: '#2A2A35',
          text: '#94A3B8',
          muted: '#64748B'
        },
        crimson: {
          DEFAULT: '#EF4444',
          dark: '#991B1B'
        }
      },
      fontFamily: {
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
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
        'gold-glow': '0 0 50px -10px rgba(201, 168, 76, 0.3)',
        'gold-sm': '0 0 20px -5px rgba(245, 158, 11, 0.35)',
        'card-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
};
