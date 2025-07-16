/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(-50%) translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
