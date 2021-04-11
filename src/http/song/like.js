import axios from '../api'

// 添加移除喜欢音乐
function like(id, like) {
  return new Promise((resolve, reject) => {
    axios
      .get('/like', {
        params: {
          id,
          like
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

export default like
