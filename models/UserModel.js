// 导入
const mongoose = require("mongoose");
// 创建文档的结构对象
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  
});
// 创建模型对象， 对文档操作进行封装
let UserModel = mongoose.model("users", UserSchema);

// 暴露模型
module.exports = UserModel;
