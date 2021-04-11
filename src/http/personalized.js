import axios from './api'

// 推荐歌单
function personalized(limit = 30) {
  return new Promise((resolve, reject) => {
    axios
      .get('/personalized', {
        params: {
          limit
        }
      })
      .then(response => {
        let arr = []
        response.result.forEach(element => {
          arr.push({
            id: element.id,
            name: element.name,
            coverImgUrl: element.picUrl,
            playCount: element.playCount
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default personalized
