import request from "../request";

// 登录验证
export function loginByJson(data) {
  return request({
    url: "/api/loginByJson",
    method: "post",
    data,
  });
}

// 获取个人信息
export function getInfo() {
  return request({
    url: "/api/users/getInfo",
  });
}

// 退出登录
export function logout() {
  return request({
    url: "/api/logout",
  });
}
