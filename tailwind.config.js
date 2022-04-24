const tailwindColors = require('tailwindcss/colors');
const tailwindForms = require('@tailwindcss/forms');
const aspectRatio = require('@tailwindcss/aspect-ratio');
const lineClamp = require('@tailwindcss/line-clamp');
const colors = require('./colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      // PRIMARY
      // These are the splashes of color that should appear the most in your UI,
      // and are the ones that determine the overall "look" of the site. Use these
      // for things like primary actions, links, navigation items, icons, accent
      // borders, or text you want to emphasize.
      green: colors.green,
      // NEUTRALS
      // These are the colors you will use the most and will make up the majority
      // of your UI. Use them for most of your text, backgrounds, and borders,
      // as well as for things like secondary buttons and links.
      gray: colors.gray,
      // SUPPORTING
      // These colors should be used fairly conservatively throughout your UI to
      // avoid overpowering your primary colors. Use them when you need an
      // element to stand out, or to reinforce things like error states or positive
      // trends with the appropriate semantic color.
      red: colors.red,
      purple: colors.purple,
      yellow: colors.yellow,

      // TAILWIND
      // cyan: tailwindColors.cyan,
      // green: tailwindColors.green,
      // slate: tailwindColors.slate,
      blue: tailwindColors.blue,
      grey: tailwindColors.gray,
      // blue: colors.blue,
      // pink: colors.pink,
      // orange: colors.orange,
      // brown: colors.brown,

      // CUSTOM COLORS
      'dark-blue': '#00315F',
      'orange': '#D6870D',
      'dark-orange': '#AF6E08',
    },
    screens: {
      'sm': '640px',   // => @media (min-width: 640px) { ... }
      'md': '768px',   // => @media (min-width: 768px) { ... }
      'lg': '1024px',  // => @media (min-width: 1024px) { ... }
      'xl': '1280px',  // => @media (min-width: 1280px) { ... }
      '2xl': '1420px', // => @media (min-width: 1420px) { ... }
    },
    extend: {},
  },
  plugins: [
    tailwindForms,
    lineClamp,
    aspectRatio,
  ],
}
