import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E5BCB',
        ok: '#16A34A',
        warn: '#D97706',
        danger: '#DC2626',
        ink: '#1F2933',
        'ink-soft': '#5B6573',
        line: '#E3E8EF',
        surface: '#FFFFFF',
        canvas: '#F7F9FC',
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(.4,0,.2,1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.10)',
      },
      borderRadius: {
        xl2: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
