import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Allow JSX in .js files
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          // This tells Babel to treat .js files as JSX
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
});