<template>
    <header>
        <div class="header-main">
            <div class="header-left">
                <h1 class="logo">
                    <img src="@/assets/imgs/logo.png" />
                </h1>
                <ul>
                    <li v-for="(item, index) in topBar" :key="index" :class="item.id === currentId ? 'active' : ''"
                        @click="tabBar(item)">
                        {{ item.title }}
                    </li>
                </ul>
            </div>
            <div class="header-right">
                <div class="search">
                    <input type="text" name placeholder="搜索想要的课程" />
                    <el-icon :size="20" color="#999">
                        <Search />
                    </el-icon>
                </div>
                <div class="shop">
                    <el-icon :size="20">
                        <ShoppingCart />
                    </el-icon>
                </div>
                <div class="login" v-if="!isLogin">
                    <router-link to="/login">登录/注册</router-link>
                </div>
                <div class="login-success" v-else>
                    <div style="cursor: pointer">我的课程</div>
                    <div @mouseenter="isShow = true">
                        <img class="avatar" :src="userInfo.avatar" alt="头像" v-if="userInfo.avatar" />
                        <img v-else class="avatar" src="../../assets/imgs/avatar.png" />
                    </div>
                </div>
                <!-- 展示个人信息 -->
                <div class="info-container-tooltip" v-show="isShow" @mouseleave="isShow = false">
                    <!-- 显示头像和昵称 -->
                    <div class="info-top">
                        <img class="avatar" :src="userInfo.avatar" alt="头像" v-if="userInfo.avatar" />
                        <img v-else class="avatar" src="../../assets/imgs/avatar.png" />
                        <p>{{ userInfo.nickname }}</p>
                    </div>
                    <!-- vip用户的信息 -->
                    <div class="info-vip">
                        <img src="../../assets/imgs/vip.png" />
                        <div class="vipName">{{ vipInfo.vipName }}</div>
                        <div class="endTime" v-if="!vipInfo.isExpired"> {{ endTimeVip }}天</div>
                        <div class="endTime" v-else>已过期{{ Math.abs(endTimeVip) }}天</div>

                    </div>
                    <!-- 用户信息的跳转链接 -->
                    <div class="info-bottom">
                        <div @mouseenter="isSelect = 1" :class="isSelect === 1 ? 'info-isSelect' : ''"
                            @mouseleave="isSelect = 0">
                            <router-link to="/">
                                <div class="info-item">
                                    <el-icon>
                                        <Notebook />
                                    </el-icon>
                                    <p>我的课程</p>
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </div>
                            </router-link>
                        </div>
                        <div @mouseenter="isSelect = 2" :class="isSelect === 2 ? 'info-isSelect' : ''"
                            @mouseleave="isSelect = 0">
                            <router-link to="/">
                                <div class="info-item">
                                    <el-icon>
                                        <Message />
                                    </el-icon>
                                    <p>我的消息</p>
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </div>
                            </router-link>
                        </div>
                        <div @mouseenter="isSelect = 3" :class="isSelect === 3 ? 'info-isSelect' : ''"
                            @mouseleave="isSelect = 0">
                            <router-link to="/">
                                <div class="info-item">
                                    <el-icon>
                                        <Goods />
                                    </el-icon>
                                    <p>订单中心</p>
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </div>
                            </router-link>
                        </div>
                        <div @mouseenter="isSelect = 4" :class="isSelect === 4 ? 'info-isSelect' : ''"
                            @mouseleave="isSelect = 0">
                            <router-link to="/">
                                <div class="info-item">
                                    <el-icon>
                                        <Setting />
                                    </el-icon>
                                    <p>设置中心</p>
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </div>
                            </router-link>
                        </div>

                    </div>
                    <el-divider />
                    <!-- 退出登录按钮 -->
                    <div class="info-logout">
                        <el-button type="danger" round @click="outLogin">退出登录</el-button>

                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { onBeforeMount, ref, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/useUserStore";
const useStore = useUserStore();
// api
import { getInfo, logout } from "@/utils/api/login";

// 登录状态
let isLogin = ref(false);
// 用户信息
let userInfo = ref({});
// 鼠标移入头像，用户信息展示
let isShow = ref(false)
// 用户vip数据
let vipInfo = ref({})
// vip到期时间
let endTimeVip = ref(0)

onBeforeMount(() => {
    // 获取个人信息
    getInfo().then((res) => {
        // 登录状态
        if (res.code === "0000") {

            // 用户信息
            userInfo.value = res.data;
            // 用户vip信息
            vipInfo.value = res.data.vipInfo
            // 计算会员到期时间
            let now = new Date().getTime()
            let endTime = vipInfo.value.endTime - now
            endTimeVip.value = Math.floor(endTime / (1000 * 3600 * 24));
            // 是否登录
            isLogin.value = true;
        }
    });
});
// 退出登录
const outLogin = () => {
    ElMessageBox.confirm(
        '确定要退出登录?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            logout()
                .then(res => {
                    if (res.code === '0000') {
                        ElMessage({
                            type: 'success',
                            message: '退出成功',
                        })
                        // 清除token
                        useStore.clearToken()
                        // 刷新页面
                        router.go(0)
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        })
        .catch(() => {
            ElMessage({
                message: '已取消',
            })
        })
}
// 路由
let router = useRouter();
//
let topBar = ref([
    { id: 1, title: "首 页", name: "Home" },
    { id: 2, title: "课 程", name: "Course" },
    { id: 3, title: "会 员", name: "Vip" },
]);
// 默认选择 topBar
let currentId = ref(1);
// 切换 topBar
let tabBar = (item) => {
    currentId.value = item.id;
    router.push({
        name: item.name,
    });
};
// 监听路由变化
watch(
    () => router.currentRoute.value.name,
    (toPath) => {
        console.log(toPath);
        if (toPath === "Home") {
            currentId.value = 1;
        } else if (toPath === "Course") {
            currentId.value = 2;
        } else if (toPath === "Vip") {
            currentId.value = 3;
        }
    },
    {
        immediate: true,
    }
);
// 个人信息悬浮框
let userInfoList = reactive([
    { name: "我的课程" },
    { name: "我的消息" },
    { name: "订单中心" },
    { name: "设置中心" },
])
// 悬浮框元素选中效果
let isSelect = ref(0);

</script>
<style scoped>
header {
    width: 100%;
    height: 80px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
    position: relative;
    z-index: 999;
}

.header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 80px;
    margin: 0 auto;
}

.logo {
    width: 127px;
    height: 50px;
    margin-right: 51px;
}

.logo img {
    width: 100%;
    height: 100%;
}

.header-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left ul {
    display: flex;
    list-style: none;
    height: 50px;
}

.header-left ul li {
    line-height: 50px;
    cursor: pointer;
    color: #808080;
}

.header-left ul li+li {
    margin-left: 60px;
    font-size: 16px;
    line-height: 50px;
}

.header-left ul li.active {
    font-weight: bold;
    position: relative;
    color: #3585ff;
}

.header-left ul li.active:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 140%;
    margin-left: -20%;
    height: 3px;
    background: #3585ff;
}

.header-right {
    display: flex;
    cursor: pointer;
    align-items: center;
}

.header-right .search {
    align-items: center;
    display: flex;
    padding: 0 10px;
    width: 250px;
    height: 43px;
    background: #f0f2f4;
    border-radius: 5px;
}

.header-right .search input {
    width: 270px;
    height: 43px;
    border: none;
    background: transparent;
    outline: none;
}

.header-right .shop {
    display: flex;
    align-items: center;
    margin-left: 42px;
    margin-right: 42px;
}

.header-right .login a {
    margin-left: 39px;
    font-size: 16px;
    cursor: pointer;
    color: #808080;
}

.header-right .login-success {
    position: relative;
    height: 53px;
    color: #808080;
    text-align: center;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #707070;
}

.header-right .avatar {
    height: 53px;
    width: 53px;
    cursor: pointer;
    border-radius: 50%;
}

.header-right .info-container-tooltip {
    width: 280px;
    top: 100%;
    left: 50%;
    transform: translateX(100%);
    position: absolute;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    margin-top: 3px;
}

.info-container-tooltip .info-top {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    align-items: center;

}

.info-top p {
    font-size: 22px;

}

.info-container-tooltip .info-vip {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
}

.info-vip .vipName {
    margin-left: -50px;
    color: #FF201D;
    font-size: 12px;
    font-weight: 500;
}

.info-vip .endTime {
    font-size: 12px;
    color: #FF201D;
    font-style: italic;
}

.info-container-tooltip .info-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.info-container-tooltip .info-bottom .info-item {
    margin-bottom: 1px;
    color: #61666d;
    padding: 0 14px;
    height: 37px;
    width: 235px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;

}

.info-bottom .info-isSelect {
    background-color: #E3E5E7;
    border-radius: 5px 5px 5px 5px;
}

.info-item p {
    margin-left: -50px;
    margin-top: -2px;
}

.info-container-tooltip .info-logout {
    float: right;
    padding: 0 14px;
    color: #61666d;

}
</style>
