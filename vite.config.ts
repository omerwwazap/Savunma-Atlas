import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const base = `/Savunma-Atlas/`;
  return {
  base: base, // Static GitHub Pages base path
  server: {
    host: "0.0.0.0",
    port: "8080",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
    ],
  },
};
});
