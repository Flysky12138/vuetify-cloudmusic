import axios from 'axios'

const instance = axios.create({
  baseURL: JSON.parse(localStorage.getItem('_api')) || 'https://unblock-netease-music-api.vercel.app/',
  timeout: 10000
})

export default function(id) {
  return new Promise((resolve, reject) => {
    instance
      .get('/', {
        params: {
          id
        },
        withCredentials: false
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}
