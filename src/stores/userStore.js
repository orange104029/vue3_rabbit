import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore()
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并本地购物车到服务器
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    //将合并完成后的服务器购物车覆盖本地购物车实现更新
    cartStore.updateNewList()
  }

  const clearUserInfo = () => {
    console.log('clearUserInfo');
    //清除用户信息
    userInfo.value = {}
    //清空购物车
    cartStore.clearCart()
  }

  return { userInfo, getUserInfo, clearUserInfo }
},
  {
    persist: true,//持久化为true，插件存储数据到localStorage
  }
)