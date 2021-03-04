import axios from "../api";

// 获取用户歌单
function playlist(uid) {
  return axios
    .get("/user/playlist", {
      params: {
        uid,
        limit: 500
      }
    })
    .then(response => {
      let obj = {
        create: [],
        collect: []
      };
      response.playlist.forEach(element => {
        // 根据type返回值;0该UID创建的歌单,1该UID收藏的歌单
        const type = element.creator.userId == uid ? "create" : "collect";
        obj[type].push({
          id: element.id,
          name: element.name,
          playCount: element.playCount,
          coverImgUrl: element.coverImgUrl
        });
      });
      return Promise.resolve(obj);
    });
}

export default playlist;
