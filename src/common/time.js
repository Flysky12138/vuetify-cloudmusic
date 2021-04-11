// 个位数补0
function addZero(param) {
  return String(param).padStart(2, '0')
}

// 歌单创建时间
function date(timestamp) {
  const date = new Date(timestamp)
  const Y = date.getFullYear()
  const M = addZero(date.getMonth() + 1)
  const D = addZero(date.getDate())
  const h = addZero(date.getHours())
  const m = addZero(date.getMinutes())
  const s = addZero(date.getSeconds())
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s // 输出结果：2021-02-20 17:01:15
}

// 日推标题时间
function nowDate() {
  const date = new Date()
  const M = addZero(date.getMonth() + 1)
  const D = addZero(date.getDate())
  return M + '/' + D // 输出结果：02/20
}

// 歌曲时长
function song(params) {
  const m = addZero(Math.floor(params / 1000 / 60))
  const s = addZero(Math.floor(params / 1000 - m * 60))
  return m + ':' + s
}

export default {
  date,
  nowDate,
  song
}
