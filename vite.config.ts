import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
  },
});
