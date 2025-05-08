import request from "./request"

/**
 * @description 登录
 * @author grantguo
 * @date 2025-05-06 16:56:56
*/
export const login = (data: object) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

/**
 * @description 获取用户列表
 * @author grantguo
 * @date 2025-05-06 16:56:56
*/
export const userList = () => {
  return request({
    method: 'GET',
    url: '/users'
  })
}

/**
 * @description 获取book列表
 * @author grantguo
 * @date 2025-05-06 17:00:31
*/
export const bookList = () => {
  return request({
    method: 'GET',
    url: '/books'
  })
}
