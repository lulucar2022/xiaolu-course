<template>
    <Header></Header>
    <div class="detail-title">
        <div class="detail-main">
            <div class="detail-map">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">课程</el-breadcrumb-item>
                    <el-breadcrumb-item>免费课</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detail.courseName }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="detail-name">{{ detail.courseName }}</div>
            <div class="detail-content">难度： 入门</div>
        </div>
    </div>
    <div class="detail-container">
        <div class="tab-name">
            <ul>
                <li :class="isActive === 1 ? 'active' : ''" @click="isActive = 1">课程章节</li>
                <li :class="isActive === 2 ? 'active' : ''" @click="isActive = 2">下载资料</li>
            </ul>
        </div>
        <div class="tab-chapters" v-if="isActive == 1">
            <div class="tab-txt">
                <div class="tab-desc">简介：{{ detail.courseDescription ? detail.courseDescription : '暂无课程介绍' }}</div>
                <div class="buy-btn-container">
                    <el-button type="danger" round size="large">立即购买</el-button>
                    <el-button type="info" round size="large">加入购物车</el-button>
                </div>
            </div>
            <div class="video">
                <div class="chapterName">{{ bizCourseChapters.chapterName }}</div>
                <div class="chapterDesc">{{ bizCourseChapters.description }}</div>
                <ul class="videos">
                    <li class="video-item" v-for="(item, index) in bizCourseChapters.children" :key="index">
                        <div class="video-itemIcon">
                            <img src="@/assets/imgs/video-play.png" />
                        </div>
                        <div class="item-name">
                            <span class="shipin">视频：</span>
                            <span class="chapterName">{{ '0' + (index + 1) }} {{ item.chapterName }}</span>
                        </div>
                        <a class="btn-learn" href="#">开始学习</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-main" v-if="isActive == 2">
            <ul>
                <li v-for="(item, index) in bizCourseAttachments" :key="index">
                    <div class="source">
                        <span class="downloadCourse">
                            <img src="@/assets/imgs/download.png" />
                            {{ '0' + (index + 1) }} {{ item.attachmentName }}
                        </span>
                        <button class="btn btn-primary downloadbtn" @click="downloadSource(item)">下载资料</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
// pinia
import { useUserStore } from "@/store/useUserStore";
const useStore = useUserStore();
let router = useRouter();
// 路由
let route = useRoute();
// api
import { getDetail, courseCheckAuth } from "@/utils/api/course";
// 章节 和 下载资料 切换数据
let isActive = ref(1);

// 课程详情数据
let detail = reactive({
    courseName: "",
    courseDescription: ""
});
// 课程章节
let bizCourseChapters = reactive({});
// 课程资料
let bizCourseAttachments = reactive([]);
// 跳转的课程的courseId
let courseId = route.query._id;
// 生命周期
onBeforeMount(() => {
    getDetail({
        courseId: courseId
    }).then(res => {
        console.log(res);
        let data = res.data;
    
            detail.courseName = data.courseName;
            detail.courseDescription = data.courseDescription;
            bizCourseChapters = data.bizCourseChapters;
            bizCourseAttachments = data.bizCourseAttachments;
        
    });
});

// 下载资料
const downloadSource = item => {
    // 判断是否是登录状态
    if (!useStore.token) {
        ElMessage({
            type: "info",
            message: "请先登录"
        });
        router.push("/login");
        return;
    }
    console.log(item);
    // 如果是登录状态
    // courseCheckAuth({}).then(res => {

    // })
};
</script>

<style  scoped>
.detail-title {
    display: flex;
    width: 100%;
    height: 183px;
    background: url("@/assets/imgs/detail-bg.png") no-repeat;
    background-size: 100% 100%;
}

.detail-main {
    width: 1000px;
    margin: 0 auto;
    padding: 25px 0;
}

:deep(.el-breadcrumb__separator) {
    color: #fff;
}

:deep(.el-breadcrumb__inner) {
    color: #fff;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover) {
    color: #fff;
    font-weight: 500;
}

.detail-name {
    margin-top: 27px;
    font-size: 27px;
    color: #ffffff;
}

.detail-content {
    margin-top: 22px;
    font-size: 14px;
    color: #ffffff;
}

.tab-name {
    width: 100%;
    height: 103px;
    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.tab-name ul {
    width: 1000px;
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.tab-name ul li {
    position: relative;
    padding-bottom: 8px;
    padding: 8px 16px;
    margin-right: 70px;
    line-height: 80px;
    font-size: 20px;
    cursor: pointer;
}

.tab-name ul li.active {
    color: #5e98ff;
    font-weight: bold;
}

.tab-name ul li.active:after {
    position: absolute;
    left: 20%;
    bottom: 20px;
    content: "";
    width: 60%;
    height: 6px;
    background: #388fff;
    border-radius: 3px;
}

.tab-chapters {
    width: 1000px;
    margin: 0 auto;
    background: #f8fafc;
}

.tab-txt {
    display: block;
    flex-direction: column;
    margin: 29px 0;
    width: 100%;
    height: 147px;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09);
    border-radius: 8px;
    overflow: hidden;
}

.tab-desc {
    padding: 20px;
    color: #474747;
    line-height: 35px;
}

.buy-btn-container {
    display: flex;
    justify-content: center;
    float: right;
    padding: 0 20px 20px;
    margin-top: 10px;
    width: 300px;
}

.video {
    margin: 20px 0;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}

.video .chapterName {
    font-weight: bold;
    font-size: 20px;
    color: #333333;
}

.video .chapterDesc {
    margin: 10px 0;
    font-size: 13px;
    color: #5c5c5c;
}

.video-item {
    display: block;
    height: 40px;
    line-height: 30px;
    padding: 5px 0;
    margin: 0 0 10px 0;
    border-radius: 8px;
}

.video-item .item-name {
    width: 800px;
    float: left;
    padding-left: 10px;
}

.video-item .item-name .shipin {
    color: #333333;
    font-weight: bold;
    font-size: 14px;
}

.video-item .item-name .chapterName {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
}

.video-item .video-itemIcon {
    float: left;
    padding-left: 10px;
    height: 30px;
}

.video-item .video-itemIcon img {
    margin-top: 60%;
    width: 14px;
    height: 14px;
    line-height: 30px;
}

.video-item .btn-learn {
    margin: 0 5px 0 0;
    float: right;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 0px;
    outline: none;
    color: #fff;
    background: #388fff;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
}

.tab-main {
    width: 1000px;
    margin: 0 auto;
}

.tab-main ul li {
    margin: 10px auto !important;
    padding: 5px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 9%);
}

.tab-main .source {
    margin: 2px 0;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
}

.tab-main .downloadCourse img {
    width: 13px;
    height: 14px;
}

.tab-main .downloadCourse {
    font-size: 14px;
}

.tab-main .downloadbtn {
    width: 80px;
    border: none;
    border-radius: 8px;
    margin: 5px 0;
    font-size: 14px;
    text-align: center;
}

.tab-main .btn {
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
}

.tab-main .btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
</style>