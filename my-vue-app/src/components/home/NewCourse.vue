<template>
    <div class="new-course">
        <div class="new-course-main">
            <div class="new-course-top">
                <div class="title-hot">
                    <div class="hot">HOT</div>
                    <div class="hot-c"></div>
                </div>
                <div class="title-text">
                    新上好课
                </div>
            </div>
            <ul class="new-course-bottom">
                <li v-for="(item, index) in newList" :key="index" @click="goDetail(item.id)">
                    <img :src="item.courseCover" />
                    <div class="course-content">
                        <h3>{{ item.courseName }}</h3>
                        <div>{{ courseTypeFn(item.courseLevel) }} · {{ item.clicks }}人报名</div>
                        <div class="price">
                            <div class="price-vip">会员专享</div>
                            <div class="price-total">￥ {{ item.discountPrice }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
//api
import { mostNew } from '@/utils/api/course';

// 课程类型
// courseType 是一个匿名函数，返回值是一个courseTypeFn处理函数
import courseType from '@/mixins/courseType';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
let { courseTypeFn } = courseType()

// 新上好课的数据
let newList = ref([])


// 生命周期
onBeforeMount(() => {
    mostNew({
        pageNum: 1,
        pageSize: 8
    }).then(res => {
        console.log(res);

        newList.value = res.data
    })
})

// 进入课程详情页
const router = useRouter()
const goDetail = (id) => {
    router.push({
        path: '/course/detail',
        query: {
            id
        }
    })
}
</script>

<style scoped>
.new-course {
    margin-top: 25px;
    background: #fcfcfc;
}

.new-course-main {
    width: 1000px;
    margin: 0 auto;
}

.new-course-top {
    display: flex;
}

.title-hot {
    display: flex;
}

.title-hot .hot {
    width: 65px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
    border-radius: 5px 0px 5px 5px;
}

.title-hot .hot-c {
    width: 0;
    height: 0;
    border: 2px solid #fc685c;
    border-bottom-color: transparent;
    border-right-color: transparent;
}

.title-text {
    position: relative;
    margin-left: 10px;
    font-size: 23px;
    color: #333333;
    z-index: 999;
}

.title-text::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin-left: -5%;
    width: 120%;
    height: 9px;
    background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
    border-radius: 5px;
}

.new-course-bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.new-course-bottom li {
    margin-top: 38px;

    float: left;
    width: 240px;
    height: 275px;
    background: #ffffff;
    box-shadow: 1px 3px 3px rgba(27, 39, 94, 0.1);
    border-radius: 5px 5px 5px 5px;
}

.new-course-bottom li img {
    width: 240px;
    height: 153px;
}

.course-content {
    padding: 7px 16px;

}

.course-content h3 {
    font-size: 12px;
    color: #333333;
    text-align: left;
    padding-bottom: 7px;
    font-weight: bold;
}

.course-content>div {
    padding-bottom: 7px;
    padding-top: 7px;
    text-align: left;

    font-size: 12px;
    color: #808080;
}

.price {
    display: flex;
}

.price-vip {
    background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
    border-radius: 16px 0px 16px 0px;
    text-align: center;
    margin-right: 5px;
    color: #fff;
    width: 64px;
    height: 16px;
}

.price-total {
    font-size: 12px;
    color: #ff727f;
}
</style>