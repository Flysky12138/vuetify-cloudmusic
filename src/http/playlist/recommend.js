import axios from '../api'
import detail from '../song/detail'

// 日推
function recommend() {
  return new Promise((resolve, reject) => {
    axios
      .get('/recommend/songs')
      .then(response => {
        detail(response.data.dailySongs.map(element => element.id))
          .then(resolve)
          .catch(reject)
      })
      .catch(error => reject(error))
  })
}

export default recommend
