// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'
//引入懒加载指令
import { lazyPlugin } from './directives'
//引入全局组件插件
import { componentPlugin } from '@/components'
//引入Pinia持久化状态插件,插件可以自动将数据存到localStorage中，无需手动配置
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

