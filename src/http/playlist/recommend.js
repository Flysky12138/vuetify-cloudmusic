import axios from "../api";
import time from "common/time";

// 日推
function recommend() {
  return new Promise((resolve, reject) => {
    axios
      .get("/recommend/songs")
      .then(response => {
        let arr = [];
        response.data.dailySongs.forEach(element => {
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

export default recommend;
