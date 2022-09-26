import axios from '../api'

// 获取云盘数据
function once(page = 0, limit = 200) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/cloud', {
        params: {
          limit,
          offset: limit * page
        }
      })
      .then(response => {
        resolve({
          hasMore: response.hasMore,
          data: response.data.map((element, index) => ({
            count: limit * page + index + 1,
            id: element.simpleSong.id,
            name: element.simpleSong.name,
            alia: element.simpleSong.alia || [],
            artists: element.simpleSong.ar
              ? element.simpleSong.ar.map(res => ({
                  id: res.id,
                  name: res.name
                }))
              : [{ id: 0, name: '' }],
            album: element.simpleSong.al
              ? {
                  id: element.simpleSong.al.id,
                  name: element.simpleSong.al.name
                }
              : {
                  id: 0,
                  name: ''
                },
            dt: element.simpleSong.dt,
            mv: element.simpleSong.mv,
            privilege: {
              fee: element.simpleSong.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: element.simpleSong.privilege.cs, // boolean：云盘
              st: element.simpleSong.privilege.st // -200：无版权
            }
          }))
        })
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
