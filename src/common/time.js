const dateTimeFormat = [
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }),
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false
  }),
  new Intl.DateTimeFormat('zh-CN', {
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }),
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
]

// 歌单创建时间
function date(timestamp) {
  return dateTimeFormat[0].format(timestamp)
}
// 专辑创建时间
function dateSort(timestamp) {
  return dateTimeFormat[1].format(timestamp)
}
// 歌曲时长
function song(timestamp) {
  return dateTimeFormat[2].format(timestamp)
}
// 日推标题时间
function nowDate() {
  return dateTimeFormat[3].format()
}

export default {
  date,
  dateSort,
  song,
  nowDate
}
