import axios from "../api";
import Axios from "axios";

// 获取歌曲详情
function detail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get("/song/detail", {
        params: {
          ids: id
        }
      })
      .then(response => {
        const element = response.songs[0];
        resolve({
          id: element.id,
          name: element.name,
          picUrl: element.al.picUrl,
          artists: element.ar.map(res => res.name).join(" / "),
          duration: element.dt,
          l: {
            br: element.l.br,
            size: element.l.size
          },
          m: {
            br: element.m.br,
            size: element.m.size
          },
          h: {
            br: element.h.br,
            size: element.h.size
          },
          mv: element.mv
        });
      })
      .catch(error => reject(error));
  });
}

// 获取音乐 url
function url(id) {
  return new Promise((resolve, reject) => {
    axios
      .get("/song/url", {
        params: {
          id
        }
      })
      .then(response => {
        const element = response.data[0];
        resolve({
          br: element.br,
          freeTrialInfo: element.freeTrialInfo,
          size: element.size,
          type: element.type,
          url: element.url
        });
      })
      .catch(error => reject(error));
  });
}

function play(id) {
  return new Promise((resolve, reject) => {
    Axios.all([detail(id), url(id)])
      .then(response => {
        resolve({
          ...response[0],
          ...response[1]
        });
      })
      .catch(error => reject(error));
  });
}

export default play;
