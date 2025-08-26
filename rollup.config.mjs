import typescript from '@rollup/plugin-typescript'
import { terser } from "rollup-plugin-terser"

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    plugins: [terser()],
  },
  plugins: [typescript({
    module: 'ESNext',
    rootDir: 'src',
    outDir: 'dist'
  })],
  external: ['typescript']
}
