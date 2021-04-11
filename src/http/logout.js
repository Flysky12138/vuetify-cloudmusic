import axios from './api'

// 退出登录
function logout() {
  return new Promise((resolve, reject) => {
    axios
      .get('/logout')
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default logout
