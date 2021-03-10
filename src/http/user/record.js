import axios from "../api";

// 获取用户播放记录
function record(uid, type) {
  return new Promise((resolve, reject) => {
    axios
      .get("/user/record", {
        params: {
          uid,
          type
        }
      })
      .then(response => {
        let arr = [];
        // 用户是否允许他人预览
        if (typeof response !== "undefined") {
          let key;
          type === 0 ? (key = "allData") : (key = "weekData");
          response[key].forEach(element => {
            arr.push({
              playCount: element.playCount === 0 ? "-" : element.playCount,
              score: element.score,
              song: {
                name: element.song.name,
                id: element.song.id,
                artists: element.song.ar.map(res => res.name).join(" / ")
              }
            });
          });
        }
        resolve(arr);
      })
      .catch(error => reject(error));
  });
}

export default record;
