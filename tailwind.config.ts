import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // All colors resolve to CSS variables (see app/globals.css) so the dark
        // theme is a single flip of the variable set on <html class="dark">.
        primary: 'var(--color-primary)',
        'primary-weak': 'var(--color-primary-weak)',
        ok: 'var(--color-ok)',
        warn: 'var(--color-warn)',
        danger: 'var(--color-danger)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        line: 'var(--color-line)',
        surface: 'var(--color-surface)',
        canvas: 'var(--color-bg)',
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
