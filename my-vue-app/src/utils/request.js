import axios from "axios";
// pinia
import { useUserStore } from "@/store/useUserStore";
// 创建 axios 对象
const service = axios.create();

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    let token = userStore.token;
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 判断code码
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
