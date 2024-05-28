import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore';
import router from '@/router'

// 创建了一个 axios 实例，并且配置了基本的请求信息，包括 baseURL 和 timeout。然后，它定义了请求拦截器和响应拦截器，并导出了这个 axios 实例。

// 请求拦截器（request interceptor）用于在发送请求之前对请求进行一些预处理操作。在这个文件中，请求拦截器返回了配置对象本身，表示不做任何处理，直接发送请求。

// 响应拦截器（response interceptor）用于在收到响应后对响应进行处理。在这个文件中，响应拦截器返回了响应数据的 data 字段，表示只返回响应数据部分，而不包括其他响应信息。
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
const request = httpInstance.interceptors.request.use(config => {
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应式拦截器
const response = httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  if (e.response.status === 401) {
    useStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance