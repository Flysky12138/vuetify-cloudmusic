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
        if (response.lrc) {
          // 歌词
          const lyric = response.lrc.lyric
            .split("\n")
            .filter(res => res !== "");
          lyric.forEach(element => {
            let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g);
            if (time) {
              // 00:00.00 字符串转毫秒
              time = Math.round(
                (Number(time[0].substring(0, 2)) * 60 +
                  Number(time[0].substring(3))) *
                  1000
              );
              arr.push({
                time: time,
                lyric: element.substring(element.indexOf("]") + 1)
              });
            }
          });
          // 翻译
          const tlyric = response.tlyric.lyric
            .split("\n")
            .filter(res => res !== "");
          if (tlyric.length !== 0) {
            // 在arr数组中对应相同time对象插入翻译项tlyric
            tlyric.forEach(element => {
              let time = element.match(/\d{2}:\d{2}.(\d{2}|\d{3})/g);
              if (time) {
                time = Math.round(
                  (Number(time[0].substring(0, 2)) * 60 +
                    Number(time[0].substring(3))) *
                    1000
                );
                const item = arr.find(res => res.time === time);
                item &&
                  (item.tlyric = element.substring(element.indexOf("]") + 1));
              }
            });
            // 在最后插入翻译者
            let contributor = tlyric[0].substring(1, tlyric[0].length - 1);
            arr.push({
              time: 600000,
              lyric: contributor.replace("by:", "翻译贡献者: ")
            });
          }
        } else {
          arr.push({
            time: 0,
            lyric: "纯音乐，请欣赏"
          });
        }
        resolve(arr.filter(res => res.lyric !== ""));
      })
      .catch(error => reject(error));
  });
}

export default lyric;
