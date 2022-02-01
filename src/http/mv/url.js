import axios from '../api'

// 获取 mv 播放地址
function mv(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/mv/url', {
        params: {
          id
        }
      })
      .then(response => {
        resolve({
          frameUrl: '',
          url: response.data.url
        })
      })
      .catch(error => reject(error))
  })
}

// 获取 mlog 播放地址
function mlog(id) {
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
                frameUrl: response.data.resource.content.video.frameUrl,
                url: response.data.resource.content.video.urlInfo.url
              }
            : {}
        )
      })
      .catch(error => reject(error))
  })
}

export default {
  mv,
  mlog
}
