import request from "@/utils/request";

// 查询最新课程
export function mostNew(data) {
  return request({
    url: "/api/mostNew",
    method: "post",
    data,
  });
}
// 获取一级分类
export function getFirstCategories(data) {
  return request({
    url: "/api/getFirstCategories",
    method: "post",
    data,
  });
}

// 获取二级分类
export function getSecondCategories(data) {
  return request({
    url: "/api/getSecondCategories",
    method: "post",
    data,
  });
}
// 查询课程
export function courseSearch(data) {
  return request({
    url: "/api/search",
    method: "post",
    data,
  });
}

// 课程详情
export function getDetail(data) {
  return request({
    url: "/api/getDetail",
    method: "post",
    data,
  });
}

// 查询是否有权限
export function courseCheckAuth(params) {
  return request({
    url: "/api/course/checkAuth",
    params,
  });
}
