import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    format: 'iife',
    name: 'CompressArena'
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    terser()
  ]
};
