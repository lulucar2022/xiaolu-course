// 导入
const mongoose = require("mongoose");
// 创建文档的结构对象
let mostNewSchema = new mongoose.Schema({});
// 创建模型对象  对文档操作的封装对象
let mostNewModel = mongoose.model("mostNew", mostNewSchema);

// 暴露模型对象
module.exports = mostNewModel;
