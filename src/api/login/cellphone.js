import axios from "../api";

// 手机登录
function cellphone(phone, password, countrycode = "86") {
    return axios
        .post("/login/cellphone", {
            phone,
            password,
            countrycode
        })
        .then(res => {
            let data = {
                code: 1,
                cookie: "",
                nickname: ""
            };
            switch (res.code) {
                case 502: // 密码错误
                    data.code = 0;
                    break;
                case 200: // 登录成功
                    data.code = 1;
                    data.cookie = res.cookie;
                    data.nickname = res.profile.nickname;
                    break;
                case 250: // 登录失败
                    data.code = 2;
                    break;
                case 509: // 密码错误超过限制
                    data.code = 3;
                    break;
            }
            return Promise.resolve(data);
        });
}

export default cellphone;
