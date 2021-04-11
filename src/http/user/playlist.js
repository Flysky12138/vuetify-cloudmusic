import axios from '../api'

// 获取用户歌单
function playlist(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/playlist', {
        params: {
          uid,
          limit: 1000
        }
      })
      .then(response => {
        let obj = {
          create: [],
          collect: []
        }
        response.playlist.forEach(element => {
          const type = element.creator.userId == uid ? 'create' : 'collect'
          obj[type].push({
            id: element.id,
            name: element.name,
            playCount: element.playCount,
            trackCount: element.trackCount,
            coverImgUrl: element.coverImgUrl
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default playlist
