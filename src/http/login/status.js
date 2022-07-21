import axios from '../api'

// 返回登录状态等信息
async function status() {
  try {
    const profile = await axios.get('/login/status').then(response => response.data.profile)
    return profile
      ? await axios(`/user/detail?uid=${profile.userId}`).then(response => ({
          uid: response.profile.userId,
          level: response.level,
          avatarUrl: response.profile.avatarUrl
        }))
      : {
          uid: -1,
          level: 0,
          avatarUrl: ''
        }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default status
