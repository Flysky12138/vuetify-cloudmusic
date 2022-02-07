import axios from '../api'

// 歌手全部歌曲
function once(id, page = 0, limit = 200) {
  return new Promise((resolve, reject) => {
    axios
      .get('/artist/songs', {
        params: {
          id,
          order: 'hot',
          limit,
          offset: limit * page
        }
      })
      .then(response => {
        resolve({
          more: response.more,
          songs: response.songs.map((element, index) => ({
            count: limit * page + index + 1,
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
            mv: element.mv,
            privilege: {
              fee: element.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: element.privilege.cs, // boolean：云盘
              st: element.privilege.st // -200：无版权
            }
          }))
        })
      })
      .catch(error => reject(error))
  })
}

async function songs(id) {
  let data = {
    songs: [],
    i: 0,
    more: false
  }
  do {
    const res = await once(id, data.i++)
    data.more = res.more
    data.songs = data.songs.concat(res.songs)
  } while (data.more)
  return data.songs
}

export default songs
