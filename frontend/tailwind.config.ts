import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: {
          grayLight: "#EFEFEF",
          greenLight: "#03E574",
          dark: "#212529",
          greenPrimary: "#009B4D",
          grayDark: "#3C434A",
          bluePrimary: "#00419B",
          greenDark: "#13A235",
          blueLightHover: "#E8F6F8",
          bgGray: "#EFEEEE",
          grayWrite: "#58595B"
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
