import axios from "../api";

// 获取用户歌单
function playlist(uid) {
    return axios.get("/user/playlist", {
        params: {
            uid
        }
    });
}
export default playlist;
