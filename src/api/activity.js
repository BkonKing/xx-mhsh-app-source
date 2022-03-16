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

// 用户活动 总剩余 积分
export function surplusIntegralActivity (params) {
  return request({
    url: '/activity/activity/surplus_integral_activity',
    method: 'post'
  })
}

// 根据用户ID获取用户参加的活动
export function getUserActivity (data) {
  return request({
    url: '/activity/activity/getUserActivity',
    method: 'post',
    data,
    headers: {
      noToast: true
    }
  })
}

// 根据项目ID 工作人员 是否有该项目 积分活动 权限
export function getActivityPermission (data) {
  return request({
    url: '/activity/activity/integral_activity_jurisdiction',
    method: 'post',
    data,
    headers: {
      noToast: true
    }
  })
}

// 通过轮播图进入活动
export function enterBannerActivity (data) {
  return request({
    url: '/activity/activity/enterBannerActivity',
    method: 'post',
    data
  })
}

// 获取专题活动
export function getSpecial (data) {
  return request({
    url: '/life/goods/thematic_info',
    method: 'post',
    data
  })
}
