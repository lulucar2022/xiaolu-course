// 导入
const mongoose = require("mongoose");
// 创建文档的结构对象
let SearchSchema = new mongoose.Schema({
  firstCategory: String,
  secondCategory: String,
  courseLevel: String,
  sortBy: String,
  isMember: String,
  isFree: String
});
// 创建模型对象  对文档操作的封装对象
let SearchModel = mongoose.model("search", SearchSchema);

// 暴露模型对象
module.exports = SearchModel;
