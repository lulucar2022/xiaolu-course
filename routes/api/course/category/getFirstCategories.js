var express = require("express");

var router = express.Router();

const firstCategoriesModel = require("../../../../models/FirstCategoriesModel");
/* GET home page. */
router.post("/getFirstCategories", (req, res, next) => {
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
        msg: "一级分类",
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

async function findDocument({ pageNum, pageSize }) {
  let data = await firstCategoriesModel
    .find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  return data;
}

module.exports = router;
