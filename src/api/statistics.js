import request from '@/utils/request.js'

// 统计写入
export function setStatistics (data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_TJ_API + '/collect/ops',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 统计更新
export function updateStatistics (data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_TJ_API + '/upcollect/ops',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
