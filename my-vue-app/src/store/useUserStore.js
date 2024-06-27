import { defineStore } from "pinia";
export const useUserStore = defineStore(
  "user",
  () => {
    let token = ref("");
    // 设置token
    const setToken = (tokenId) => {
      token.value = tokenId;
    };
    // 清除token
    const clearToken = () => {
      token.value = "";
    };
    return { token, setToken, clearToken };
  },
  {
    // 开启数据缓存
    persist: {
      enabled: true, // 开启
      strategies: [
        {
          key: "myapp_user", // 设置存储的key
          storage: localStorage, //修改存储位置
          paths: ["token"],
        },
      ],
    },
  }
);
