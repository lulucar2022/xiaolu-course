const jwt = require("jsonwebtoken");
const { secret: secretKey } = require("../config/config");
// 验证token
module.exports.verifyToken = function (req, res, next) {
  // 获取 token，从请求头中的authorization
  const token = req.headers.authorization;
  // 使用 jwt模块的 verify 验证token
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
      return res.json({ code: "404", msg: "token无效" });
    }
    // 保存用户的信息
    req.auth = decoded;

    next();
  });
};
