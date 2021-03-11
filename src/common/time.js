function addZero(param) {
  return param < 10 ? "0" + param : param;
}

function date(timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const M = addZero(date.getMonth() + 1);
  const D = addZero(date.getDate());
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s; // 输出结果：2021-02-20 17:01:15
}

function song(params) {
  const m = addZero(Math.floor(params / 1000 / 60));
  const s = addZero(Math.floor(params / 1000 - m * 60));
  return m + ":" + s;
}

export default {
  date,
  song
};
