/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // mapeia classes utilitárias -> CSS vars
        background: "var(--color-background)",
        card: "var(--color-card)",
        borderc: "var(--color-borderc)",
        primary: "var(--color-primary)",
        text: "var(--color-text)",

        // opcionais (se quiser usar depois)
        muted: "var(--color-muted)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
    },
  },
  plugins: [],
};
