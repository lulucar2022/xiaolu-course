// 导入
const mongoose = require("mongoose");
// 创建文档的结构对象
let SliderSchema = new mongoose.Schema({
});
// 创建模型对象  对文档操作的封装对象
let SliderModel = mongoose.model("sliders", SliderSchema);

// 暴露模型对象
module.exports = SliderModel;
