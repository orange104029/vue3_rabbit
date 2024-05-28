
import {getCategoryAPI} from '@/apis/category'
import { onMounted, ref} from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';



export function useCategory(){

    const categoryData=ref([])
    const router=useRoute()
    //当页面挂载第一次调用函数时，无法获取to.params.id（最新的路由参数），因为路由还没有发生变化，id为默认值router.params.id
    const getCategory= async(id=router.params.id)=>{
        //在组件中可以通过 route.params.id 来访问 id 参数的值。
        //跳转到对应组件后调用getCategory函数向后台请求数据，并且携带对应的id
        // 如果你使用动态路由参数（例如 /:id），则可以通过 params 属性来访问这些参数的值，而不是通过 query 属性。
        //而 query 属性则用于访问通过查询字符串传递的参数，例如 /category?id=123，你可以通过 router.query.id 来获取查询参数中的 id 值。
        const res=await getCategoryAPI(id)
        categoryData.value=res.result
    }
    onMounted(()=>{
        getCategory()
    })
    //路由缓存：路由只有参数变化时，会复用组件实例从而减小了反复更新的资源消耗
    //onBeforeRouteUpdate在路由变化时精细化控制组件更新，而不是全部更新
    onBeforeRouteUpdate((to)=>{
        console.log(to.params.id,)
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}