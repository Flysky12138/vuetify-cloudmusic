import axios from "../api";

// 获取用户详情
function detail(uid) {
    return axios.get("/user/detail", {
        params: {
            uid
        }
    });
}
export default detail;
