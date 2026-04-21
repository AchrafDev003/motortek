/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0F172A',
        surface: '#1E293B',
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
        },
        brand: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
        },
      },
      boxShadow: {
        glass: '0 20px 60px rgba(2, 6, 23, 0.35)',
        soft: '0 10px 30px rgba(2, 6, 23, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
