import axios from 'axios'
import { Toast } from 'vant'

// 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 发送请求前，可在此携带 token
    // if (token) {
    //   config.headers['token'] = token
    // }
    return config
  },
  error => {
    // 请求错误，可在此进行统一错误处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    Toast.fail({
      message: error,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
