import request from '@/utils/request.js'

// 生活首页
export function getLifeInfo (params) {
  return request.post('/life/goods/life_home', params)
}

// 限时闪购
export function getFlashNav (params) {
  return request.post('/life/goods/flash_json', params)
}
export function getFlashGoods (params) {
  return request.post('/life/goods/flash_goods_json', params)
}

// 特卖
export function getSaleNav (params) {
  return request.post('/life/goods/bargain_json', params)
}
export function getSaleGoods (params) {
  return request.post('/life/goods/bargain_goods_json', params)
}

// 专区
export function getAreaGoods (params) {
  return request.post('/life/goods/special_goods_json', params)
}

//全部商品
export function getClassifyGoods (params) {
  return request.post('/life/goods/goods_list', params)
}

//商品详情
export function getGoodsDetail (params) {
  return request.post('/life/goods/goods_info', params)
}

//购物车
export function getCart (params) {
  return request.post('/life/order/shopping_pay', params)
}


//收货地址
export function getAddress (params) {
  return request.post('/my/address/getAddressList', params)
}
export function getAddressInfo (params) {
  return request.post('/my/address/getAddressInfo', params)
}
export function addAddress (params) {
  return request.post('/my/address/addAddress', params)
}
export function updateAddress (params) {
  return request.post('/my/address/updateAddress', params)
}
export function deleteAddress (params) {
  return request.post('/my/address/deleteAddress', params)
}

//优惠券
export function getCoupon (params) {
  return request.post('/life/goods/goods_list', params)
}

//结算
export function getFlashInfo (params) {
  return request.post('/life/order/ollage_pay_json', params)
}
export function flashCreate (params) {
  return request.post('/life/order/create_ollage_order', params)
}
export function getOrdinaryInfo (params) {
  return request.post('/life/order/shopping_pay', params)
}
export function ordinaryCreate (params) {
  return request.post('/life/order/create_order', params)
}
export function getExchangeInfo (params) {
  return request.post('/life/order/credits_pay_json', params)
}
export function exchangeCreate (params) {
  return request.post('/life/order/create_credits_order', params)
}


//订单列表
export function getOrderList (params) {
  return request.post('/life/my_order/my_order_list', params)
}
//订单详情
export function getOrderDetail (params) {
  return request.post('/life/my_order/order_project_info', params)
}
//申请退款/退货退款
export function getApplyRefund (params) {
  return request.post('/life/my_order/logistice_refund_sale', params)
}

//物流信息
export function getLogisticsInfo (params) {
  return request.post('/life/my_order/order_project_logistice_list', params)
}