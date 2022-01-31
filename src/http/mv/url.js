import axios from '../api'

// 获取 mlog 播放地址
function url(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/mlog/url', {
        params: {
          id
        }
      })
      .then(response => {
        resolve(
          response.data
            ? {
                title: response.data.resource.content.title,
                duration: response.data.resource.content.video.duration,
                coverUrl: response.data.resource.content.video.coverUrl,
                frameUrl: response.data.resource.content.video.frameUrl,
                height: response.data.resource.content.video.height,
                width: response.data.resource.content.video.width,
                id: response.data.resource.content.video.urlInfo.id,
                url: response.data.resource.content.video.urlInfo.url,
                size: response.data.resource.content.video.urlInfo.size
              }
            : {}
        )
      })
      .catch(error => reject(error))
  })
}

export default url
