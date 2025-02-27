/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "10px",
      },
      colors: {
        "xanh-400": "var(--color-xanh-400)",
        "xanh-500": "var(--color-xanh-500)",
      },
    },
  },
  plugins: [],
};
