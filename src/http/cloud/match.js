import axios from '../api'

// 云盘歌曲信息匹配纠正
function match(uid, sid, asid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/cloud/match', {
        params: {
          uid,
          sid,
          asid
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default match
