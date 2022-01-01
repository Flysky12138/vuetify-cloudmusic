import axios from '../api'

// 歌手全部歌曲
function once(id, page = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/artist/songs', {
        params: {
          id,
          order: 'hot',
          limit: 200,
          offset: page * 200
        }
      })
      .then(response => {
        let data = {
          songs: [],
          hasMore: response.more
        }
        response.songs.forEach(element => {
          data.songs.push({
            id: element.id,
            name: element.name,
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            albumID: element.al.id,
            album: element.al.name ? '《' + element.al.name + '》' : '',
            dt: element.dt,
            privilege: {
              fee: element.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: element.privilege.cs, // boolean：云盘
              st: element.privilege.st // -200：无版权
            }
          })
        })
        resolve(data)
      })
      .catch(error => reject(error))
  })
}

async function songs(id) {
  let data = {
    songs: [],
    i: 0,
    hasMore: false
  }
  do {
    const res = await once(id, data.i++)
    data.hasMore = res.hasMore
    data.songs = data.songs.concat(res.songs)
  } while (data.hasMore)
  return data.songs
}

export default songs
