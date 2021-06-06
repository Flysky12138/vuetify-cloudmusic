import axios from 'axios'
// import qs from "qs";

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  case 'production':
    const defaultApi = 'https://netease-cloud-music-api-gamma.vercel.app'
    const api = JSON.parse(localStorage.getItem('api'))
    axios.defaults.baseURL = api ? api : defaultApi
    break
  default:
    axios.defaults.baseURL = 'http://localhost:3000'
}

axios.defaults.timeout = 10000 // 超时时间
axios.defaults.retry = 5 // 超时重复请求次数
axios.defaults.retryDelay = 1000 // 超时重复请求的间隙
axios.defaults.withCredentials = true // 跨域是否允许携带Cookie凭证

// 设置Post请求传递数据的格式（看服务器要求什么格式）
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.transformRequest = data => qs.stringify(data);

// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    // 添加时间戳
    if (config.method == 'post') {
      config.data = {
        ...config.data,
        timestamp: new Date().getTime(),
        cookie: localStorage.getItem('cookie')
      }
    } else if (config.method == 'get') {
      config.params = {
        ...config.params,
        timestamp: new Date().getTime(),
        cookie: localStorage.getItem('cookie')
      }
    }
    // 添加Token
    // const token = localStorage.getItem("token");
    // token && (config.headers.Authorization = token);
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
    // 根据错误状态进行对应处理
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
