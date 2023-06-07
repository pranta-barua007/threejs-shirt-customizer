import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./ShirtCustomizer": "./src/App.jsx",
        "./CustomButton": "./src/components/CustomButton.jsx"
      },
      shared: ["react", "react-dom", "@react-three/drei", "@react-three/fiber"],
    }),
  ],
  build: {
    //modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
