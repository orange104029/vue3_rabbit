import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPL, findNewCArtListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const updateNewList = async () => {
    const res = await findNewCArtListAPI()
    cartList.value = res.result
  }
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      await insertCartAPL({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => {
        return goods.skuId === item.skuId
      })
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }

  }

  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const index = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    cartList.value = []
  }

  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  // array.reduce(function(preValue,nowValue,nowIndex,arr){},initialValue))
  // -- preValue：
  //   --第一次调用时，是初始值，如果初始值没有指定，就是数组中第一个元素的值，同时nowValue变为数组中的第二个值
  //   --以后调用的都是上次该回调函数返回的值
  // -- nowValue：当前元素值
  // -- nowIndex：当前索引1.如果initialValue在调用时被提供，那么第一次的preValue就等于initialvalue,nowValue等于数组中的第一个值
  // -- arr：调用reduce的数组
  // 1.如果initialValue在调用时被提供，那么第一次的preValue就等于initialvalue,nowValue等于数组中的第一个值
  // 2.如果initialValue未被提供，那么preValue等于数组中的第一个值，nowValue自动等于数组中的第二个值
  const allCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
  const allPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0))

  const isAll = computed(() => cartList.value.every((item) => item.selected))
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count, 0))
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count * item.price, 0))
  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateNewList
  }
},
  {
    persist: true,//持久化为true，插件存储数据到localStorage
  }
)