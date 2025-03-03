// /** @type {import('tailwindcss').Config} */

// module.exports ={
//     content:[
//         "./app/**/*.{js,ts,jsx,tsx,mdx}",
//         "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//         "./components/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/**/*.{js,ts,jsx,tsx,mdx}",
//         "../../pakages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
//     ],
//     theme:{
//         extend:{}
//     },
//     plugins:[],
// }

// const defaultTheme = require("tailwindcss/defaultTheme");
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

// const colors = require("tailwindcss/colors");
// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../pakages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    // rest of the code
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
