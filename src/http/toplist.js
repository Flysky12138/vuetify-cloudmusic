import axios from './api'

// 所有榜单
function toplist() {
  return new Promise((resolve, reject) => {
    axios
      .get('/toplist')
      .then(response => {
        const data = response.list.reduce(
          (acc, cur) => {
            const obj = {
              id: cur.id,
              name: cur.name,
              coverImgUrl: cur.coverImgUrl,
              updateFrequency: cur.updateFrequency
            }
            cur.ToplistType ? acc.feature.push(obj) : acc.media.push(obj)
            return acc
          },
          { feature: [], media: [] }
        )
        resolve(data)
      })
      .catch(error => reject(error))
  })
}

export default toplist
