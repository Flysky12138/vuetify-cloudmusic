import axios from '../api'

// 搜索 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
function cloudsearch(keywords, offset = 0, limit = 36, type = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get('/cloudsearch', {
        params: {
          keywords,
          offset,
          limit,
          type
        }
      })
      .then(response => {
        let obj = {
          hasMore: false,
          songCount: response.result.songCount,
          songs: []
        }
        if (obj.songCount !== 0) {
          obj.hasMore = response.result.hasMore
          response.result.songs.forEach(element => {
            obj.songs.push({
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
        }
        resolve(obj)
      })
      .catch(error => reject(error))
  })
}

export default cloudsearch
