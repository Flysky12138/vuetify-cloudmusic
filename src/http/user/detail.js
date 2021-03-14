import axios from "../api";
import time from "common/time";
import province from "common/province-city-china/province.json";
import city from "common/province-city-china/city.json";

// 获取用户详情
function detail(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get("/user/detail", {
        params: {
          uid
        }
      })
      .then(response => {
        const p = province.find(res => res.code == response.profile.province);
        const c = city.find(res => res.code == response.profile.city);
        resolve({
          level: response.level,
          listenSongs: response.listenSongs,
          createTime: time.date(response.createTime),
          createDays: response.createDays,
          profile: {
            vipType: response.profile.vipType,
            birthday: time.date(response.profile.birthday).substring(0, 10),
            gender: response.profile.gender,
            province: p ? p.name : "-",
            city: c ? c.name : "-",
            backgroundUrl: response.profile.backgroundUrl,
            nickname: response.profile.nickname,
            avatarUrl: response.profile.avatarUrl,
            signature: response.profile.signature,
            followeds: response.profile.followeds,
            follows: response.profile.follows
          }
        });
      })
      .catch(error => reject(error));
  });
}

export default detail;
