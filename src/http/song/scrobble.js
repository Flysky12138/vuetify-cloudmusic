import axios from '../api'

// 听歌打卡
function scrobble(id, sourceid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/scrobble', {
        params: {
          id,
          sourceid
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default scrobble
