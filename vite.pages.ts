import { defineConfig } from "vite";

export default defineConfig({
  base: "/blitz-player/",
  optimizeDeps: {
    exclude: ["@biliblitz/libass-wasm"],
  },
});
