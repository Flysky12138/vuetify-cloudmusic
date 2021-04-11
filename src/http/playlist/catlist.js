import axios from '../api'

// 歌单分类
function catlist() {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/catlist')
      .then(response => {
        let arr = []
        Object.values(response.categories).forEach(element => {
          arr.push({
            sort: element,
            names: []
          })
        })
        response.sub.forEach(element => {
          arr[element.category].names.push(element.name)
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default catlist
