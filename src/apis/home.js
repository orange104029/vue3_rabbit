import  httpInstance  from "@/utils/http";

export function getBannerAPI (params = {}) {//接收一个参数 params，默认为空对象 {}。
  //从参数 params 中获取 distributionSite，如果没有提供则默认为 '1'。
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      //传递了 distributionSite 参数作为查询参数。
      distributionSite
    }
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
      url:'/home/new'
    })
  }

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
    return  httpInstance({
        url:'/home/hot'
    })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}