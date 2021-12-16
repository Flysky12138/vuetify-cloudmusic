import axios from '../api'

// 获取用户歌单
function once(uid, offset = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/playlist', {
        params: {
          uid,
          limit: 30,
          offset: 30 * offset
        }
      })
      .then(response => {
        let obj = {
          more: response.more,
          create: [],
          collect: []
        }
        response.playlist.forEach(element => {
          const type = element.creator.userId == uid ? 'create' : 'collect'
          obj[type].push({
            id: element.id,
            name: element.name,
            playCount: element.playCount,
            trackCount: element.trackCount,
            coverImgUrl: element.coverImgUrl
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

async function playlist(uid) {
  let data = {
    obj: {
      create: [],
      collect: []
    },
    i: 0,
    more: false
  }
  do {
    const res = await once(uid, data.i)
    data.more = res.more
    data.obj.create = data.obj.create.concat(res.create)
    data.obj.collect = data.obj.collect.concat(res.collect)
    data.i++
  } while (data.more)
  return data.obj
}

export default playlist
