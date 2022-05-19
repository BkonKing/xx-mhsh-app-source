import request from '@/utils/request.js'

// 奖品 扫码 核销详情 接口
export function getAwardScan (data) {
  return request({
    url: '/award/award/awardScan',
    method: 'post',
    data
  })
}

// 核销 奖品 接口
export function awardOperation (data) {
  return request({
    url: '/award/award/awardOperation',
    method: 'post',
    data
  })
}
