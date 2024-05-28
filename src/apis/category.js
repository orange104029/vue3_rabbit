import httpInstance from "@/utils/http";

export function getCategoryAPI(id){
    //在发送 HTTP 请求时，使用 params 选项来将动态参数 id 作为查询参数传递给后端接口
    return httpInstance({
        url:'/category',
        params:{
            id
        }
    })
}

export function getCategoryFilterAPI(id){
    //在发送 HTTP 请求时，使用 params 选项来将动态参数 id 作为查询参数传递给后端接口
    return httpInstance({
        url:'/category/sub/filter',
        params:{
            id
        }
    })
}
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
   export const getSubCategoryAPI = (data) => {
    return httpInstance({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }