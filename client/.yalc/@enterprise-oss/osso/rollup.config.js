import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const input = 'src/index.ts';

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [
  alias({
    entries: [{ find: '~', replacement: 'src' }],
  }),
  typescript({
    typescript: require('typescript'),
  }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
    external,
  },
];
