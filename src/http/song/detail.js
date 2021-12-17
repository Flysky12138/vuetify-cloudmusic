import axios from '../api'

// 获取歌曲详情
function once(ids) {
  return new Promise((resolve, reject) => {
    axios
      .get('/song/detail', {
        params: {
          ids: ids.join(',')
        }
      })
      .then(response => {
        let arr = []
        response.songs.forEach((element, index) => {
          arr.push({
            id: element.id,
            name: element.name,
            picUrl: element.al.picUrl,
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            albumID: element.al.id,
            album: element.al.name ? '《' + element.al.name + '》' : '',
            dt: element.dt,
            // https://github.com/Binaryify/NeteaseCloudMusicApi/issues/899#issuecomment-680002883
            privileges: {
              fee: response.privileges[index].fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
              cs: response.privileges[index].cs, // boolean：云盘
              st: response.privileges[index].st // -200：无版权
            }
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

function detail(ids) {
  return new Promise((resolve, reject) => {
    // 每500首请求一次，数量过多会报错
    const count = Math.ceil(ids.length / 500)
    // 存放请求函数的数组
    let funcHttp = []
    for (let i = 0; i < count; i++) {
      funcHttp.push(once(ids.slice(500 * i, 500 * (i + 1))))
    }
    // 开始请求
    axios
      .all(funcHttp)
      .then(response => {
        resolve(response.flat())
      })
      .catch(error => reject(error))
  })
}

export default detail
