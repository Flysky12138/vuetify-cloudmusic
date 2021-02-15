import axios from "../../api";

// 检测手机号码是否已注册
function check(phone) {
    return axios.get("/cellphone/existence/check", {
        params: {
            phone
        }
    });
}

export default check;
