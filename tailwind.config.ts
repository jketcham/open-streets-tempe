import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "3xs": "320px",
      "2xs": "360px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: [
          "Gabarito",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        display: [
          "Hepta Slab",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        tachi: {
          "50": "#f7f9ec",
          "100": "#eef1d5",
          "200": "#dfe5ae",
          "300": "#cbd171",
          DEFAULT: "#cbd171",
          "400": "#b5b73d",
          "500": "#9f9d37",
          "600": "#8a802d",
          "700": "#5e5220",
          "800": "#625327",
          "900": "#514325",
          "950": "#342914",
        },
        apricot: {
          "50": "#fff5ed",
          "100": "#ffe9d4",
          "200": "#ffd0a9",
          "300": "#ffaf74",
          DEFAULT: "#ffaf74",
          "400": "#fe8139",
          "500": "#fc5e13",
          "600": "#ed4309",
          "700": "#c53009",
          "800": "#9c2710",
          "900": "#7e2210",
          "950": "#440f06",
        },
        eggplant: {
          "50": "#f7f8fd",
          "100": "#eaedfb",
          "200": "#dde1f8",
          "300": "#c5caf2",
          "400": "#a9acea",
          "500": "#918fe0",
          DEFAULT: "#918fe0",
          "600": "#7e74d2",
          "700": "#665cb7",
          "800": "#50499d",
          "900": "#423e7a",
          "950": "#2a274a",
        },
      },
      typography: {
        lg: {
          css: {
            fontSize: "1.25rem",
            p: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
