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
        if (response.lrc) {
          const lyric = response.lrc.lyric.split("\n");
          lyric.forEach(element => {
            let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g);
            time = time
              ? Number(time[0].substring(0, 2) * 60) +
                Number(time[0].substring(3))
              : 0;
            arr.push({
              time: Math.round(time * 1000),
              value: element.substring(element.indexOf("]") + 1)
            });
          });
        } else {
          arr.push({
            time: 0,
            value: "纯音乐，请欣赏"
          });
        }
        resolve(arr.filter(res => res.value !== ""));
      })
      .catch(error => reject(error));
  });
}

export default lyric;
