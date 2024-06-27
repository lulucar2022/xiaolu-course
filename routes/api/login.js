var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
// 导入中间件
const { verifyToken } = require("../../middelWare/authorization");
// 导入 用户模型
const UserModel = require("../../models/UserModel");

// 登录用户
router.post("/loginByJson", (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;
  // 查询数据库
  findOneDocument(username, password)
    .then((data) => {
      if (!data) {
        return res.json({
          code: "2002",
          msg: "用户名或密码错误",
          data: null,
        });
      }
      // 创建当前用户 token
      let token = jwt.sign(
        {
          username: data.username,
          _id: data._id,
        },
        secret,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      // 响应 token
      return res.json({
        code: "0000",
        msg: "登录成功",
        data: token,
      });

      // 登录成功响应
      //   res.render("success", { msg: "登录成功", url: "/account" });
    })
    .catch((error) => {
      res.status(500).send("请稍后再试");
      res.json({
        code: "2001",
        msg: "数据库读取失败",
        data: null,
      });
      console.log(error);
    });
});

// 退出登录
router.get("/logout", verifyToken, (req, res) => {
  res.clearCookie("token");
  res.json({
    code: "0000",
    msg: "退出成功",
  });
});

// 登录验证
async function findOneDocument(username, password) {
  let data = await UserModel.findOne({
    username: username,
    password: password,
  });
  return data;
}

module.exports = router;
