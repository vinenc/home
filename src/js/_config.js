// vite.config.js 配置数据集合
export const Poxy = {
  "/baidu": {
    target: "https://suggestion.baidu.com/", //代理接口
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/baidu/, ""),
  },
  "/sogou": {
    target: "https://sor.html5.qq.com/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/sogou/, ""),
  },
  "/bing": {
    target: "https://api.bing.com/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/bing/, ""),
  },
  "/google": {
    target: "https://api.bing.com/",
    // target: "https://www.google.com/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/google/, ""),
  },
};
