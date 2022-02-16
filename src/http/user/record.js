import axios from '../api'
import detail from '../song/detail'

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
        const key = type === 0 ? 'allData' : 'weekData'
        response
          ? detail(response[key].map(element => element.song.id)).then(item => {
              resolve(
                item.map((res, index) =>
                  Object.assign(res, {
                    count: response[key][index].playCount ? response[key][index].playCount : '-'
                  })
                )
              )
            })
          : resolve(false)
      })
      .catch(error => reject(error))
  })
}

export default record
