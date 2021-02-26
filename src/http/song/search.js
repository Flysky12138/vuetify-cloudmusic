import axios from "../api";
import songTime from "common/songTime";

// 搜索
function search(keywords, offset = 0) {
    return axios
        .get("/search", {
            params: {
                keywords,
                offset,
                limit: 32,
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
                    const arr = {
                        id: element.id,
                        name: element.name,
                        duration: songTime(element.duration),
                        artists: element.artists.map(res => res.name).join("/"),
                        album: "《" + element.album.name + "》"
                    };
                    obj.songs.push(arr);
                });
            }
            return Promise.resolve(obj);
        });
}
export default search;
