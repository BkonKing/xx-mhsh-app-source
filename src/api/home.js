import request from '@/utils/request.js'

// 首页banner
export function getBannerIndex () {
  return request.get('/index/banner/banner_index')
}

// 所有应用列表
export function getAllApp () {
  return request.get('/index/apps/allApp')
}

// 我的应用列表
export function getMyApp (params) {
  return request.get('/index/apps/allMyApp', { params })
}
// 保存我的应用
export function saveMyApp (data) {
  return request.post('/index/apps/saveMyApp', data)
}
