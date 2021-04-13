import axios from './api'

// 签到 0、安卓端签到 1、web/PC 签到
function daily(type = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/daily_signin', {
        params: {
          type
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

// 云贝签到
function yunbei() {
  return new Promise((resolve, reject) => {
    axios
      .get('/yunbei/sign')
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

function siginin() {
  return new Promise((resolve, reject) => {
    axios
      .all([daily(0), daily(1), yunbei()])
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default siginin
