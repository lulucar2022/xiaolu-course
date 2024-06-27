module.exports = function (success, error) {
  // 判断 error
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败");
    };
  }
  // install mongoose
  // import mongoose
  const mongoose = require("mongoose");

  // 导入配置文件
  const { DBHOST, DBPORT, DBNAME } = require("../config/config");

  mongoose.set("strictQuery", true);

  // connect mongodb                          db_name
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 设置回调
  // once 一次
  mongoose.connection.once(
    "open",
    () => {
      success();
      console.log("mongodb 连接成功");
    }
    // console.log('connect success');
  );
  mongoose.connection.on("error", () => {
    error();
    console.log('连接失败');
  });
  mongoose.connection.on("close", () => {
    console.log("mongodb connect close");
  });
};
