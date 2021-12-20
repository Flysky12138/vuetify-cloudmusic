// 该服务为 vercel serve 跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''
  if (req.url.startsWith('/unapi')) {
    target = 'https://unblock-netease-music-api.vercel.app/'
  }
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/unapi/': '/'
    }
  })(req, res)
}
