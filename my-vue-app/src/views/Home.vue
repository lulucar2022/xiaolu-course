<template>
    <div class="home-main">
        <Header></Header>
        <NavSwiper></NavSwiper>
        <NewCourse></NewCourse>
        <Footer></Footer>
    </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { reactive, toRefs, ref, watch, defineAsyncComponent } from 'vue'
import Header from '@/components/common/Header.vue'
import NavSwiper from '@/components/home/NavSwiper.vue';
import Footer from '@/components/common/Footer.vue';
import NewCourse from '@/components/home/NewCourse.vue'
</script>
