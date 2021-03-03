import axios from "../api";

// 获取用户歌单
function playlist(uid, type = 0) {
  return axios
    .get("/user/playlist", {
      params: {
        uid,
        limit: 500
      }
    })
    .then(response => {
      let arr = [];
      response.playlist.forEach(element => {
        // 根据type返回值;0该UID创建的歌单,1该UID收藏的歌单
        if (
          (type === 0 && element.creator.userId == uid) ||
          (type === 1 && element.creator.userId != uid)
        ) {
          arr.push({
            id: element.id,
            name: element.name,
            playCount: element.playCount,
            coverImgUrl: element.coverImgUrl
          });
        }
      });
      return Promise.resolve(arr);
    });
}

export default playlist;
