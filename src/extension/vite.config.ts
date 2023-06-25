import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'mwi-item-leaderboards',
        description: 'Chat link tracking!',
        'run-at': 'document-start',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'mwi-item-leaderboards',
        match: ['*://*www.milkywayidle.com/*'],
      },
    }),
  ],
});
