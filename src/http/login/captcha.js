import axios from '../api'

// 发送验证码
function captcha(phone) {
  return new Promise((resolve, reject) => {
    axios
      .get('/captcha/sent', {
        params: {
          phone
        }
      })
      .then(response => {
        resolve(response || {})
      })
      .catch(error => reject(error))
  })
}

export default captcha
