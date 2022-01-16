import axios from '../api'

// 获取客户端歌曲下载 url
function download(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/song/download/url', {
        params: {
          id
        }
      })
      .then(response => {
        resolve(response.data && response.data.url)
      })
      .catch(error => reject(error))
  })
}

export default download
