<script setup>
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeHot from './components/HomeHot.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'

</script>

<template>
    
        <div class="bc">
            <HomeCategory />
            <HomeBanner />
        </div>
    
    <HomeNew/>
    <HomeHot/>
    <HomeProduct/>

</template>

<style scoped>
.bc{
    position: relative;
}

</style>