/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",   // Blue-600
          dark: "#1E40AF",      // Blue-800
          light: "#DBEAFE",     // Blue-100
        },
        secondary: {
          DEFAULT: "#4F46E5",   // Indigo-600
        },
        success: {
          DEFAULT: "#16A34A",   // Green-600
          light: "#DCFCE7",     // Green-100
        },
        danger: {
          DEFAULT: "#DC2626",   // Red-600
          light: "#FEE2E2",     // Red-100
        },
        neutral: {
          DEFAULT: "#374151",   // Gray-700
          light: "#F9FAFB",     // Gray-50
          dark: "#111827",      // Gray-900
        },
        dark: "#111827",
        "dark-light": "#1f2937",
      },
    },
  },
  plugins: [],
};
