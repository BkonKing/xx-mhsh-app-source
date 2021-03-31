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

// 积分活动 工作人员 扫码 详情
export function getActivityUserInfo (data) {
  return request({
    url: '/activity/activity/integral_activity_details',
    method: 'post',
    data
  })
}

// 工作人员 扫码 发放或核销接口
export function giveIntergral (data) {
  return request({
    url: '/activity/activity/integral_activity_ffhx',
    method: 'post',
    data
  })
}

// 判断积分活动是否开启
export function queryActive (data) {
  return request({
    url: '/activity/activity/queryActive',
    method: 'post',
    data,
    headers: {
      noToast: true
    }
  })
}
