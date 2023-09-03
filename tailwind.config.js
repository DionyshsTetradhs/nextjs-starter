module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
    variants: {
    extend: {
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce', 'hover', 'focus'],
    },
  },
  plugins: [require("daisyui")],
  daisyui :
{   themes: true,    
    darkTheme : "dark",
    base : true, // applies background color and foreground color for root element by default
    styled : true, // include daisyUI colors and design decisions for all components
    utils : true, // adds responsive and modifier utility classes
    rtl : false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix : "daisy-btn", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs : true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
