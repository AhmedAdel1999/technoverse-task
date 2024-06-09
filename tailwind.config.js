/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "xs":"0px",
      'sm': '650px',
      'md': '990px',
      'lg': '1200px',
      'xl': '1380px',
      '2xl': '1536px',
    },
    extend: {
      colors:{
        "bgColor":"#fcfcfc",
        "ligthbgColor":"#fde4e4",
        "darkerText":"#212245",
        "darkText":"#777",
        "mainColor":"#df2020",
        
      },
      fontSize:{
        "custom":["12px","25px"]
      },
      keyframes:{
        "loader":{
              "0%":{ 
                transform: "scale(1,0.4)"
            }, 
            "20%": { 
              transform: "scale(1,0.1)"
          },
            "40%":{ 
              transform: "scale(1,0.4)"
            }, 
            "100%" :{ 
              transform: "scale(1,0.4)"
            }, 
        }
      },
      animation:{
        "loader":"loader 1.2s infinite ease-out"
      }
    },
  },
  plugins: [],
}

