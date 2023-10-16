import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'chrome-extension',
  },
});

const viteConfig = require('./vite.config.js');

if (viteConfig.entry !== 'src/index.html') {
  console.error('The `entry` property in the `vite.config.js` file must be set to `src/index.html`.');
  process.exit(1);
}