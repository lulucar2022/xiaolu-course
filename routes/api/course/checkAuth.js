var express = require("express");
const checkAuthModel = require("../../../models/checkAuthModel");

const router = express.Router();

router.get("/checkAuth", (req, res, next) => {
  // 读取集合信息
  console.log("请求参数:", req.body, req.query, req.params);

  findDocument(req.body)
    .then((data) => {
      console.log(new Date());
      // 成功获取信息，就渲染页面
      //   res.render("list", { accounts: data, moment: moment });
      res.json({
        // 响应代码
        code: "0000",
        // 响应的信息
        msg: "课程权限",
        // 响应的数据
        data: data,
      });
    })
    .catch((error) => {
      res.json({
        code: "1001",
        msg: "读取失败",
        data: null,
      });
      console.log(error);
    });
});

async function findDocument({ courseId }) {
  let data = await checkAuthModel.find({ courseId: courseId });

  return data;
}

module.exports = router;
