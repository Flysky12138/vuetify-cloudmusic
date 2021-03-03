import axios from "../api";
import date from "common/date";

// 获取歌单详情
function detail(id) {
  return axios
    .get("/playlist/detail", {
      params: {
        id
      }
    })
    .then(response => {
      return Promise.resolve({
        coverImgUrl: response.playlist.coverImgUrl,
        createTime: date(response.playlist.createTime),
        description: response.playlist.description,
        name: response.playlist.name,
        playCount: response.playlist.playCount,
        shareCount: response.playlist.shareCount,
        subscribedCount: response.playlist.subscribedCount,
        tags: response.playlist.tags,
        trackIds: response.playlist.trackIds.map(res => res.id),
        userId: response.playlist.userId,
        avatarUrl: response.playlist.creator.avatarUrl,
        nickname: response.playlist.creator.nickname
      });
    });
}

export default detail;
