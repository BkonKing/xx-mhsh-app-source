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

// 商铺 店铺认证 数据 接口
export function getShopAttestationInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_attestation_info',
    method: 'post',
    data
  })
}

// 商铺 提交或修改 审核接口
export function saveAttestationInfo (data) {
  return request({
    url: '/shops/shops_coupon/shops_attestation_submit',
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

// 商铺员工 列表 接口
export function getStaffList (data) {
  return request({
    url: '/shops/shops_coupon/shops_clerk_list',
    method: 'post',
    data
  })
}

// 店铺员工 用户筛选接口
export function getUserOption (data) {
  return request({
    url: '/shops/shops_coupon/user_shops_clerk_screen',
    method: 'post',
    data
  })
}

// 添加修改 商家员工 接口
export function saveShopStaff (data) {
  return request({
    url: '/shops/shops_coupon/edit_shops_clerk',
    method: 'post',
    data
  })
}

// 删除 商家员工 接口
export function delShopStaff (data) {
  return request({
    url: '/shops/shops_coupon/del_shops_clerk',
    method: 'post',
    data
  })
}

// 是否扫码核销优惠券权限 接口
export function getScan (data) {
  return request({
    url: '/shops/shops_coupon/is_scan',
    method: 'post',
    data
  })
}

// 获取商家设置
export function getAgentSetting (data) {
  return request({
    url: '/cash/cash/getAgentSetting',
    method: 'post',
    data
  })
}

// 创建绑定银行卡的订单
export function createOrder (data) {
  return request({
    url: '/cash/cash/createOrder',
    method: 'post',
    data
  })
}

// 提现申请
export function applyCash (data) {
  return request({
    url: '/cash/cash/cashApply',
    method: 'post',
    data
  })
}

// 获取提现详情
export function getCashInfo (data) {
  return request({
    url: '/cash/cash/getCashInfo',
    method: 'post',
    data
  })
}

// 提现取消
export function cancelCash (data) {
  return request({
    url: '/cash/cash/cancelCash',
    method: 'post',
    data
  })
}
