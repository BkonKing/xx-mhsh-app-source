import request from '../utils/request.js'

/* 手机验证码登录 */
export function yzmLogin (data) {
  return request.post('/ulogin/login/yzmLogin', data)
}

/* 发送手机验证码 */
export function verifCode (data) {
  return request.post('/ulogin/login/verifCode', data)
}

/* 手机密码登录 */
export function pwdLogin (data) {
  return request.post('/ulogin/login/pwdLogin', data)
}

/* 退出登录 */
export function outLogin () {
  return request.post('/ulogin/login/outLogin')
}
