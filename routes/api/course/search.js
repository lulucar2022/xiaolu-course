var express = require("express");
const SearchModel = require("../../../models/searchModel");

var router = express.Router();

/* GET home page. */
router.post("/search", (req, res, next) => {
  // 读取集合信息
  console.log("请求参数:", req.body, req.query, req.params);

  findDocument(req.body)
    .then((data) => {
      console.log(new Date());

      // 成功获取信息，就渲染页面
      res.json({
        // 响应代码
        code: "0000",
        // 响应的信息
        msg: "课程查询",
        // 响应的数据
        data: data,
      });
      
    })
    .catch((error) => {
      res.json({
        code: "1001",
        msg: "读取失败",
        data: null,
      });
      console.log(error);
    });
});

async function findDocument({ pageNum, pageSize, entity = {} }) {
  pageNum <= 0 ? 1 : pageNum;
  pageSize <= 0 ? 4 : pageSize;
  let regexFirstCategory;
  let regexSecondCategory;
  let regexCourseLevel;
  let regexFree;
  let regexMember;
  let sortStatus1, sortStatus2;
  entity.sortBy === "" || !entity.hasOwnProperty("sortBy")
    ? (entity.sortBy = "_id-asc")
    : entity.sortBy;
  // 一级分类
  entity.firstCategory === "" || !entity.hasOwnProperty("firstCategory")
    ? (regexFirstCategory = /^[1-8]/)
    : (regexFirstCategory = new RegExp(entity.firstCategory));
  // 二级分类
  entity.secondCategory === "" || !entity.hasOwnProperty("secondCategory")
    ? (regexSecondCategory = /^[1-8]/)
    : (regexSecondCategory = new RegExp(entity.secondCategory));
  // 课程等级
  entity.courseLevel === "" || !entity.hasOwnProperty("courseLevel")
    ? (regexCourseLevel = /^[1-3]/)
    : (regexCourseLevel = new RegExp(entity.courseLevel));
  // 课程免费或会员
  // 免费
  !entity.hasOwnProperty("isFree")
    ? (regexFree = /$$/)
    : (regexFree = new RegExp(entity.isFree));
  // 会员
  !entity.hasOwnProperty("isMember")
    ? (regexMember = /$$/)
    : (regexMember = new RegExp(entity.isMember));

  // 截取排序参数
  const str = entity.sortBy.split("-");

  sortStatus1 = str[0];
  sortStatus2 = str[1];
  
  let ASC_DESC;
  if (sortStatus2 === "asc") {
    ASC_DESC = 1;
  } else {
    ASC_DESC = -1;
  }
 
  let obj = {};
  obj[sortStatus1] = ASC_DESC;
  
  let data = {
    list: [],
    totalDocuments: 0,
  };
  data.list = await SearchModel.find({
    $and: [
      { firstCategory: { $regex: regexFirstCategory } },
      { secondCategory: { $regex: regexSecondCategory } },
      { courseLevel: { $regex: regexCourseLevel } },

      { isFree: { $regex: regexFree } },
      { isMember: { $regex: regexMember } },
    ],
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort(obj);

  data.totalDocuments = await SearchModel.find({
    $and: [
      { firstCategory: { $regex: regexFirstCategory } },
      { secondCategory: { $regex: regexSecondCategory } },
      { courseLevel: { $regex: regexCourseLevel } },

      { isFree: { $regex: regexFree } },
      { isMember: { $regex: regexMember } },
    ],
  })
    .count();
  return data;
}

module.exports = router;
