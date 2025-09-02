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
    },
  },
  plugins: [],
}