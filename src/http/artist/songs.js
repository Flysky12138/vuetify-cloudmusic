import axios from '../api'
import detail from '../song/detail'

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
          ids: response.songs.map(element => element.id)
        })
      })
      .catch(error => reject(error))
  })
}

async function songs(id) {
  let data = {
    ids: [],
    i: 0,
    more: false
  }
  do {
    const res = await once(id, data.i++)
    data.more = res.more
    data.ids = data.ids.concat(res.ids)
  } while (data.more)
  return await detail(data.ids)
}

export default songs
