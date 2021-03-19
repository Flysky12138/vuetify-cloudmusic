import axios from "../api";
import time from "common/time";

function once(ids) {
  return new Promise((resolve, reject) => {
    axios
      .get("/song/detail", {
        params: {
          ids: ids.join(",")
        }
      })
      .then(response => {
        let arr = [];
        response.songs.forEach(element => {
          arr.push({
            id: element.id,
            name: element.name,
            duration: time.song(element.dt),
            artists: element.ar.map(res => res.name).join(" / "),
            album: "《" + element.al.name + "》"
          });
        });
        resolve(arr);
      })
      .catch(error => reject(error));
  });
}

// 获取歌曲详情
function detail(ids) {
  return new Promise((resolve, reject) => {
    // 每500首请求一次，数量过多会报错
    const count = Math.ceil(ids.length / 500);
    // 存放请求函数的数组
    let funcHttp = [];
    for (let i = 0; i < count; i++) {
      funcHttp.push(once(ids.slice(500 * i, 500 * (i + 1))));
    }
    let arr = [];
    // 开始请求
    axios
      .all(funcHttp)
      .then(res => {
        res.forEach(element => {
          arr = arr.concat(element);
        });
        resolve(arr);
      })
      .catch(error => reject(error));
  });
}

export default detail;
