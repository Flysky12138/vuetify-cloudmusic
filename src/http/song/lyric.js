import axios from "../api";

// 获取歌词
function lyric(id) {
  return new Promise((resolve, reject) => {
    axios
      .get("/lyric", {
        params: {
          id
        }
      })
      .then(response => {
        let arr = [];
        // 歌词字符串转数组
        const lyric = response.lrc.lyric.split("\n");
        lyric.forEach(element => {
          let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g);
          arr.push({
            time: time == null ? "" : time[0],
            value: element.substring(element.indexOf("]") + 1)
          });
        });
        resolve(arr);
      })
      .catch(error => reject(error));
  });
}

export default lyric;
