import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import clear from 'rollup-plugin-clear'
const isDev = process.env.NODE_ENV !== 'production'
export default {
  input: './src/index.js',
  output: [
    {
      exports: 'auto',
      file: './dist/index.js',
      format: 'cjs',
      name: 'Madmen',
      sourcemap: isDev
    },
    {
      exports: 'auto',
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'Madmen',
      globals: {
        axios: 'axios',
        ethers: 'ethers'
      },
      sourcemap: isDev
    }
  ],
  external: ['ethers', 'axios'],
  plugins: [
    commonjs(),
    json(),
    image(),
    nodeResolve({
      // preferBuiltins: true,
      browser: true
    }),
    !isDev && terser(),
    postcss(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      externalHelpers: true
    }),
    clear({
      targets: ['./dist'],
      // optional, whether clear the directores when rollup recompile on --watch mode.
      watch: true, // default: false
    })
  ]
}
