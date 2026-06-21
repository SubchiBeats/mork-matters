/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand palette — "knowledge nebula"
        nebula: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        aurora: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        magenta: {
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
        },
        ink: {
          900: '#0a0a14',
          800: '#11111f',
          700: '#1a1a2e',
          600: '#252540',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99, 102, 241, 0.6)',
        'glow-cyan': '0 0 40px -8px rgba(34, 211, 238, 0.6)',
        'glow-magenta': '0 0 40px -8px rgba(217, 70, 239, 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 1.2s ease-out infinite',
        'pop-in': 'pop-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
