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
  },

  // 👇 Add this section
  server: {
    host: '0.0.0.0', // ensures Vite is accessible from all interfaces (not just localhost)
    port: 5173       // explicitly sets the port for consistency
  }
});