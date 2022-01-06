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
          createTime: response.playlist.createTime,
          description: response.playlist.description || '',
          name: response.playlist.name,
          playCount: response.playlist.playCount,
          shareCount: response.playlist.shareCount,
          subscribed: response.playlist.subscribed,
          subscribedCount: response.playlist.subscribedCount,
          tags: response.playlist.tags,
          trackCount: response.playlist.trackCount,
          trackIds: response.playlist.trackIds.map(res => res.id),
          userId: response.playlist.userId,
          avatarUrl: response.playlist.creator.avatarUrl,
          nickname: response.playlist.creator.nickname
        })
      })
      .catch(error => reject(error))
  })
}

export default detail
