/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titanium: {
          900: '#08090d',
          800: '#0e1118',
          700: '#151a26',
          600: '#232b3e',
        },
        lime: {
          accent: '#d2f829',
        },
        cyan: {
          accent: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        ampdark: {
          "primary": "#6366f1",
          "primary-content": "#ffffff",
          "secondary": "#38bdf8",
          "secondary-content": "#08090d",
          "accent": "#d2f829",
          "accent-content": "#08090d",
          "neutral": "#151a26",
          "neutral-content": "#f8fafc",
          "base-100": "#08090d",
          "base-200": "#0e1118",
          "base-300": "#151a26",
          "base-content": "#f8fafc",
          "info": "#38bdf8",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "dark",
      "night",
    ],
    darkTheme: "ampdark",
    base: false,
    styled: true,
    utils: true,
  },
}
