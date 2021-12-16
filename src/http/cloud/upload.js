import axios from '../api'

// 上传单首歌曲到云盘
function once(file) {
  const formData = new FormData()
  formData.append('songFile', file)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/cloud',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

function upload(fileArr) {
  return new Promise((resolve, reject) => {
    // 存放请求函数的数组
    let funcHttp = []
    for (let item of fileArr) {
      funcHttp.push(once(item))
    }
    // 开始请求
    axios
      .all(funcHttp)
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default upload
