import axios from '../api'

// 二维码key生成接口
function key() {
  return new Promise((resolve, reject) => {
    axios
      .get('/login/qr/key')
      .then(res => {
        resolve(res.data.unikey)
      })
      .catch(error => reject(error))
  })
}
// 二维码生成接口
function create(key) {
  return new Promise((resolve, reject) => {
    axios
      .get('/login/qr/create', {
        params: {
          key,
          qrimg: true
        }
      })
      .then(res => {
        resolve(res.data.qrimg)
      })
      .catch(error => reject(error))
  })
}
// 二维码检测扫码状态接口
function check(key) {
  return new Promise((resolve, reject) => {
    axios
      .get('/login/qr/check', {
        params: {
          key
        }
      })
      .then(response => {
        let obj = {
          code: 2,
          cookie: response.cookie
        }
        switch (response.code) {
          case 800: // 二维码过期
            obj.code = 0
            break
          case 801: // 等待扫码
            obj.code = 1
            break
          case 802: // 待确认
            obj.code = 2
            break
          case 803: // 授权成功
            obj.code = 3
            break
        }
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default {
  key,
  create,
  check
}
