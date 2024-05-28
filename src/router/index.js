import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          //路径为空，为默认渲染页面
          path: '',
          component: Home
        }, {
          // 使用路由的动态参数来传递参数，通常需要在路由配置中使用 /:id 这样的形式来接收参数。
          //通过routerlink跳转时，根据路由表查到需要跳转的组件为Category，并且路由router会将id值存放于params中
          path: '/category/:id',
          component: Category
        }, {
          path: '/category/sub/:id',
          component: SubCategory
        }, {
          path: '/detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        }, {
          path: '/pay',
          component: Pay
        }, {
          path: '/paycallback',
          component: PayBack
        }
      ]
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/category',
      component: Category
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
