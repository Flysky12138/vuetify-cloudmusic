import axios from "../api";

// 对歌单添加或删除歌曲
function tracks(pid, tracks) {
  return new Promise((resolve, reject) => {
    axios
      .get("/playlist/tracks", {
        params: {
          pid,
          tracks,
          op: "add" // del
        }
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });
}

export default tracks;
