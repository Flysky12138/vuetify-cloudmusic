import time from 'common/time'
import axios from '../api'

// 获取歌单详情
function detail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/detail', {
        params: {
          id
        }
      })
      .then(response => {
        resolve({
          id: response.playlist.id,
          coverImgUrl: response.playlist.coverImgUrl,
          createTime: time.date(response.playlist.createTime),
          description: response.playlist.description,
          name: response.playlist.name,
          playCount: response.playlist.playCount,
          shareCount: response.playlist.shareCount,
          subscribed: response.playlist.subscribed,
          subscribedCount: response.playlist.subscribedCount,
          tags: response.playlist.tags,
          trackCount: response.playlist.trackCount,
          userId: response.playlist.userId,
          avatarUrl: response.playlist.creator.avatarUrl,
          nickname: response.playlist.creator.nickname
        })
      })
      .catch(error => reject(error))
  })
}

export default detail
