import axios from '../api'

// 歌手部分信息
function artists(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/artists', {
        params: {
          id
        }
      })
      .then(response => {
        resolve({
          alias: response.artist.alias,
          musicSize: response.artist.musicSize,
          albumSize: response.artist.albumSize,
          mvSize: response.artist.mvSize,
          briefDesc: response.artist.briefDesc || '',
          img1v1Url: response.artist.img1v1Url,
          name: response.artist.name,
          accountId: response.artist.accountId || 0
        })
      })
      .catch(error => reject(error))
  })
}

export default artists
