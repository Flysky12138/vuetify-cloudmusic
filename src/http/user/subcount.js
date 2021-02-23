import axios from "../api";

// 获取用户、歌单、收藏、MV、DJ的数量
function subcount() {
    return axios.get("/user/subcount");
}
export default subcount;
