import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";
import Inspect from "vite-plugin-inspect";
import viteCompression from "vite-plugin-compression";

import { Poxy } from "./src/js/_config";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [
    vue(),
    viteCompression({
      threshold: 51200, // 对大于 1mb 的文件进行压缩
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),

        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),

    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  //全局引入
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/global.scss";',
      },
    },
  },
  server: {
    port: 4475,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: Poxy,
  },
});
