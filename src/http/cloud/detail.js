import time from 'common/time'
import axios from '../api'

// 获取云盘数据
function once(offset = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/cloud', {
        params: {
          limit: 200,
          offset: 200 * offset
        }
      })
      .then(response => {
        let obj = {
          hasMore: response.hasMore,
          data: []
        }
        response.data.forEach(element => {
          obj.data.push({
            id: element.simpleSong.id,
            name: element.simpleSong.name,
            artists: element.simpleSong.ar
              ? element.simpleSong.ar.map(res => ({
                  id: res.id,
                  name: res.name
                }))
              : [{ id: 0, name: '' }],
            album: element.simpleSong.al ? (element.simpleSong.al.name ? '《' + element.simpleSong.al.name + '》' : '') : '',
            duration: time.song(element.simpleSong.dt)
          })
        })
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

async function detail() {
  let data = {
    arr: [],
    i: 0,
    hasMore: false
  }
  do {
    const res = await once(data.i)
    data.hasMore = res.hasMore
    data.arr = data.arr.concat(res.data)
    data.i++
  } while (data.hasMore)
  return data.arr
}

export default detail
