import axios from "../api";

// 获取账号信息
function account() {
    return axios.get("/user/account").then(res => {
        return Promise.resolve(res);
    });
}
export default account;
