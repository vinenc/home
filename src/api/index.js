import axios from "axios";

// 创建 axios 实例
export const baidu = axios.create({
  baseURL: "/baidu", // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
});
export const sogou = axios.create({
  baseURL: "/sogou",
  timeout: 60000,
  withCredentials: true,
});
export const bing = axios.create({
  baseURL: "/bing",
  timeout: 60000,
  withCredentials: true,
});
export const google = axios.create({
  baseURL: "/google",
  timeout: 60000,
  withCredentials: true,
});
