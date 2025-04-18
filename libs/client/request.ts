import Cookies from "js-cookie"
import axios from 'axios'
import { redirect } from 'next/navigation';

const instance = axios.create({
  baseURL: '/api',
  // timeout: 5000
});

// request拦截器
instance.interceptors.request.use(config => {
  console.log('request', config.headers["Token"])
  // if (config.headers['Token']) return config;
  // const token = Cookies.get("token");
  // if (token) {
  //   config.headers['Token'] = token
  // } else {
  //   redirect("/login")
  // }
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
