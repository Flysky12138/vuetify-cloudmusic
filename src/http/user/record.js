import axios from '../api'

// 获取用户播放记录
function record(uid, type = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/record', {
        params: {
          uid,
          type
        }
      })
      .then(response => {
        if (response) {
          resolve(
            response[type === 0 ? 'allData' : 'weekData'].map((element, index) => ({
              count: index + 1,
              count: element.playCount === 0 ? '-' : element.playCount,
              id: element.song.id,
              name: element.song.name,
              artists: element.song.ar.map(res => ({
                id: res.id,
                name: res.name
              })),
              album: {
                id: element.song.al.id,
                name: element.song.al.name
              },
              dt: element.song.dt,
              mv: element.song.mv,
              privilege: {
                fee: element.song.privilege.fee, // 0、8：免费；4：所在专辑需单独付费；1：VIP可听
                cs: element.song.privilege.cs, // boolean：云盘
                st: element.song.privilege.st // -200：无版权
              }
            }))
          )
        } else {
          resolve(false)
        }
      })
      .catch(error => reject(error))
  })
}

export default record
