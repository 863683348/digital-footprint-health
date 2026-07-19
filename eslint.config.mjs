// ESLint 9 flat config. Next 16 dropped `next lint` and `eslint-config-next`
// v16 requires ESLint >= 9, so we consume its flat-config array directly.
import next from 'eslint-config-next';

const config = [
  ...next,
  {
    // Theme/lang providers initialize state from localStorage / matchMedia in
    // an effect on purpose: doing it during render would cause a hydration
    // mismatch (the server cannot read client storage). This is the documented
    // exception for client-only init, so we keep it as a warning, not an error.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**'],
  },
];

export default config;
