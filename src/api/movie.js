import request from '@/utils/request.js'

// 生活首页热映
export function getHitMovies (data) {
  return request.post('/film/film/hitmovies', data)
}

// 获取影片资料(列表) type:1执映2待映
export function getfilmlist (data) {
  return request.post('/film/film/getfilmlist', data)
}

/**
 * 设置影片想看
 * @param {string} film_id 电影ID
 */
export function setviewwatch (data) {
  return request.post('/film/film/setviewwatch', data)
}

/**
 * 获取影片详情
 * @param {string} film_id 电影ID
 */
export function getfilminfo (data) {
  return request.post('/film/film/getfilminfo', data)
}

/**
 * 根据城市获取影院信息
 * @param {string} city_id 城市ID
 * @param {string} lng 经度
 * @param {string} lat 纬度
 * @param {string} county_id 区县ID
 * @param {string} hall_no 影厅编码
 * @param {string} sort_type 1按距离最低排序2按价格最低排序
 * @param {string} film_no 影片编码
 */
export function selectCinema (data) {
  return request.post('/film/film/selectCinema', data)
}

/**
 * 根据影片ID获取全部演员信息
 * @param {string} film_id 电影ID
 */
export function getActor (data) {
  return request.post('/film/film/getActor', data)
}

// 获取附近影院
export function getcinemanearby (data) {
  return request.post('/film/film/getcinemanearby', data)
}

/**
 * 根据城市获取影院信息
 * @param {string} city_id 城市ID
 * @param {string} lng 经度
 * @param {string} lat 纬度
 * @param {number} county_id 区县ID（非必选）
 * @param {number} page_index 页码
 * @param {number} page_size 每页显示的条数
 * @param {string} hall_no 影厅编码（非必选）
 * @param {number} sort_type 1按距离最低排序2按价格最低排序（非必选）
 */
export function getcinemainfobycity (data) {
  return request.post('/film/film/getcinemainfobycity', data)
}

/**
 * 获取所有的影厅
 * @param {number} type 类型1城市ID 2县区ID
 * @param {string} id id
 */
export function gethall (data) {
  return request.post('/film/film/gethall', data)
}

/**
 * 根据城市获取所有县影院数量
 * @param {string} city_id 城市ID
 * @param {string} county_id 区域ID
 * @param {string} search 搜索
 */
export function getcinematotalbycity (data) {
  return request.post('/film/film/getcinematotalbycity', data)
}

/**
 * 根据城市获取所有县影院数量
 * @param {string} cinema_id 影院ID
 */
export function getCinemadetail (data) {
  return request.post('/film/film/cinemadetail', data)
}

/**
 * 影院详情（排期接口）
 * @param {string} cinema_id 影院ID
 * @param {string} film_no 影片编码
 */
export function getCinemaschedu (data) {
  return request.post('/film/film/cinemaschedu', data)
}

/**
 * 获取电影票订单列表
 * @param {string} uid 用户名ID
 * @param {string} type 类型1待取票2已取票3已取消 没传为全部
 */
export function getticklist (data) {
  return request.post('/film/film/getticklist', data)
}

/**
 * 获取电影票详情
 * @param {string} order_id 订单ID
 */
export function getfilmdetails (data) {
  return request.post('/film/film/getfilmdetails', data)
}

/**
 * 搜索电影或影院
 * @param
 */
export function getFilmCinemaSeach (data) {
  return request.post('/film/film/search', data)
}

/**
 * 搜索电影列表
 * @param
 */
export function getFilmSeachList (data) {
  return request.post('/film/film/getsearchfilminfo', data)
}

/**
 * 搜索影院列表
 * @param
 */
export function getCinemaSeachList (data) {
  return request.post('/film/film/getsearchcinemainfo', data)
}
