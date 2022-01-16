import md5 from 'blueimp-md5'
import axios from '../api'

// 密码登录
function password(phone, password) {
  return new Promise((resolve, reject) => {
    axios
      .get('/login/cellphone', {
        params: {
          phone,
          md5_password: md5(password)
        }
      })
      .then(response => {
        response || reject('操作频繁，请稍候再试')
        let obj = {
          code: 2,
          cookie: response.cookie
        }
        switch (response.code) {
          case 502: // 密码错误
            obj.code = 0
            break
          case 200: // 登录成功
            obj.code = 1
            break
          case 250: // 登录失败
            obj.code = 2
            break
          case 509: // 密码错误超过限制
            obj.code = 3
        }
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

// 验证码登录
async function captcha(phone, captcha) {
  try {
    const res = await axios.get('/captcha/verify', { params: { phone, captcha } })
    return res.data ? await axios.get('/login/cellphone', { params: { phone, captcha } }) : Promise.reject(res.message)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  password,
  captcha
}
