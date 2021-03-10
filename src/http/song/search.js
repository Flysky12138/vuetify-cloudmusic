import axios from "../api";
import songTime from "common/songTime";

// 搜索
function search(keywords, offset = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get("/search", {
        params: {
          keywords,
          offset,
          limit: 36,
          type: 1
        }
      })
      .then(response => {
        let obj = {
          hasMore: false,
          songCount: response.result.songCount,
          songs: []
        };
        if (obj.songCount !== 0) {
          obj.hasMore = response.result.hasMore;
          response.result.songs.forEach(element => {
            obj.songs.push({
              id: element.id,
              name: element.name,
              duration: songTime(element.duration),
              artists: element.artists.map(res => res.name).join(" / "),
              album: "《" + element.album.name + "》"
            });
          });
        }
        resolve(obj);
      })
      .catch(error => reject(error));
  });
}

export default search;
