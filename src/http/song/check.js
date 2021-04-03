import axios from "../api";

// 音乐是否可用
function check(id) {
  return new Promise((resolve, reject) => {
    axios
      .get("/check/music", {
        params: {
          id
        }
      })
      .then(response => {
        resolve(response ? true : false);
      })
      .catch(error => reject(error));
  });
}

export default check;
