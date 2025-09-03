/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        elegant: ['Great Vibes', 'cursive'],
        cute: ['Mali', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce': 'bounce 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}