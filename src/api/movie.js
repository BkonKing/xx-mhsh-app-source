import request from '@/utils/request.js'

// 生活首页热映
export function getHitMovies (data) {
  return request.post('/film/film/hitmovies', data)
}

// 观影首页轮播图
export function getCarouselMap (data) {
  return request.post('/film/film/getCarouselMap', data)
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
 * 获取所有的影厅
 * @param {string} film_no 影片编码
 * @param {string} city_id 城市ID
 */
export function getSelectCinemaDate (data) {
  return request.post('/film/film/selectcinemadate', data)
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
 * 获取影院位置
 * @param {string} cinema_id 影院ID
 */
export function getCinemaPosition (data) {
  return request.post('/film/film/getcinemaposition', data)
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
 * 获取实时座位图
 * @param {string} cinema_id 影院ID
 * @param {string} feature_appno 排期编码
 */
export function getplanseat (data) {
  return request.post('/film/film/getplanseat', data)
}

/**
 * 释放座位
 * @param {string} order_id 订单ID
 */
export function unlockorder (data) {
  return request.post('/film/film/unlockorder', data)
}

/**
 * 锁座
 * @param {string} cinema_id 影院ID
 * @param {string} feature_appno 排期编码
 * @param {string} seat_no 座位编码，多个参数用英文半角逗号拼接
 * @param {string} ticket_price 票价，多个参数用英文半角逗号拼接，顺序要与座位编码对应
 * @param {number} uid 用户ID
 * @param {number} film_no 影片编码
 * @param {number} seat_name 座位名称
 */
export function lockseat (data) {
  return request.post('/film/film/lockseat', data, {
    headers: {
      noToast: true
    }
  })
}

/**
 * 获取用户的优惠券
 * @param {number} uid 用户ID
 */
export function getUserCoupon (data) {
  return request.post('/film/film/getusercoupon', data)
}

/**
 * 电影票计算支付价格
 * @param {number} order_id 订单ID
 * @param {number} credits 幸福币
 * @param {number} coupon_id 优惠ID 有使用的话要传递过来
 * @param {number} type 1使用幸福币2不使用
 */
export function calculatePrice (data) {
  return request.post('/film/film/calculatePrice', data)
}

/**
 * 电影票支付接口
 * @param {number} order_id 订单ID
 * @param {number} pay_price 支付价格
 * @param {number} pay_type 支付方式 1微信2支付宝4银行卡支付
 */
export function payOrder (data) {
  return request.post('/film/film/pay_order', data)
}

/**
 * 电影票幸福币支付接口
 * @param {number} order_id 订单ID
 * @param {number} credits 幸福币
 */
export function payCredits (data) {
  return request.post('/film/film/payCredits', data)
}

/**
 * 影片场次列表
 * @param {string} cinema_id 影院ID
 * @param {string} film_no 影片编码
 * @param {string} feature_appno 排期编码
 * @param {string} date 排期时间
 */
export function getSessions (data) {
  return request.post('/film/film/getSessions', data)
}

/**
 * 获取排期的价格
 * @param {string} cinema_id 影院ID
 * @param {string} feature_appno 排期编码
 */
export function getfilmprice (data) {
  return request.post('/film/film/getfilmprice', data)
}

/**
 * 获取确定订单信息
 * @param {string} order_id 订单ID
 */
export function getConfirmOrder (data) {
  return request.post('/film/film/confirmorder', data)
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
 * @param {string} id 订单ID
 */
export function getfilmdetails (data) {
  return request.post('/film/film/getfilmdetails', data)
}

/**
 * 搜索电影或影院
 */
export function getFilmCinemaSeach (data) {
  return request.post('/film/film/search', data)
}

/**
 * 搜索电影列表
 */
export function getFilmSeachList (data) {
  return request.post('/film/film/getsearchfilminfo', data)
}

/**
 * 搜索影院列表
 */
export function getCinemaSeachList (data) {
  return request.post('/film/film/getsearchcinemainfo', data)
}

/**
 * 获取客服电话
 */
export function getCustomerPhone (data) {
  return request.post('/film/film/getcustomerphone', data)
}

/**
 * 取消支付
 * @param order_id 订单ID
 */
export function cancelPay (data) {
  return request.post('/film/film/cancelPay', data)
}

/**
 * 取消支付
 * @param order_id 订单ID
 */
export function updateOrderStatus (data) {
  return request.post('/film/film/updateOrderStatus', data)
}
