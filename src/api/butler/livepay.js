import request from '@/utils/request.js'

// 获取房屋数据
export function getHouseList (data) {
  return request.post('/live/new_live/house_list', data)
}
/**
 * 获取缴费列表数据
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} project_id 项目ID
 */
export function getLifePayList (data) {
  return request.post('/live/new_live/lifepay_list', data)
}
/**
 * 获取选择缴费列表
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} project_id 项目ID
 */
export function getChoicePayList (data) {
  return request.post('/live/new_live/choice_lifepay_list', data)
}
/**
 * 其他费用 选择缴费订单 缴费操作
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} money 付款金额 单位/元
 * @param {number} genre_type 类型（1水；2电；3燃气；4其他）
 * @param {string} order_ids 要缴费的 订单用逗号隔开
 */
export function createPay (data) {
  return request.post('/live/new_live/live_order_ids_pay', data, {
    headers: {
      noToast: true
    }
  })
}

/**
 * 获取费用详情接口
 * @param {number} order_id 生活缴费订单ID
 */
export function getFeeDetails (data) {
  return request.post('/live/new_live/fee_details', data)
}

/**
 * 充值和缴费页面信息
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} genre_type 类型（1水；2电；3燃气；4其他）
 */
export function getRecharge (data) {
  return request.post('/live/new_live/recharge_json', data)
}

/**
 * 获取账单列表
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} project_id 项目ID
 * @param {number} genre_type 类型（1水；2电；3燃气；4其他）
 */
export function getGenreBillList (data) {
  return request.post('/live/new_live/genre_bill_list', data)
}

/**
 * 房屋充值缴费操作
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} pay_type 支付方式 1微信 2支付宝 4银行
 * @param {number} genre_type 类型（1水；2电；3燃气；4其他）
 * @param {number} money 付款金额 单位/元
 */
export function launchRechargePay (data) {
  return request.post('/live/new_live/live_recharge_pay', data)
}

/**
 * 充缴记录年月下拉数组
 * @param {number} expenses_house_id 缴费房屋ID
 */
export function getMonthList (data) {
  return request.post('/live/new_live/month_list', data)
}

/**
 * 充缴记录明细类型
 * @param {number} expenses_house_id 缴费房屋ID
 */
export function getGenreList (data) {
  return request.post('/live/new_live/genre_list', data)
}

/**
 * 充缴记录列表
 * @param {number} expenses_house_id 缴费房屋ID
 * @param {number} genre_type 类型（1水；2电；3燃气；4其他）（除缴费需要）
 * @param {number} genre_id 类别ID（缴费需要）
 * @param {number} bill_type 账单类型（1充值；2缴费；）
 * @param {number} month_name 年月筛选 （全部传空）
 * @param {number} min_money 金额范围 最低
 * @param {number} max_money 金额范围 最高
 */
export function getPayLogList (data) {
  return request.post('/live/new_live/pay_log_list', data)
}

/**
 * 充缴记录列表
 * @param {number} pay_log_id 记录ID
 */
export function getPayLogDetails (data) {
  return request.post('/live/new_live/pay_log_details', data)
}
