<template>
    <div>
        <Header></Header>
        <div class="course-filter">
            <div class="filter-main">
                <div class="filter-item">
                    <div class="filter-title">课程方向：</div>
                    <ul>
                        <li class="filter-all">全部</li>
                        <li v-for="(item, index) in firstList" :key="index" @click="eventFirst(item.id)"
                            :class="currentFirstId === item.id ? 'filter-all' : ''">{{
                                item.categoryName }} </li>

                    </ul>

                </div>
                <div class="filter-item">
                    <div class="filter-title">课程分类：</div>
                    <ul>
                        <li class="filter-all">全部</li>
                        <li v-for="(item, index) in secondList" :key="index" @click="eventSecond(item.id)"
                            :class="currentSecondId === item.id ? 'filter-all' : ''">{{ item.categoryName }}
                        </li>

                    </ul>

                </div>
                <div class="filter-item">
                    <div class="filter-title">课程难度：</div>
                    <ul>
                        <li class="filter-all">全部</li>
                        <li v-for="(item, index) in levelList" :key="index" @click="eventLevel(item.id)"
                            :class="currentTypeId === item.id ? 'filter-all' : ''">{{ item.name }}
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="course-list">
            <div class="list-main">
                <div class="list-top">
                    <ul>
                        <li v-for="(item, index) in courseFilter" :key="index" :class="item.id != 4 ? 'list-price' : ''"
                            @click="eventFilter(item.id, courseFilter[3].status)">
                            <span :class="currentIndex === item.id ? 'active' : ''">{{ item.name }}</span>
                            <div class="caret" v-if="item.id === 4">
                                <el-icon :size="8" :color="item.status === 'discountPrice-desc' ? '#2c81ff' : ''">
                                    <CaretTop />
                                </el-icon>
                                <el-icon :size="8" :color="item.status === 'discountPrice-asc' ? '#2c81ff' : ''">
                                    <CaretBottom />
                                </el-icon>
                            </div>

                        </li>

                    </ul>
                    <div>
                        <el-radio-group v-model="radio" @change="tabCourse(radio)">
                            <el-radio :label="1">免费课程</el-radio>
                            <el-radio :label="2">会员免费</el-radio>

                        </el-radio-group>
                    </div>
                </div>
                <ul class="list-center">
                    <li v-for="(item, index) in courseList" :key="index" @click="goDetail(item._id)">
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
                <div class="list-bottom">
                    <el-pagination background layout="prev, pager, next" :total="courseTotal"
                        :current-page="courseParams.pageNum" @current-change="currentChange" />
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue'
// api
import { getFirstCategories, getSecondCategories, courseSearch } from "@/utils/api/course"
import { onBeforeMount, ref, reactive } from 'vue';
// 一级分类
let firstList = ref([])
// 二级分类
let secondList = ref([])
// 课程数据
let courseList = ref([])
// 课程难度
let levelList = ref([
    { name: '初阶', id: 1 },
    { name: '中阶', id: 2 },
    { name: '高阶', id: 3 }
])
// 课程条件筛选的数据
let courseFilter = ref([
    { id: 1, name: '综合' },
    { id: 2, name: '最新课程' },
    { id: 3, name: '最多购买' },
    { id: 4, name: '价格', status: '' },
])
// 查询课程的参数
let courseParams = reactive({
    pageNum: 1,
    pageSize: 8,
    entity: {
        firstCategory: '',
        secondCategory: '',
        courseLevel: '',
        sortBy: '',
        isMember: '',
        isFree: ''
    }
})
// 课程类型
// courseType 是一个匿名函数，返回值是一个courseTypeFn处理函数
import courseType from '@/mixins/courseType';
import { useRouter } from 'vue-router';
let { courseTypeFn } = courseType()


// 生命周期
onBeforeMount(() => {
    // 获取一级分类
    getFirstCategories({
        pageNum: 1,
        pageSize: 8
    }).then(res => {

        firstList.value = res.data[0].data.list
    })
    // 获取二级分类
    secondCategories({
        categoryId: 1
    })
    // 查询课程
    getCourseSearch({
        pageNum: 1,
        pageSize: 8
    })
})
// 获取二级分类
const secondCategories = (params) => {
    getSecondCategories(params).then(res => {
        secondList.value = res.data[0].data.list
    })
}
// 课程总数
let courseTotal = ref(0)
// 查询课程
const getCourseSearch = (params) => {
    courseSearch(params).then(res => {
        courseList.value = res.data.list
        courseTotal.value = res.data.totalDocuments
        console.log('课程查询成功', courseTotal.value);
    })
}

// 切换 class 样式
let currentFirstId = ref('')
let currentSecondId = ref('')
let currentTypeId = ref('')
// 点击一级分类
const eventFirst = (id) => {
    currentFirstId.value = id
    currentSecondId.value = ''
    currentTypeId.value = ''
    // 获取二级分类
    secondCategories({
        categoryId: id
    })
    // 查询课程
    getCourseSearch({
        pageNum: 1,
        pageSize: 8,
        entity: {
            firstCategory: id
        }
    })
}

// 点击二级分类
const eventSecond = (id) => {
    currentSecondId.value = id
    currentTypeId.value = null
    // 查询课程
    getCourseSearch({
        pageNum: 1,
        pageSize: 8,
        entity: {
            firstCategory: currentFirstId.value,
            secondCategory: id
        }
    })
}
// 点击课程难度
const eventLevel = (id) => {
    currentTypeId.value = id

    // 查询课程
    getCourseSearch({
        pageNum: 1,
        pageSize: 8,
        entity: {
            firstCategory: currentFirstId.value,
            courseLevel: id,
            secondCategory: currentSecondId.value
        }
    })
}

// 控制 class 切换
let currentIndex = ref(1)
// 排序参数
let sortByVal = ref('')
const eventFilter = (id, status) => {
    currentIndex.value = id;

    courseParams.entity.firstCategory = currentFirstId.value
    courseParams.entity.secondCategory = currentSecondId.value
    courseParams.entity.courseLevel = currentTypeId.value
    courseParams.entity.isMember = memberVal.value
    courseParams.entity.isFree = freeVal.value
    switch (currentIndex.value) {
        case 1:
            courseParams.entity.sortBy = ''
            courseFilter.value[3].status = ''
            break;
        case 2:
            sortByVal.value = '_id-desc'
            courseParams.entity.sortBy = '_id-desc'
            courseFilter.value[3].status = ''

            break;
        case 3:
            sortByVal.value = 'clicks-desc'
            courseParams.entity.sortBy = 'clicks-desc'
            courseFilter.value[3].status = ''

            break;
        case 4:
            if (status === 'discountPrice-desc' || status === '') {
                sortByVal.value = 'discountPrice-desc'

                courseParams.entity.sortBy = 'discountPrice-desc'
                courseFilter.value[3].status = 'discountPrice-asc'
            } else {
                sortByVal.value = 'discountPrice-asc'

                courseParams.entity.sortBy = 'discountPrice-asc'
                courseFilter.value[3].status = 'discountPrice-desc'
            }

            break;
        default:
            null
    }
    getCourseSearch(courseParams)
}
// 免费课程 和 会员免费课程
const radio = ref(1)
let freeVal = ref('')
let memberVal = ref('')
// 点击课程
let tabCourse = (val) => {
    courseParams.entity.firstCategory = currentFirstId.value
    courseParams.entity.secondCategory = currentSecondId.value
    courseParams.entity.courseLevel = currentTypeId.value
    courseParams.entity.sortBy = sortByVal.value

    if (val + '' === '1') {
        memberVal.value = ''
        freeVal.value = '1'
        courseParams.entity.isMember = '';
        courseParams.entity.isFree = '1';
    } else if (val + '' === '2') {
        memberVal.value = '1'
        freeVal.value = ''
        courseParams.entity.isFree = ''
        courseParams.entity.isMember = '1'
    }
    getCourseSearch(courseParams)
}


// 分页
const currentChange = (val) => {
    courseParams.pageNum = val
    getCourseSearch(courseParams)
}

let router = useRouter();
// 跳转到课程详情页
const goDetail = (_id) => {
    router.push({
        path: '/course/detail',
        query: {
            _id
        }
    })
}
</script>

<style scoped>
.course-filter {
    width: 100%;
    height: 197px;
    background: #f3f5f9
}

.filter-main {
    height: 197px;
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.filter-item {
    display: flex;
    align-items: center;
}

.filter-title {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin-left: 20px;
}

.filter-item ul {
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter-item ul li {
    margin-right: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #515759;
    padding: 0 10px;
    margin: 10px 5px;
    cursor: pointer;
}

.filter-item ul li.filter-all {
    text-align: center;
    line-height: 30px;
    color: #388fff;
    font-size: 14px;
    background: rgba(44, 128, 255, .1);
    border-radius: 5px;
}

.course-list {
    padding: 50px 0;
    background: #fff;
}

.list-main {
    width: 1000px;
    margin: 0 auto;
}

.list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.list-top ul {
    display: flex;
}

.list-top ul li {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #515759;
    margin: 0 16px;
    cursor: pointer;
}

.list-top ul li .list-price {
    position: relative;
}

.list-top ul li .list-price:after {
    content: '';
    position: absolute;
    right: -16px;
    top: 0;
    width: 1px;
    height: 100%;
    background: black;
}

.list-top ul li .active {
    color: #2c81ff;
}

.caret {
    display: flex;
    flex-direction: column;
}

.list-center {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.list-center li {
    margin-top: 38px;
    float: left;
    width: 240px;
    height: 275px;
    background: #ffffff;
    box-shadow: 1px 3px 3px rgba(27, 39, 94, 0.1);
    border-radius: 5px 5px 5px 5px;
}

.list-center li:last-child:nth-child(4n +2) {
    margin-right: calc((100% - 240px)/3*2);
}

.list-center li:last-child:nth-child(4n +3) {
    margin-right: calc((100% - 240px)/3*1);
}

.list-center li img {
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
    font-size: 12px;
}

.price-total {
    font-size: 12px;
    color: #ff727f;
}

.list-bottom {
    padding: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>