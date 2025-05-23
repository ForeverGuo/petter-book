import axios from 'axios'
import { redirect } from 'next/navigation';

const instance = axios.create({
  baseURL: '/api',
  // timeout: 5000
});

// request拦截器
instance.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(response => {
    const res = response.data
    if (res.code) {
      switch (res.code) {
        case 200:
          break
        case 500:
          break
        case 403:
          redirect("/login")
          break
        default:
      }
    }
    return response.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default instance
