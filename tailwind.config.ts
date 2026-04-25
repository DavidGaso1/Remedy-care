import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Color Scheme
        sage: {
          50: "#F5F7F5",
          100: "#E8EDE8",
          200: "#D4DBD4",
          300: "#B8C3B8",
          400: "#9AA99A",
          500: "#8FBC8F", // Primary Sage Green
          600: "#7A9F7A",
          700: "#648364",
          800: "#526B52",
          900: "#425642",
        },
        muted: {
          blue: {
            50: "#F0F4F7",
            100: "#E0E9F0",
            200: "#C5D5E2",
            300: "#A4BACF",
            400: "#7B9EB0", // Primary Muted Blue
            500: "#5D8296",
            600: "#46687C",
            700: "#355263",
            800: "#2A414F",
            900: "#223540",
          },
        },
        soft: {
          purple: {
            50: "#F5F4F8",
            100: "#E9E7F0",
            200: "#D4D0E0",
            300: "#B5AFD0",
            400: "#9B8CBF", // Primary Soft Purple
            500: "#7F6FA8",
            600: "#665690",
            700: "#514278",
            800: "#413662",
            900: "#352D50",
          },
        },
        sand: {
          50: "#FAF9F6",
          100: "#F5F0E6", // Primary Sand/Beige
          200: "#E8E0D0",
          300: "#D4C4B0", // Stone
          400: "#C0A890",
          500: "#A89070",
          600: "#8C7658",
          700: "#705E48",
          800: "#584A38",
          900: "#443A2C",
        },
        stone: {
          50: "#F8F6F4",
          100: "#EDE8E2",
          200: "#D4C4B0", // Primary Stone
          300: "#B8A080",
          400: "#9C8060",
          500: "#806040",
          600: "#6A5030",
          700: "#544028",
          800: "#403020",
          900: "#302818",
        },
        peach: {
          50: "#FFF5F2",
          100: "#FFE8E0",
          200: "#FFD0C0",
          300: "#FFB0A0",
          400: "#FFB6A1", // Primary Peach/Coral
          500: "#FF9070",
          600: "#E87050",
          700: "#C85838",
          800: "#A84028",
          900: "#883018",
        },
        softYellow: {
          50: "#FFFCF5",
          100: "#FFF8E8",
          200: "#FFF0D0",
          300: "#FFE4B0",
          400: "#F5E6A3", // Primary Soft Yellow
          500: "#E8D080",
          600: "#C8B060",
          700: "#A89040",
          800: "#887030",
          900: "#685020",
        },
        // Legacy colors for compatibility
        primary: {
          DEFAULT: "#8FBC8F",
          dark: "#7A9F7A",
          light: "#B8C3B8",
          50: "#F5F7F5",
          100: "#E8EDE8",
          200: "#D4DBD4",
          300: "#B8C3B8",
          400: "#9AA99A",
          500: "#8FBC8F",
          600: "#7A9F7A",
          700: "#648364",
          800: "#526B52",
          900: "#425642",
        },
        accent: {
          DEFAULT: "#FFB6A1",
          dark: "#E87050",
          light: "#FFE8E0",
        },
        dark: "#030712",
        surface: "#F8FAFC",
        cream: "#FEFDF8",
        earth: {
          50: "#FDF8F0",
          100: "#F5EDD8",
          200: "#E8D5B0",
          300: "#D4B483",
        },
      },
      fontFamily: {
        sans: ["Inter", "DM Sans", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "Cormorant", "serif"],
        serif: ["Playfair Display", "Cormorant", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(0,0,0,0.08)",
        glass: "0 8px 32px 0 rgba(143, 188, 143, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(143, 188, 143, 0.12)",
        premium: "0 20px 40px -15px rgba(143, 188, 143, 0.2)",
        nature: "0 25px 60px -15px rgba(143, 188, 143, 0.25)",
        gold: "0 8px 24px -6px rgba(255, 182, 161, 0.35)",
        glow: "0 0 40px -10px rgba(143, 188, 143, 0.3)",
        card: "0 4px 24px -4px rgba(0,0,0,0.1)",
        "card-hover": "0 12px 40px -8px rgba(143, 188, 143, 0.2)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.2)",
        "glass-border": "inset 0 0 0 1px rgba(255,255,255,0.15)",
        liquid: "0 20px 60px -15px rgba(143, 188, 143, 0.3)",
        "liquid-hover": "0 30px 80px -20px rgba(143, 188, 143, 0.4)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(143, 188, 143, 0.3)" },
          "50%": { boxShadow: "0 0 0 16px rgba(143, 188, 143, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glass-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "liquid-morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%" },
          "75%": { borderRadius: "60% 40% 60% 30% / 70% 30% 50% 60%" },
        },
        "liquid-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(2deg)" },
          "50%": { transform: "translateY(-5px) rotate(-1deg)" },
          "75%": { transform: "translateY(-15px) rotate(1deg)" },
        },
        "wave": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-5px) translateY(-5px)" },
          "50%": { transform: "translateX(0) translateY(-10px)" },
          "75%": { transform: "translateX(5px) translateY(-5px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        breathe: "breathe 5s ease-in-out infinite",
        "leaf-sway": "leaf-sway 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glass-shimmer": "glass-shimmer 4s linear infinite",
        "liquid-morph": "liquid-morph 8s ease-in-out infinite",
        "liquid-float": "liquid-float 6s ease-in-out infinite",
        wave: "wave 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "nature-hero": "url('/images/nature-hero-bg.jpg')",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "leaf-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238FBC8F' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "liquid-gradient":
          "linear-gradient(135deg, rgba(143, 188, 143, 0.1) 0%, rgba(123, 158, 176, 0.1) 50%, rgba(155, 140, 191, 0.1) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
