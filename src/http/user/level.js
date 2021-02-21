import axios from "../api";

// 获取用户等级信息
function level() {
    return axios.get("/user/level");
}
export default level;
