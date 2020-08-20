import request from '@/utils/request.js'

// 首页banner
export function getBannerIndex () {
  return request.get('/index/banner/banner_index')
}

// 获取9.9特卖区
export function getBargainGoods (data) {
  return request.get('/life/goods/life_bargain_goods', data)
}

// 获取闪购专区
export function getOllageGoods (data) {
  return request.post('/life/goods/life_ollage_goods', data)
}

// 获取幸福币专区
export function getCreditsGoodsList (data) {
  return request.post('/life/goods/credits_goods_list', data)
}

// 所有应用列表
export function getAllApp () {
  return request.get('/index/apps/allApp')
}

// 我的应用列表
export function getMyApp (params) {
  return request.get('/index/apps/allMyApp', {
    params
  })
}
// 保存我的应用
export function saveMyApp (data) {
  return request.post('/index/apps/saveMyApp', data)
}
