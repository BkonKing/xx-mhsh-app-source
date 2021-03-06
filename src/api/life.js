import request from '@/utils/request.js'

// 生活首页
export function getLifeInfo (params) {
  return request.post('/life/goods/life_home', params)
}
export function getBanner (params) {
  return request.post('/index/banner/banner_life', params)
}
export function getMenu (params) {
  return request.post('/life/goods/life_home_menu', params)
}

// 限时闪购
export function getFlashNav (params) {
  return request.post('/life/goods/flash_json', params)
}
export function getFlashGoods (params) {
  return request.post('/life/goods/flash_goods_json', params)
}
export function getFlashGoodsOne (params) {
  return request.post('/life/goods/flash_goods_info', params)
}
export function remindSend (params) {
  return request.post('/life/goods/messages_json', params)
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

// 商品类型专区
export function getAreaTypesGoods (params) {
  return request.post('/life/goods/category_goods_list', params)
}

// 全部商品
export function getClassifyGoods (params) {
  return request.post('/life/goods/goods_list', params)
}

// 商品详情
export function getGoodsDetail (params) {
  return request.post('/life/goods/goods_info', params)
}

// 搜索
export function getHotWords (params) {
  return request.post('/index/hot/hot_search', params)
}
export function getSearchGoods (params) {
  return request.post('/life/goods/search_goods', params)
}
export function getSearchApp (params) {
  return request.post('/index/search/search_app', params)
}
export function getSearchPostbar (params) {
  return request.post('/index/search/search_postbar', params)
}

// 购物车
export function getCart (params) {
  return request.post('/life/order/shopping_pay', params)
}

// 收货地址
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

// 优惠券
export function getCoupon (params) {
  return request.post('/life/my_order/coupon_list', params)
}
// 优惠券
export function getSelectCoupon (params) {
  return request.post('/life/order/common_coupon_choice', params)
}

// 结算
export function getFlashInfo (params) {
  return request.post('/life/order/ollage_pay_json', params)
}
export function flashCreate (data) {
  return request({
    url: '/life/order/create_ollage_order',
    method: 'post',
    data,
    timeout: 0
  })
}
export function getOrdinaryInfo (params) {
  return request.post('/life/order/shopping_pay', params)
}
export function ordinaryCreate (data) {
  return request({
    url: '/life/order/create_order',
    method: 'post',
    data,
    timeout: 0
  })
}
export function getExchangeInfo (params) {
  return request.post('/life/order/credits_pay_json', params)
}
export function exchangeCreate (data) {
  return request({
    url: '/life/order/create_credits_order',
    method: 'post',
    data,
    timeout: 0
  })
}
export function payOrderUp (params) {
  return request.post('/life/order/pay_order', params)
}

// 订单列表
export function getOrderList (params) {
  return request.post('/life/my_order/my_order_list', params)
}
export function getOrderOne (params) {
  return request.post('/life/my_order/my_order_info', params)
}
// 订单详情
export function getOrderDetail (params) {
  return request.post('/life/my_order/order_project_info', params)
}
// 订单详情-幸福币
export function getCoinOrderDetail (params) {
  return request.post('/life/my_order/order_info', params)
}
// 订单详情(未付款修改收货地址)
export function editOrderAddress (params) {
  return request.post('/life/order/up_address_order', params)
}
// 闪购(拼单)订单超时
export function collageOver (params) {
  return request.post('/life/my_order/one_ollage_over', params)
}
// 申请退款/退货退款
export function getApplyRefund (params) {
  return request.post('/life/my_order/logistice_refund_sale', params)
}
// 申请退款/退货退款(提交)
export function refundSubmit (params) {
  return request.post('/life/my_order/refund_askfor', params)
}
export function returnRefundSubmit (params) {
  return request.post('/life/my_order/returnrefund_askfor', params)
}
// 退款/退货退款详情
export function getRefundInfo (params) {
  return request.post('/life/my_order/refund_info', params)
}
export function getReturnRefundInfo (params) {
  return request.post('/life/my_order/returnfund_info', params)
}
// 取消订单（未支付）
export function cancelNoPayOrder (data) {
  return request({
    url: '/life/my_order/cancelOrderProject',
    method: 'post',
    data,
    timeout: 0
  })
}
// 取消订单（已支付）
export function cancelPayOrder (data) {
  return request({
    url: '/life/my_order/refundOrderProject',
    method: 'post',
    data,
    timeout: 0
  })
}
// 取消退款申请
export function cancelRefundApply (params) {
  return request.post('/life/my_order/cancelRefundOrderProject', params)
}
// 取消退款申请
export function cancelRefundApply2 (params) {
  return request.post('/life/my_order/cancelRefund', params)
}
// 取消退款退货申请
export function cancelRefundReturnApply (params) {
  return request.post('/life/my_order/declineReturnfund', params)
}
// 取消换货申请
export function cancelBarterApply (params) {
  return request.post('/life/my_order/cancelbarterBarter', params)
}

// 售后(售后选择)
export function getApplyType (params) {
  return request.post('/life/my_order/sale_order_type', params)
}
// 申请换货
export function getApplyBarter (params) {
  return request.post('/life/my_order/logistice_barter_sale', params)
}
// 申请换货(提交)
export function barterSubmit (params) {
  return request.post('/life/my_order/barter_askfor', params)
}
// 换货详情
export function getBarterInfo (params) {
  return request.post('/life/my_order/barter_info', params)
}

// 填写物流
export function getWriteInfo (params) {
  return request.post('/life/my_order/logistice_info', params)
}
export function logisticsSubmit (params) {
  return request.post('/life/my_order/logistice_operation', params)
}

// 物流信息
export function getLogisticsInfo (params) {
  return request.post('/life/my_order/order_project_logistice_list', params)
}
export function getLogisticsOne (params) {
  return request.post('/life/my_order/get_logistice_info', params)
}

// 修改订单自提点
export function updatePickupAddress (data) {
  return request.post('/life/my_order/order_project_pickup_address_up', data)
}

// 订单核销
export function sureVerification (params) {
  return request.post('/life/order/projectSmztScanCode', params)
}

// 我的银行卡
export function getMyCard (params) {
  return request.post('/my/fupay/getBankList', params)
}

// 富友协议下单支付
export function fuPay (params) {
  return request.post('/my/fupay/payOrder', params)
}

// 再次获取验证码
export function getCodeAgain (params) {
  return request.post('/my/fupay/fupay_code', params)
}

// 下完订单是否弹出分享
export function getIsShare (params) {
  return request.post('/my/reward/isShare', params)
}

// 分享成功触发发放幸福币
export function giveCredits (params) {
  return request.post('/my/reward/share', params)
}
