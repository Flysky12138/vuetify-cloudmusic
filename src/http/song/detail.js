import axios from "../api";
import songTime from "common/songTime";

// 获取歌曲详情
function detail(ids) {
  return new Promise((resolve, reject) => {
    axios
      .get("/song/detail", {
        params: {
          ids
        }
      })
      .then(response => {
        let arr = [];
        response.songs.forEach(element => {
          arr.push({
            id: element.id,
            name: element.name,
            duration: songTime(element.dt),
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
