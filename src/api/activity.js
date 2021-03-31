import request from '../utils/request.js'

// 用户活动信息
export function integralActivity () {
  return request({
    url: '/activity/activity/integral_activity',
    method: 'post'
  })
}

// 账户信息 列表
export function integralActivityLog (data) {
  return request({
    url: '/activity/activity/integral_activity_log',
    method: 'post',
    data
  })
}
