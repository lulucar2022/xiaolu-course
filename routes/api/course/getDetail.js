var express = require("express");
const detailModel = require("../../../models/DetailModel");

var router = express.Router();

/* GET home page. */
router.post("/getDetail", (req, res, next) => {
  // 读取集合信息
  console.log("请求参数:", req.body, req.query, req.params);

  findDocument(req.body)
    .then((data) => {
      console.log(new Date());
      
      res.json({
        // 响应代码
        code: "0000",
        // 响应的信息
        msg: "课程详情",
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
  let data = await detailModel.findOne({ courseId: courseId });

  return data;
}

module.exports = router;
