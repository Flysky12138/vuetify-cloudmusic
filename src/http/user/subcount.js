import axios from "../api";

// 获取用户信息 , 歌单，收藏，mv, dj 数量
function subcount() {
    return axios.get("/user/subcount");
}
export default subcount;
