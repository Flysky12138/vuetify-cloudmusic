import time from 'common/time'
import axios from '../api'

// 搜索 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
function search(keywords, offset = 0, limit = 36, type = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get('/search', {
        params: {
          keywords,
          offset,
          limit,
          type
        }
      })
      .then(response => {
        let obj = {
          hasMore: false,
          songCount: response.result.songCount,
          songs: []
        }
        if (obj.songCount !== 0) {
          obj.hasMore = response.result.hasMore
          response.result.songs.forEach(element => {
            obj.songs.push({
              id: element.id,
              name: element.name,
              artists: element.artists.map(res => res.name).join(' / '),
              album: element.album.name ? '《' + element.album.name + '》' : '',
              duration: time.song(element.duration)
            })
          })
        }
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default search
