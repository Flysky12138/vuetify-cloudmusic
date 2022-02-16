import axios from '../api'
import detail from '../song/detail'

// 搜索 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
function cloudsearch(keywords, offset = 0, limit = 36, type = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get('/cloudsearch', {
        params: {
          keywords,
          offset,
          limit,
          type
        }
      })
      .then(response => {
        let obj = {
          hasMore: response.result.hasMore,
          songCount: response.result.songCount,
          songs: []
        }
        obj.songCount
          ? detail(response.result.songs.map(element => element.id)).then(res => {
              resolve(Object.assign(obj, { songs: res }))
            })
          : resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default cloudsearch
