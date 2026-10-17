/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 24px 70px rgba(175, 82, 110, 0.16)',
        yes: '0 14px 30px rgba(235, 88, 133, 0.32)',
      },
    },
  },
  plugins: [],
}
