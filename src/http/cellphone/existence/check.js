import axios from "../../api";

// 检测手机号码是否已注册
function check(phone, countrycode = "86") {
    return axios
        .get("/cellphone/existence/check", {
            params: {
                phone,
                countrycode
            }
        })
        .then(response => {
            return Promise.resolve(response.hasPassword);
        });
}

export default check;
