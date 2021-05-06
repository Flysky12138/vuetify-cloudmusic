import axios from '../api'

// 获取音乐 url
function url(id, br = 320000) {
  return new Promise((resolve, reject) => {
    axios
      .get('/song/url', {
        params: {
          id,
          br
        }
      })
      .then(response => {
        const element = response.data[0]
        resolve({
          freeTrialInfo: element.freeTrialInfo,
          size: element.size,
          type: element.type,
          url: element.url
        })
      })
      .catch(error => reject(error))
  })
}

export default url
