import axios from '../api'

// 歌单 ( 网友精选碟 )
function top(cat = '全部', limit = 30, offset = 0, order = 'hot') {
  return new Promise((resolve, reject) => {
    axios
      .get('/top/playlist', {
        params: {
          cat,
          limit,
          offset,
          order
        }
      })
      .then(response => {
        let obj = {
          total: response.total,
          playlists: []
        }
        response.playlists.forEach(element => {
          obj.playlists.push({
            id: element.id,
            name: element.name,
            coverImgUrl: element.coverImgUrl,
            playCount: element.playCount
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default top
