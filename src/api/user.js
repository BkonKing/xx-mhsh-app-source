import request from '../utils/request.js'

/* 手机验证码登录 */
export function yzmLogin (data) {
  return request.post('/ulogin/login/yzmLogin', data)
}

/* 发送手机验证码 */
export function verifCode (data) {
  return request.post('/ulogin/login/verifCode', data, {
    headers: {
      completeData: true
    }
  })
}

/* 手机密码登录 */
export function pwdLogin (data) {
  return request.post('/ulogin/login/pwdLogin', data)
}

/* 退出登录 */
export function outLogin () {
  return request.post('/ulogin/login/outLogin')
}

/* 刷新登录 */
export function refreshToken () {
  return request({
    url: '/authorization/token/getToken',
    method: 'post',
    headers: {
      Authorization: api.getPrefs({
        sync: true,
        key: 'refresh_token'
      })
    }
  })
}

/* 账户信息 */
export function getMyAccount () {
  return request.get('/my/account/myAccount')
}

/* 图片上传 */
export function uImages (data) {
  return request.post('/upload/uploads/uImages', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/* 统计下载次数信息 */
export function sendSaveDownload (data) {
  return request.post('/download/install/save_download', data)
}
