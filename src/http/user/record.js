import axios from '../api'

// 获取用户播放记录
function record(uid, type = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/record', {
        params: {
          uid,
          type
        }
      })
      .then(response => {
        let arr = [],
          key
        type === 0 ? (key = 'allData') : (key = 'weekData')
        response[key].forEach(element => {
          arr.push({
            playCount: element.playCount === 0 ? '-' : element.playCount,
            score: element.score,
            song: {
              id: element.song.id,
              name: element.song.name,
              artists: element.song.ar.map(res => res.name).join(' / ')
            }
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default record
