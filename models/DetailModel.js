// 导入 mongoose
const mongoose = require("mongoose");
// 创建文档结构对象
let detailSchema = new mongoose.Schema({
  courseId: String,
});
// 创建文档模型
let detailModel = mongoose.model("details", detailSchema);
// 暴露对象
module.exports = detailModel;
