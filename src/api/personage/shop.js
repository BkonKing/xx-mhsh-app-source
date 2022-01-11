import request from '@/utils/request.js'

// 商铺 页面数据
export function getShopInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_info',
    method: 'post',
    data
  })
}

// 商铺 店铺信息数据 接口
export function getShopInformation (data) {
  return request({
    url: '/shops/shops_coupon/shops_see_info',
    method: 'post',
    data
  })
}

// 商铺 信息保存 接口
export function saveShopInformation (data) {
  return request({
    url: '/shops/shops_coupon/shops_edit',
    method: 'post',
    data
  })
}

// 商铺优惠券 列表 接口
export function getShopCouponList (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_list',
    method: 'post',
    data
  })
}

// 更新商铺优惠券 列表 单条数据
export function updateCouponInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_one',
    method: 'post',
    data
  })
}

// 发布商家券 接口
export function publishCoupon (data) {
  return request({
    url: '/shops/shops_coupon/open_shops_coupon',
    method: 'post',
    data
  })
}

// 结束商家券 接口
export function finishCoupon (data) {
  return request({
    url: '/shops/shops_coupon/close_shops_coupon',
    method: 'post',
    data
  })
}

// 删除商家券 接口
export function deleteCoupon (data) {
  return request({
    url: '/shops/shops_coupon/del_shops_coupon',
    method: 'post',
    data
  })
}

// 商铺优惠券使用记录 列表数据 接口
export function getCouponRecords (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_usage',
    method: 'post',
    data
  })
}

// 商铺 扫码 优惠券详情 接口
export function getCouponScan (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_scan',
    method: 'post',
    data
  })
}

// 核销商铺优惠券 接口
export function verificationCoupon (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_operation',
    method: 'post',
    data
  })
}

// 商铺券 可领取列表 接口
export function getCouponReceiveList (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_receive_list',
    method: 'post',
    data
  })
}

// 领取 商铺 优惠券 接口
export function receiveCoupon (data) {
  return request({
    url: '/shops/shops_coupon/receive_shops_coupon',
    method: 'post',
    data
  })
}

// 优惠券页面数据 接口
export function getShopCouponInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_info',
    method: 'post',
    data
  })
}

// 商铺优惠券 新增修改 接口
export function saveCouponInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_edit',
    method: 'post',
    data
  })
}

// 商铺券 banner条 接口
export function getShopCouponBanner (data) {
  return request({
    url: '/shops/shops_coupon/shops_coupon_banner_data',
    method: 'post',
    data
  })
}