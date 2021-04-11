import axios from '../api'

// 收藏/取消收藏歌单
function subscribe(id, t = true) {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/subscribe', {
        params: {
          id,
          t: t ? 1 : 2
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default subscribe
