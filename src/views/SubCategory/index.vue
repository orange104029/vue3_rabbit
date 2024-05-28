<script setup lang="js">
import {getCategoryFilterAPI} from '@/apis/category'
import {getSubCategoryAPI} from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue';
import { onMounted,ref } from "vue";
import { useRoute } from 'vue-router';


const categoryData=ref([])
    const router=useRoute()
    //当页面挂载第一次调用函数时，无法获取to.params.id（最新的路由参数），因为路由还没有发生变化，id为默认值router.params.id
    const getCategoryData= async()=>{
        //在组件中可以通过 route.params.id 来访问 id 参数的值。
        //跳转到对应组件后调用getCategory函数向后台请求数据，并且携带对应的id
        // 如果你使用动态路由参数（例如 /:id），则可以通过 params 属性来访问这些参数的值，而不是通过 query 属性。
        //而 query 属性则用于访问通过查询字符串传递的参数，例如 /category?id=123，你可以通过 router.query.id 来获取查询参数中的 id 值。
        const res=await getCategoryFilterAPI(router.params.id)
        categoryData.value=res.result
    }
    

    const goodList=ref([])
    const disabled=ref(false)
    const reqData=ref({
      categoryId:router.params.id,
      page:1,
      pageSize:20,
      sortFiled:'publishTime'
    })
    const getGoodList = async ()=> {
      const res=await getSubCategoryAPI(reqData.value)
      console.log(res);
      goodList.value=res.result.items
    }

    const tabChange = ()=>{
      console.log(reqData.value.sortFiled);
      //当转换到新的tab时，重新将页数赋值为1
      reqData.value.page=1
      getGoodList()
    }

    const load = async ()=>{
      console.log('*******');
      //页数增加
      reqData.value.page++
      //获得下一页的数据
      const res =await getSubCategoryAPI(reqData.value)
      //"..."为扩展运算符，将一个数组或对象展开，将其中的元素或属性逐一赋值给新的变量。
      //将新的下一页数据res拼接到旧数组后面，实现列表无限加载
      goodList.value=[...goodList.value,...res.result.items]
      if (res.result.items.length==0) {
        console.log('no data');
        disabled.value=true
      }
    }


    
    
    onMounted(()=>{
        getCategoryData()
        getGoodList()
    })
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- el组件的双向绑定会将自己定义的属性与name绑定， @tabChange为el-tabs自带的方法，当tab改变时调用自己的回调方法-->
      <el-tabs v-model="reqData.sortFiled" @tabChange="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 当滚动到列表底部时自动执行v-infinite-scroll绑定的回调函数load -->
      <!-- :infinite-scroll-disabled为 禁止滚动加载 属性，值为真时禁止再加载数据 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
          <GoodsItem v-for="goods in goodList" :good="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>