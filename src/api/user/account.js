import axios from "../api";

// 获取账号信息
function account() {
    return axios.get("/user/account").then(res => {
        let data = {
            account: {
                id: res.account.id,
                createTime: res.account.createTime,
                vipType: res.account.vipType
            },
            profile: {
                avatarUrl: res.profile.avatarUrl,
                backgroundUrl: res.profile.backgroundUrl,
                birthday: res.profile.birthday,
                city: res.profile.city,
                lastLoginIP: res.profile.lastLoginIP,
                lastLoginTime: res.profile.lastLoginTime,
                nickname: res.profile.nickname,
                signature: res.profile.signature
            }
        };
        return Promise.resolve(data);
    });
}
export default account;
