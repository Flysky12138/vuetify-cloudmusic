import time from 'common/time'
import axios from '../api'

// 日推
function recommend() {
  return new Promise((resolve, reject) => {
    axios
      .get('/recommend/songs')
      .then(response => {
        let arr = []
        response.data.dailySongs.forEach(element => {
          arr.push({
            id: element.id,
            name: element.name,
            artists: element.ar.map(res => res.name).join(' / '),
            album: element.al.name ? '《' + element.al.name + '》' : '',
            duration: time.song(element.dt)
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default recommend
