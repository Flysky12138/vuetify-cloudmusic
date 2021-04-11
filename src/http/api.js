import axios from 'axios'
// import qs from "qs";

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  case 'production':
    const defaultApi = 'https://music.api.flysky.xyz'
    const api = JSON.parse(localStorage.getItem('api'))
    axios.defaults.baseURL = api ? api : defaultApi
    break
  default:
    axios.defaults.baseURL = 'http://localhost:3000'
    break
}

// 设置超时时间和跨域是否允许携带Cookie凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

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
        timerstamp: new Date().getTime()
      }
    } else if (config.method == 'get') {
      config.params = {
        ...config.params,
        timerstamp: new Date().getTime()
      }
    }
    // 添加Token
    // const token = localStorage.getItem("token");
    // token && (config.headers.Authorization = token);
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.defaults.validateStatus = status => {
  // 自定义响应成功的HTTP状态码
  return /^(2|3|5)\d{2}$/.test(status)
}
axios.interceptors.response.use(
  response => {
    // 把请求结果中的http转https。避免浏览器的混合提示
    return JSON.parse(JSON.stringify(response.data).replace(/http:\/\//g, 'https://'))
  },
  error => {
    let { response } = error
    if (response) {
      // 服务器返回了非2\3\5状态码的结果
      switch (response.status) {
        case 401: // 当前请求需要权限（一般是未登录）
          break
        case 403: // 服务器拒绝请求（token过期）
          break
        case 404: // 找不到页面
          break
      }
    } else {
      // 断网处理：可以跳转到断网页面
      if (!window.navigator.onLine) {
        return
      }
      return Promise.reject(error)
    }
  }
)

export default axios
