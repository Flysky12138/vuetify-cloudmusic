import axios from '../api'

// 获取歌词
function lyric(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/lyric', {
        params: {
          id
        }
      })
      .then(response => {
        let arr = []
        let user = {
          time: 1e6,
          lyric: '',
          tlyric: ''
        }
        // 歌词
        if (response.lrc) {
          const lyric = response.lrc.lyric.split('\n').filter(res => res !== '')
          lyric.forEach(element => {
            let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g)
            if (time) {
              time = Math.round((Number(time[0].substring(0, 2)) * 60 + Number(time[0].substring(3))) * 1000)
              arr.push({
                time: time, // 毫秒
                lyric: element.substring(element.lastIndexOf(']') + 1) // 歌词
              })
            }
          })
          // 歌词贡献者
          response.lyricUser && (user.lyric = '歌词贡献者: ' + response.lyricUser.nickname)
        } else {
          arr.push({
            time: 0,
            lyric: '纯音乐，请欣赏'
          })
        }
        // 翻译
        if (response.tlyric) {
          const tlyric = response.tlyric.lyric.split('\n').filter(res => res !== '')
          // 在arr数组中,对应相同time对象中插入翻译项tlyric
          tlyric.forEach(element => {
            let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g)
            if (time) {
              time = Math.round((Number(time[0].substring(0, 2)) * 60 + Number(time[0].substring(3))) * 1000)
              const item = arr.find(res => res.time === time)
              item && (item.tlyric = element.substring(element.lastIndexOf(']') + 1)) // 翻译
            }
          })
          // 翻译贡献者
          response.transUser && (user.tlyric = '翻译贡献者: ' + response.transUser.nickname)
        }
        arr.push(user)
        resolve(arr.filter(res => res.lyric !== ''))
      })
      .catch(error => reject(error))
  })
}

export default lyric
