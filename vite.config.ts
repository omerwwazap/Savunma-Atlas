import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const pagesPrefix = process.env.VITE_PAGES_PREFIX
    ? `/${process.env.VITE_PAGES_PREFIX}`
    : '';
  const base = `/Savunma-Atlas${pagesPrefix}/`;
  return {
  base: base, // Supports GitLab Pages branch previews via VITE_PAGES_PREFIX
  server: {
    host: "0.0.0.0",
    port: "8080",
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
