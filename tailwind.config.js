/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,jsx}",
      "./src/components/**/*.{js,jsx}",
      "./src/app/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          // In Tailwind v4, we need to define colors directly at the root level
          'primary-50': '#f0f9ff',
          'primary-100': '#e0f2fe',
          'primary-200': '#bae6fd',
          'primary-300': '#7dd3fc',
          'primary-400': '#38bdf8',
          'primary-500': '#0ea5e9',
          'primary-600': '#0284c7',
          'primary-700': '#0369a1',
          'primary-800': '#075985',
          'primary-900': '#0c4a6e',
          'dark': '#121212',
        },
        animation: {
          'spin-slow': 'spin 8s linear infinite',
          'float': 'float 6s ease-in-out infinite',
          'fadeIn': 'fadeIn 1.5s ease-in-out',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  };