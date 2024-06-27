// 导入
const mongoose = require("mongoose");
// 创建文档结构对象
let secondCategoriesSchema = mongoose.Schema({
  categoryId: Number,
});
// 创建模型对象，对文档封装的模型对象
let secondCategoriesModel = mongoose.model(
  "secondCategories",
  secondCategoriesSchema
);
// 暴露模型
module.exports = secondCategoriesModel;
