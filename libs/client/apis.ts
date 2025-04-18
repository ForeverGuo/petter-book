import request from "./request"

export const login = (data: object) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

export const userList = () => {
  return request({
    method: 'GET',
    url: '/users'
  })
}
