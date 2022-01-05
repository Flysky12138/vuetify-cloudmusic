import axios from '../api'

// 获取歌单所有歌曲
function all(id, limit) {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/track/all', {
        params: {
          id,
          limit
        }
      })
      .then(response => {
        let arr = []
        response.songs.forEach((element, index) => {
          arr.push({
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
            // https://github.com/Binaryify/NeteaseCloudMusicApi/issues/899#issuecomment-680002883
            privilege: {
              fee: response.privileges[index].fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: response.privileges[index].cs, // boolean：云盘
              st: response.privileges[index].st // -200：无版权
            }
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default all
