import axios from "../api";

// 喜欢音乐列表
function likelist(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get("/likelist", {
        params: {
          uid
        }
      })
      .then(response => {
        resolve(response.ids);
      })
      .catch(error => reject(error));
  });
}

export default likelist;
