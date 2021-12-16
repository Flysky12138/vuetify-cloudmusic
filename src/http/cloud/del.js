import axios from '../api'

// 云盘歌曲删除
function del(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/cloud/del', {
        params: {
          id
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default del
