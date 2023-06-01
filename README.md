# @biliblitz/blitz-player

A modern web video player.

[Example][Example]

## Install

1.  Add `@biliblitz/blitz-player` to your dependencies.

    ```bash
    yarn add @biliblitz/blitz-player
    ```

2.  Add `@biliblitz/libass-wasm` to your `vite.config.ts`.

    ```ts
    export default defineConfig({
      optimizeDeps: {
        exclude: ["@biliblitz/libass-wasm"],
      },
    });
    ```

[Example]: https://www.youtube.com/watch?v=xvFZjo5PgG0
