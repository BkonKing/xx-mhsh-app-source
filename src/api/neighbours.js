import request from '@/utils/request.js'

// 邻里最新数据列表
export function getNewestList (data) {
  return request.get('/neighbours/newest/getArticleList', data)
}

// 邻里话题小组列表
export function getPostBarCategoryList (data) {
  return request.get('/neighbours/postbar/getPostBarCategoryList', data)
}

// 邻里活动列表
export function getActivityList (data) {
  return request.get('/neighbours/activity/getActivityList', data)
}

// 活动详情接口
export function getActivityInfo (data) {
  return request.get('/neighbours/activity/getActivityInfo', data)
}

// 加入活动
export function joinActivity (data) {
  return request.post('/neighbours/activity/joinActivity', data)
}

// 邻里资讯列表
export function getArticleList (data) {
  return request.get('/neighbours/article/getArticleList', data)
}

// 资讯详情
export function getArticleInfo (data) {
  return request.get('/neighbours/article/getArticleInfo', data)
}
