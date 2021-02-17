import axios from "../api";

// 二维码key生成接口
function key() {
    return axios
        .get("/login/qr/key", {
            params: {
                timerstamp: new Date().getTime()
            }
        })
        .then(res => {
            return Promise.resolve(res.data.unikey);
        });
}
// 二维码生成接口
function create(key) {
    return axios
        .get("/login/qr/create", {
            params: {
                key,
                qrimg: true,
                timerstamp: new Date().getTime()
            }
        })
        .then(res => {
            return Promise.resolve(res.data.qrimg);
        });
}
// 二维码检测扫码状态接口
function check(key) {
    return axios
        .get("/login/qr/check", {
            params: {
                key,
                timerstamp: new Date().getTime()
            }
        })
        .then(res => {
            let data = {
                code: 1,
                cookie: ""
            };
            switch (res.code) {
                case 800: // 二维码过期
                    data.code = 0;
                    break;
                case 801: // 等待扫码
                    data.code = 1;
                    break;
                case 802: // 待确认
                    data.code = 2;
                    break;
                case 803: // 授权成功
                    data.code = 3;
                    data.cookie = res.cookie;
                    break;
            }
            return Promise.resolve(data);
        });
}

export default {
    key,
    create,
    check
};
