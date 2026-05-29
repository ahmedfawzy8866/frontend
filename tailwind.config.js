/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          muted: 'var(--primary-muted)',
        },
        surface: 'var(--surface)',
        border: 'var(--border)',
        sbr: {
          ivory: '#F4F0E8',
          navy: '#071422',
          navyLight: '#0A1A3A',
          blue: '#1E88D9',
          gold: {
            light: '#F5E070',
            base: '#C8961A',
            dark: '#987734',
          }
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Playfair Display', 'serif'],
        sans: ['Jost', 'Inter', 'IBM Plex Sans Arabic', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      scale: { '101': '1.01', '102': '1.02' },
      perspective: { '1500': '1500px' }
    },
  },
  plugins: [],
};
