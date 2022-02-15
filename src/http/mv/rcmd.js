import axios from '../api'

// 获取歌曲相关视频的 mlog id
function rcmd(songid, mvid = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/mlog/music/rcmd', {
        params: {
          songid,
          mvid
        }
      })
      .then(response => {
        response.data.feeds.length > 0 ? resolve(response.data.feeds.map(res => res.id)) : reject()
      })
      .catch(error => reject(error))
  })
}

export default rcmd
