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
            album: {
              id: element.al.id,
              name: element.al.name
            },
            dt: element.dt,
            privilege: {
              fee: element.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: element.privilege.cs, // boolean：云盘
              st: element.privilege.st // -200：无版权
            }
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default recommend
