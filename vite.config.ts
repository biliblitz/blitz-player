import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@biliblitz/libass-wasm"],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName(format, entryName) {
        return entryName + (format === "es" ? ".mjs" : ".cjs");
      },
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [/@biliblitz\/libass-wasm/],
    },
  },
});
