import axios from './api'

// 歌手部分信息和热门歌曲
function artists(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/artists', {
        params: {
          id
        }
      })
      .then(response => {
        let obj = {
          alias: response.artist.alias,
          musicSize: response.artist.musicSize,
          albumSize: response.artist.albumSize,
          mvSize: response.artist.mvSize,
          briefDesc: response.artist.briefDesc || '',
          img1v1Url: response.artist.img1v1Url,
          name: response.artist.name,
          accountId: response.artist.accountId || 0,
          hotSongs: []
        }
        response.hotSongs.forEach(element => {
          obj.hotSongs.push({
            id: element.id,
            name: element.name,
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            albumID: element.al.id,
            album: element.al.name ? '《' + element.al.name + '》' : '',
            dt: element.dt
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default artists
