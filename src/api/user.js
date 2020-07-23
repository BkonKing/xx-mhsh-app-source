import request from '../utils/request.js'

export function login (data) {
  return request.post('/ulogin/login/pwdLogin', data)
}
