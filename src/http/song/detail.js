import axios from "../api";
import time from "common/time";

// 获取歌曲详情
function detail(ids) {
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

export default detail;
