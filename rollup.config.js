import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
import sizes from './rollup-plugins/sizes-plugin';

const input = 'src/fuzzyToggle';
const name = 'fuzzyToggle';

let includePathOptions = {
  include: {},
  paths: ['./', 'src', 'dist'],
  external: [],
  extensions: ['.js', '.html'],
};

export default {
  external: [],

  input,

  output: [
    1 && {
      file: pkg.main,
      format: 'umd',
      name,
      sourcemap: true,
      globals: {
      },
    },
    0 && {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
    },
    1 && {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    0 && {
      file: pkg.iife,
      format: 'iife',
      name,
      sourcemap: true,
      globals: {
      },
    },
  ].filter(Boolean),
  plugins: [
    includePaths(includePathOptions),
    external({
      includeDependencies: false,
    }),
    url({}),
    resolve(),
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser({
      compress: { drop_console: true },
    }),
    sizes({
      getSize: (size, gzip, filename) => {
        console.log('minified', size, filename);
        console.log('gzip minified', gzip);
      },
    }),
  ].filter(Boolean),
};
