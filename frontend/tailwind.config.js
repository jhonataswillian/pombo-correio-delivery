/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      backdropBlur: {
        md: "12px",
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 12px 40px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
};
