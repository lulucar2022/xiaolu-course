// 导入 express
var express = require("express");
// 导入 路由
var router = express.Router();
// 导入模型
const secondCategoriesModel = require("../../../../models/SecondCategoriesModel");
/* GET home page. */
router.post("/getSecondCategories", (req, res, next) => {
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
        msg: "二级分类",
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

async function findDocument({ categoryId }) {
  
  let data = await secondCategoriesModel.find({
    categoryId: categoryId,
  });

  return data;
}

module.exports = router;
