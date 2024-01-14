/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.clip-triangle': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
