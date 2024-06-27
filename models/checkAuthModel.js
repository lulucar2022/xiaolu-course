// 导入 mongoose
const mongoose = require("mongoose");
// 创建文档结构对象
let checkAuthSchema = new mongoose.Schema({
  
});
// 创建文档模型
let checkAuthModel = mongoose.model("checkAuth", checkAuthSchema);
// 暴露对象
module.exports = checkAuthModel;
