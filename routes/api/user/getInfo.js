var express = require("express");
var router = express.Router();
// 导入中间件
const { verifyToken } = require("../../../middelWare/authorization");
// 导入 用户模型
const UserModel = require("../../../models/UserModel");

// 个人信息
router.get("/users/getInfo", verifyToken, (req, res) => {
  findUserDocument(req.auth)
    .then((data) => {
      console.log(new Date());
      res.json({
        // 响应代码
        code: "0000",
        // 响应的信息
        msg: "用户信息",
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

// 获取个人信息
async function findUserDocument({ username }) {
  let data = await UserModel.findOne(
    {
      username: username,
    },
    {
      _id: 0,
      username: 0,
      password: 0,
    }
  );
  return data;
}

module.exports = router;
