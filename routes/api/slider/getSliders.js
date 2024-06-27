var express = require("express");
const SliderModel = require("../../../models/SliderModel");
var router = express.Router();

/* GET home page. */
router.get("/getSliders", (req, res, next) => {
  // 读取集合信息
  findDocument()
    .then((data) => {
      console.log(new Date());
      // 成功获取信息，就渲染页面
      //   res.render("list", { accounts: data, moment: moment });
      res.json({
        // 响应代码
        code: "0000",
        // 响应的信息
        msg: "轮播图",
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

async function findDocument() {
  let data = await SliderModel.find();
  return data;
}

module.exports = router;
