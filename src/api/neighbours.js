import request from '@/utils/request.js'

// 最新数据列表
export function getNewestList (params) {
  return request.get('/neighbours/newest/getArticleList', { params })
}

// 话题小组列表
export function getPostBarCategoryList (params) {
  return request.get('/neighbours/postbar/getPostBarCategoryList', { params })
}

// 小组贴子列表
export function getPostBarList (params) {
  return request.get('/neighbours/postbar/getPostBarList', { params })
}

// 新增话题贴吧
export function addPostBar (data) {
  return request.post('/neighbours/postbar/addPostBar', data)
}

// 新增话题贴吧
export function getPostBarInfo (params) {
  return request.get('/neighbours/postbar/getPostBarInfo', { params })
}

// 活动列表
export function getActivityList (params) {
  return request.get('/neighbours/activity/getActivityList', { params })
}

// 活动详情接口
export function getActivityInfo (params) {
  return request.get('/neighbours/activity/getActivityInfo', { params })
}

// 加入活动
export function joinActivity (data) {
  return request.post('/neighbours/activity/joinActivity', data)
}

// 资讯列表
export function getArticleList (params) {
  return request.get('/neighbours/article/getArticleList', { params })
}

// 资讯详情
export function getArticleInfo (params) {
  return request.get('/neighbours/article/getArticleInfo', { params })
}

// 文章/评论点赞
export function thumbsUp (data) {
  return request.post('/neighbours/newest/thumbs_up', data)
}

// 文章/评论点赞
export function addComment (data) {
  return request.post('/neighbours/comment/addComment', data)
}
