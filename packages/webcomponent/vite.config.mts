import preact from '@preact/preset-vite';
import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@devsolux/imza-embed-webcomponent',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  plugins: [
    preact(),
    dts({
      include: ['src'],
      afterBuild() {
        copyFileSync('dist/index.d.ts', 'dist/index.d.mts');
      },
    }),
  ],
});