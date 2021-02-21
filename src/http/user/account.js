import axios from "../api";

// 获取账号信息
function account() {
    return axios.get("/user/account");
}
export default account;
