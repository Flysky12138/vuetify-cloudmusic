import axios from './api'
import detail from './song/detail'

// 获取专辑内容
function personalized(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/album', {
        params: {
          id
        }
      })
      .then(response => {
        detail(response.songs.map(element => element.id)).then(songs => {
          resolve({
            songs,
            info: {
              artist: {
                name: response.album.artist.name,
                alias: response.album.artist.alias,
                img1v1Url: response.album.artist.img1v1Url
              },
              id: response.album.id,
              name: response.album.name,
              picUrl: response.album.picUrl,
              publishTime: response.album.publishTime,
              company: response.album.company,
              description: response.album.description || ''
            }
          })
        })
      })
      .catch(error => reject(error))
  })
}

export default personalized
