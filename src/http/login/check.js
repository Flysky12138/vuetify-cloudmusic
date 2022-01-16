import axios from '../api'

// 检测手机号码是否已注册
function check(phone) {
  return new Promise((resolve, reject) => {
    axios
      .get('/cellphone/existence/check', {
        params: {
          phone
        }
      })
      .then(response => {
        resolve(response.hasPassword)
      })
      .catch(error => reject(error))
  })
}

export default check
