import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { viteMockServe } from "vite-plugin-mock";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
    }),
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "types"),
    },
  },
});
