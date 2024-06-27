import request from "@/utils/request";

export function getSliders() {
  return request({
    url: "/api/getSliders",
  });
}
