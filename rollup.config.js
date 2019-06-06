//import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
//import url from 'rollup-plugin-url';
import {terser} from 'rollup-plugin-terser';
import strip from 'rollup-plugin-strip';

import sizes from './rollup-plugins/sizes-plugin';

// library name
import pkg from './package.json';
const name = 'FuzzyToggle';

const input = './src/FuzzyToggle/createToggle.js';

let includePathOptions = {
  include: {},
  paths: [
    './', 'src', 'dist'
  ],
  external: [],
  extensions: ['.js', '.html']
};

let isEs5 = process.env.ES5 === 'true';
let isEs6 = process.env.ES6 === 'true';
isEs5 && console.log('*** ES5 ***');
isEs6 && console.log('*** ES2015 ***');

export default[
  {
    external : [],

    input,

    output : [
      (isEs6 || isEs5) && {
        file: isEs5
          ? pkg.main
          : pkg['main-es2015'],
        format: 'umd',
        name,
        sourcemap: true,
        globals: {}
      },
      0 && {
        file: pkg.cjs,
        format: 'cjs',
        sourcemap: true
      },
      0 && {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      },
      0 && {
        file: pkg.iife,
        format: 'iife',
        name,
        sourcemap: true,
        globals: {}
      }
    ].filter(Boolean),
    plugins : [
      //includePaths(includePathOptions),
      external({includeDependencies: false}),
      strip({
        debugger: true,
        functions: [
          'config.trace', 'console.log'
        ],
        sourceMap: true
      }),
      //url({}),
      resolve(),
      babel({
        babelrc: true,
        presets: [isEs6 && [
            '@babel/preset-env', {
              modules: false,
              targets: {
                node: '6.5'/* ES2016 compilation target */
              }
            }
          ]
        ].filter(Boolean),
        exclude: 'node_modules/**'
      }),
      commonjs(),
      // https://github.com/terser-js/terser#mangle-options
      1 && terser({
        compress: {
          drop_console: true
        },
        mangle: {
          keep_fnames: true
        }
        //mangle: false,
      }),

      sizes({
        getSize: (size, gzip, filename) => {
          console.log('minified', size, filename);
          console.log('gzip minified', gzip);
        }
      })
    ].filter(Boolean)
  }
];
