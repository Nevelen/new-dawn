/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
      },
      fontFamily :{ 
        kohstante_reg: ["kohstante-reg","sans-serif"], 
      }
    },
  },
  plugins: [],
}

