/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    backgroundOpacity: false,
    textOpacity: false,
    borderOpacity: false,
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: "10px",
      },
    },
  },
};
