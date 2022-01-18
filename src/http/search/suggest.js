import axios from '../api'

// 搜索建议
function suggest(keywords) {
  return new Promise((resolve, reject) => {
    axios
      .get('/search/suggest', {
        params: {
          keywords,
          type: 'mobile'
        }
      })
      .then(response => {
        resolve(response.result.allMatch ? response.result.allMatch.filter(res => res.type === 1).map(res => res.keyword) : [])
      })
      .catch(error => reject(error))
  })
}

export default suggest
