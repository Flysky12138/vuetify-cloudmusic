import pinia from '@/plugins/store'
import { apiStore } from '@/plugins/store/api'
import { userStore } from '@/plugins/store/user'
import axios from 'axios'

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = apiStore(pinia).api1 || 'https://netease-cloud-music-api-flysky.vercel.app/'
    break
  default:
    axios.defaults.baseURL = 'http://localhost:3000/'
}

axios.defaults.timeout = 10000 // 超时时间
axios.defaults.retry = 5 // 超时重复请求次数
axios.defaults.retryDelay = 1000 // 超时重复请求的间隙
axios.defaults.withCredentials = true // 跨域是否允许携带Cookie凭证

// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      realIP: '211.149.189.135',
      timestamp: new Date().getTime(), // 添加时间戳
      cookie: userStore(pinia).cookie // 手动携带Cookie；Chrome v91开始浏览器默认SameSite=Lax无法修改，导致跨域不携带Cookie
    }
    return config
  },
  error => Promise.reject(error)
)

// 自定义响应成功的HTTP状态码
axios.defaults.validateStatus = status => /^(2|3|5)\d{2}$/.test(status)

// 响应拦截器
axios.interceptors.response.use(
  // 把请求结果中的http转https。避免浏览器的混合提示
  response => JSON.parse(JSON.stringify(response.data).replace(/http:\/\//g, 'https://')),
  error => {
    const { response, config } = error
    if (response) {
      switch (response.status) {
        case 401: // 当前请求需要权限（一般是未登录）
          break
        case 403: // 服务器拒绝请求（token过期）
          break
        case 404: // 找不到页面
      }
    } else {
      // 断网处理：可以设置跳转到断网页面
      if (!window.navigator.onLine) return Promise.reject(error)
      // 请求延迟，重新请求
      config.__retryCount = config.__retryCount || 0
      if (!config || !config.retry || config.__retryCount >= config.retry) return Promise.reject(error)
      config.__retryCount += 1
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, config.retryDelay || 1)
      })
      return backoff.then(() => axios(config))
    }
  }
)

export default axios
