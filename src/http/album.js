import axios from './api'

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
        let obj = {
          songs: [],
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
            description: response.album.description
          }
        }
        response.songs.forEach(element => {
          obj.songs.push({
            id: element.id,
            name: element.name,
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            album: {
              id: element.al.id,
              name: element.al.name
            },
            dt: element.dt,
            privilege: {
              fee: element.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: element.privilege.cs, // boolean：云盘
              st: element.privilege.st // -200：无版权
            }
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default personalized
