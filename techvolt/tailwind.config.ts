import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "burnt-yellow": "var(--burnt-yellow)",
        green: {
          1: "var(--green-1)",
          2: "var(--green-2)",
          3: "var(--green-3)",
          4: "var(--green-4)",
          5: "var(--green-5)",
        },
        blue: {
          1: "var(--blue-1)",
          2: "var(--blue-2)",
        },
        orange: "var(--orange)",
        white: "var(--white)",
        red: "var(--red)",
      },
      fontFamily: {
        arsenal: ["Arsenal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
