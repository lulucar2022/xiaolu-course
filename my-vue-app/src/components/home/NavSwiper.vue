<template>
    <div class="nav-swiper">
        <div class="nav-swiper-main">
            <div class="swiper-top">
                <ul @mouseleave="mouseOut">
                    <li v-for="(item, index) in firstList" :key="index" @mouseenter="mouseHover(item.id)"
                        :class="item.id == currentIndex ? 'active' : ''">
                        <span>{{ item.categoryName }}</span>
                        <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </li>

                    <div class="active-right" v-show="isShow">
                        <div class="active-right-top">
                            <h3 class="active-title">基础知识</h3>
                            <div>
                                <div>知识点：</div>
                                <ul>
                                    <li v-for="(item, index) in secondList" :key="index">{{ item.categoryName }}</li>

                                </ul>
                            </div>
                        </div>
                        <div class="active-right-bottom">
                            <ul>
                                <li v-for="(item, index) in courseList" :key="index">
                                    <img :src="item.courseCover">
                                    <div>
                                        <div class="active-course-title">{{ item.courseName }}</div>
                                        <div class="active-course-type">
                                            {{ courseTypeFn(item.courseLevel) }} · {{ item.clicks }}人报名
                                        </div>
                                        <div class="active-course-price">免费学习</div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </ul>
                <div>
                    <el-carousel :interval="5000" arrow="always" v-if="sliderList.length > 0">
                        <el-carousel-item v-for="(item, index) in sliderList" :key="index">
                            <img :src="item.imageUrl" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <ul class="swiper-bottom">
                <li>
                    <h3>
                        <img src="@/assets/imgs/书本11.png" />
                    </h3>
                    <div>
                        <h4>初级课程</h4>
                        <span>入门快</span>
                    </div>
                </li>
                <li>
                    <h3>
                        <img src="@/assets/imgs/书本11.png" />
                    </h3>
                    <div>
                        <h4>中级课程</h4>
                        <span>进阶与实战</span>
                    </div>
                </li>
                <li>
                    <h3>
                        <img src="@/assets/imgs/书本11.png" />
                    </h3>
                    <div>
                        <h4>高级课程</h4>
                        <span>轻松掌握核心技能</span>
                    </div>
                </li>
                <li>
                    <h3>
                        <img src="@/assets/imgs/书本11.png" />
                    </h3>
                    <div>
                        <h4>项目实战</h4>
                        <span>手把手实战</span>
                    </div>
                </li>
                <li>
                    <h3>
                        <img src="@/assets/imgs/书本11.png" />
                    </h3>
                    <div>
                        <h4>前端算法</h4>
                        <span>笑傲前端技能</span>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</template>

<script setup>
// api
import { getSliders } from '@/utils/api/slider'
import { ref } from 'vue';
import { getFirstCategories, getSecondCategories, courseSearch } from '@/utils/api/course'
// 课程类型
// courseType 是一个匿名函数，返回值是一个courseTypeFn处理函数
import courseType from '@/mixins/courseType';
let { courseTypeFn } = courseType()

// 轮播图数据
let sliderList = ref([]);
// 一级分类
let firstList = ref([]);
// 二级分类
let secondList = ref([]);
// 课程数据
let courseList = ref([])
// 控制 li 标签的显示
let currentIndex = ref(0)
// 右侧数据切换
let isShow = ref(false)
// 生命周期
onBeforeMount(() => {
    // 轮播图数据
    getSliders().then(res => {
        console.log(res);
        sliderList.value = res.data[0].data.list;
    })

    // 一级分类
    getFirstCategories({
        pageNum: 1,
        pageSize: 8
    }).then(res => {
        console.log(res);
        firstList.value = res.data[0].data.list
    })

})

// 鼠标移入
const mouseHover = (categoryId) => {
    isShow.value = true;
    currentIndex.value = categoryId
    // 获取二级分类
    getSecondCategories({
        categoryId: categoryId
    }).then(res => {
        console.log(res);
        secondList.value = res.data[0].data.list
    })
    // 获取课程
    courseSearch({
        pageNum: 1,
        pageSize: 4,
        entity: {
            firstCategory: categoryId
        }
    }).then(res => {
        courseList.value = res.data.list
        console.log(res.data);
    })
}
// 鼠标移出
const mouseOut = () => {
    isShow.value = false;
    currentIndex.value = 0
}
</script>

<style scoped>
.nav-swiper {
    background: url('@/assets/imgs/background3.png') no-repeat;
    width: 100%;
}

.nav-swiper-main {
    width: 1000px;
    margin: 0 auto;
    padding: 47px 0;
}

.swiper-top {
    display: flex;
    height: 373px;
    border-radius: 11px 11px 0px 0px;
}

.swiper-top>ul {
    position: relative;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    width: 160px;
    height: 100%;
    background: #2b283d;
    border-radius: 11px 0px 0px 0px;
}

.swiper-top>ul>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    height: 37px;
    padding: 0 20px;
    font-size: 16px;
    list-style: none;
    color: #f2f2f2;
    cursor: pointer;
}

.active {
    background: linear-gradient(to right, rgb(90, 183, 230), pink);

}

.active-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 99;
    top: 0%;
    left: 160px;
    width: 724px;
    height: 373px;
    background: #ffffff;
    border-radius: 0px 11px 0px 0px;
}

.active-right-top {
    padding: 23px 30px;
}

.active-right-top>div {
    display: flex;
    margin-top: 11px;
}

.active-right-top>div ul {
    display: flex;
    flex-wrap: wrap;
    margin-left: 7px;
}

.active-right-top>div ul li+li {
    margin-left: 20px;
}

.active-title {
    font-size: 20px;
    text-align: left;
    font-weight: bold;
}

.active-right-bottom {
    width: 724px;
    height: 217px;
    background: #f3f5f6;
}

.active-right-bottom>ul {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;
    padding: 0 30px;
}

.active-right-bottom>ul li {
    display: flex;
    width: 50%;

}

.active-right-bottom>ul li img {
    width: 140px;
    height: 81px;
}

.active-right-bottom>ul li>div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 4px;
}

.active-course-title {
    font-size: 14px;
    color: #333333;

}

.active-course-type {
    font-size: 12px;
    color: #808080;
}

.active-course-price {
    font-size: 12px;
    color: #3586ff;

}

.swiper-top>div {
    width: 840px;
    height: 373px;
}

.el-carousel {
    height: 373px;
}

.el-carousel img {
    width: 100%;
    height: 373px;
}

:deep(.el-carousel__container) {
    height: 373px;
}

.swiper-bottom {
    display: flex;
}

.swiper-bottom li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 213px;
    height: 133px;
    background: #ffffff;
    text-align: center;
}

.swiper-bottom li img {
    width: 64px;
    height: 64px;
}

.swiper-bottom li div {
    margin-left: 11px;
}

.swiper-bottom li div h4 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
}

.swiper-bottom li div span {
    font-size: 12px;
    color: #888;
}
</style>