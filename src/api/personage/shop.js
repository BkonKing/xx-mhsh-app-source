import request from '@/utils/request.js'

// 商铺 页面数据
export function getShopInfo () {
  return request({
    url: '/shops/shops_coupon/shops_info',
    method: 'post'
  })
}

// 商铺 店铺信息数据 接口
export function getShopInformation () {
  return request({
    url: '/shops/shops_coupon/shops_see_info',
    method: 'post'
  })
}

// 商铺 信息保存 接口
export function saveShopInformation () {
  return request({
    url: '/shops/shops_coupon/shops_edit',
    method: 'post'
  })
}

// 商铺优惠券 列表 接口
export function getShopCouponList () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_list',
    method: 'post'
  })
}

// 发布商家券 接口
export function publishCoupon () {
  return request({
    url: '/shops/shops_coupon/open_shops_coupon',
    method: 'post'
  })
}

// 结束商家券 接口
export function finishCoupon () {
  return request({
    url: '/shops/shops_coupon/close_shops_coupon',
    method: 'post'
  })
}

// 删除商家券 接口
export function deleteCoupon () {
  return request({
    url: '/shops/shops_coupon/del_shops_coupon',
    method: 'post'
  })
}

// 商铺优惠券使用记录 列表数据 接口
export function getCouponRecords () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_usage',
    method: 'post'
  })
}

// 商铺 扫码 优惠券详情 接口
export function getCouponScan () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_scan',
    method: 'post'
  })
}

// 核销商铺优惠券 接口
export function verificationCoupon () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_operation',
    method: 'post'
  })
}

// 商铺券 可领取列表 接口
export function getCouponReceiveList () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_receive_list',
    method: 'post'
  })
}

// 领取 商铺 优惠券 接口
export function receiveCoupon () {
  return request({
    url: '/shops/shops_coupon/receive_shops_coupon',
    method: 'post'
  })
}

// 优惠券页面数据 接口
export function getShopCouponInfo () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_info',
    method: 'post'
  })
}

// 商铺优惠券 新增修改 接口
export function saveCouponInfo () {
  return request({
    url: '/shops/shops_coupon/shops_coupon_edit',
    method: 'post'
  })
}

// import { getShopInfo } from '@/api/personage/shop'
