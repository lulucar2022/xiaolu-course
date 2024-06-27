var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { expressjwt: jwt } = require("express-jwt");
const { secret: secretKey } = require("./config/config");
// 路由规则
var indexRouter = require("./routes/web/index");
// 导入  接口路由文件
const getSlidersRouter = require("./routes/api/slider/getSliders");
const mostNewRouter = require("./routes/api/course/mostNew");
const searchRouter = require("./routes/api/course/search");
const getFirstCategoriesRouter = require("./routes/api/course/category/getFirstCategories");
const getSecondCategoriesRouter = require("./routes/api/course/category/getSecondCategories");
const getDetailRouter = require("./routes/api/course/getDetail");
const loginRouter = require("./routes/api/login");
const getInfoRouter = require("./routes/api/user/getInfo");
const checkAuthRouter = require("./routes/api/course/checkAuth");
// const auth = require("./routes/middelWare/authorization");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", loginRouter);
app.use("/api", getSlidersRouter);
app.use("/api", mostNewRouter);
app.use("/api", searchRouter);
app.use("/api", getFirstCategoriesRouter);
app.use("/api", getSecondCategoriesRouter);
app.use("/api", getDetailRouter);
app.use("/api", getInfoRouter);
app.use("/api", checkAuthRouter);


// 跨域请求处理
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "*");
});

// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  res.send({
    status: 500,
    message: "未知的错误",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
