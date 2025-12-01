import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: {
          DEFAULT: "#06b6d4",
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        secondary: {
          DEFAULT: "#64748b",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        gray: {
          200: "#EAECEE", // disabled, gray button
          300: "#E3E3E3", // hover gray button
          400: "#CACACA", // placeholder
          500: "#B7B7B7", // font disabled button
          600: "#505050", // font white button
          900: "#2A2A2E", // main font
        },
        error: {
          DEFAULT: "#EA4335",
          50: "#FBDEDB",
          100: "#F9CDC9",
          200: "#F6AAA4",
          300: "#E35561", // notification
          400: "#EE655A",
          500: "#EA4335", //error message
          600: "#D12416",
          700: "#9E1B10",
          800: "#6C130B",
          900: "#390A06",
          950: "#1F0503",
        },
        // Brand Colors - Core palette for "Songkhla Night Sea" theme
        brand: {
          dark: "#020617",
          blue: "#172554",
          cyan: "#0891b2",
          teal: "#0e7490",
          deep: "#083344",
          forest: "#115e59",
          jungle: "#022c22",
        },
        // Accent Colors - Used for highlights, buttons, and interactive elements
        accent: {
          cyan: "#22d3ee",
          yellow: "#fef08a",
        },
        // Wave Colors - Specific shades for SVG wave elements
        wave: {
          blue: "#155e75",
          teal: "#115e59",
        },
      },
      // Custom Box Shadows - Glow effects and card elevations
      boxShadow: {
        "glow-sm": "0 0 10px rgba(255,255,255,0.2)",
        "glow-md": "0 0 15px rgba(255,255,255,0.8)",
        "glow-lg": "0 0 60px rgba(255,255,255,0.2)",
        "glow-xl": "0 0 100px rgba(255,255,255,0.3)",
        "glow-cyan-sm": "0 0 15px rgba(34,211,238,1)",
        "glow-cyan-md": "0 0 20px rgba(34,211,238,0.2)",
        "glow-cyan-lg": "0 0 30px rgba(34,211,238,0.3)",
        card: "0 0 15px rgba(8,145,178,0.2)",
        "card-hover": "0 0 25px rgba(34,211,238,0.3)",
        "text-sm": "0 2px 3px rgba(0,0,0,0.6)",
        "text-md": "0 2px 6px rgba(0,0,0,0.4)",
        "text-lg": "0 5px 5px rgba(0,0,0,0.5)",
      },
      // Background Gradients - Main theme backgrounds and overlays
      backgroundImage: {
        "gradient-main":
          "linear-gradient(to bottom, #020617, #172554, #0891b2)",
        "gradient-about": "linear-gradient(to bottom, #172554, #0e7490)",
        "gradient-gallery": "linear-gradient(to bottom, #115e59, #022c22)",
        "gradient-sponsors": "linear-gradient(to bottom, transparent, #172554)",
        "gradient-card":
          "linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.6))",
        "gradient-text": "linear-gradient(to bottom, #ffffff, #a5f3fc)",
        "gradient-overlay":
          "linear-gradient(to top, rgba(2, 44, 34, 0.8), transparent)",
      },
      fontFamily: {
        sans: ["Inter", "Prompt", ...defaultTheme.fontFamily.sans],
      },
      minWidth: {
        253: "253px",
        80: "80vw",
      },
      keyframes: {
        fade: {
          "0%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(150%)" },
          "100%": { filter: "brightness(100%)" },
        },
      },
      animation: {
        "fade-color": "fade 2s infinite",
      },
    },
  },
  plugins: [],
};
