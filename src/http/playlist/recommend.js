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
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            album: element.al.name ? '《' + element.al.name + '》' : '',
            dt: element.dt
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default recommend
