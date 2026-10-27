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
        void: {
          DEFAULT: '#070714',
          deep: '#04040A',
          card: '#0F0F26',
          surface: '#151536',
          border: 'rgba(123, 97, 255, 0.22)'
        },
        plasma: {
          DEFAULT: '#7B61FF',
          bright: '#9D8CFF',
          dark: '#583DFF',
          glow: 'rgba(123, 97, 255, 0.35)'
        },
        cyanCustom: {
          DEFAULT: '#00F5D4',
          bright: '#5DFCE5',
          dark: '#05B29B',
          glow: 'rgba(0, 245, 212, 0.35)'
        },
        neonRose: {
          DEFAULT: '#F43F5E',
          bright: '#FB7185',
          glow: 'rgba(244, 63, 94, 0.35)'
        },
        ghost: {
          DEFAULT: '#F0EFF4',
          muted: '#9494B8',
          dark: '#5C5C7A'
        }
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'plasma-glow': '0 0 50px -10px rgba(123, 97, 255, 0.45)',
        'cyan-glow': '0 0 35px -5px rgba(0, 245, 212, 0.4)',
        'rose-glow': '0 0 35px -5px rgba(244, 63, 94, 0.4)',
        'card-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
};
