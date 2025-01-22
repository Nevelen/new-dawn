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
        trirong_reg: ["trirong_reg","sans-serif"], 
        trirong_bold: ["trirong_bold","sans-serif"], 
        trirong_light: ["trirong_light","sans-serif"], 
      }
    },
  },
  plugins: [],
}

