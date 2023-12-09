/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.css",  // Aggiungi il percorso ai file CSS di Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
