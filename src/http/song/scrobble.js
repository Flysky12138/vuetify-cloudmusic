import axios from '../api'

// 听歌打卡
function scrobble(id, sourceid, time = 291) {
  return new Promise((resolve, reject) => {
    axios
      .get('/scrobble', {
        params: {
          id,
          sourceid,
          time
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default scrobble
