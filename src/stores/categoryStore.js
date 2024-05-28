import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    const categoryList=ref([])
    //定义了一个名为 getCategory 的异步函数，该函数调用了 getCategoryAPI 函数发送请求，并在响应返回后打印响应数据到控制台。
    const getCategory= async ()=>{
        const res= await getCategoryAPI()
        categoryList.value=res.result
    }

    return {
        categoryList,
        getCategory
    }
})
