/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        dark: {
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
        purple: "#8b5cf6",
        grey: "#e2e8f0",
        "dark-grey": "#64748b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Gelasio", "serif"],
        inter: ["Inter", "sans-serif"],
        gelasio: ["Gelasio", "serif"],
      },
      boxShadow: {
        smooth:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "smooth-lg":
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "smooth-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "inner-top": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "inner-lg": "inset 0 2px 10px 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        "slide-down": "slideDown 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.5s ease-in-out",
        "slide-in-left": "slideInLeft 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.dark.800"),
            a: {
              color: theme("colors.primary.600"),
              "&:hover": {
                color: theme("colors.primary.700"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.dark.900"),
              fontFamily: theme("fontFamily.heading"),
            },
            blockquote: {
              borderLeftColor: theme("colors.primary.500"),
              color: theme("colors.dark.700"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.primary.600"),
            },
            code: {
              backgroundColor: theme("colors.dark.100"),
              borderRadius: theme("borderRadius.DEFAULT"),
              padding: theme("padding.1"),
              color: theme("colors.dark.800"),
              fontWeight: "500",
            },
            pre: {
              backgroundColor: theme("colors.dark.950"),
              color: theme("colors.dark.50"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.dark.300"),
            a: {
              color: theme("colors.primary.400"),
              "&:hover": {
                color: theme("colors.primary.300"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.dark.100"),
            },
            blockquote: {
              borderLeftColor: theme("colors.primary.500"),
              color: theme("colors.dark.300"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.primary.400"),
            },
            code: {
              backgroundColor: theme("colors.dark.800"),
              color: theme("colors.dark.200"),
            },
            pre: {
              backgroundColor: theme("colors.dark.900"),
              color: theme("colors.dark.200"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
