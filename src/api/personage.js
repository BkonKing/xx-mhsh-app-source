import request from '../utils/request.js'
import store from '../store'

/* 常见问题列表 */
export function getEqList (params) {
  return request.get('/my/server/getEqList', {
    params
  })
}

/* 意见反馈列表 */
export function getFeedbackList (params) {
  return request.get('/my/server/getFeedbackList', {
    params
  })
}

/* 添加意见反馈 */
export function addFeedback (data) {
  return request.post('/my/server/addFeedback', data)
}

/* 意见反馈详情 */
export function getFeedbackInfo (params) {
  return request.get('/my/server/getFeedbackInfo', {
    params
  })
}

/* 设置支付密码 */
export function setPayPassword (data) {
  return request.post('/my/password/setPayPassword', data)
}

/* 设置支付密码 */
export function yzPayPassword (data) {
  return request.post('/my/password/yzPayPassword', data)
}

/* 修改支付密码 */
export function updatePayPassword (data) {
  return request.post('/my/password/updatePayPassword', data)
}

/* 通过验证码重置支付密码 */
export function resetPayPassword (data) {
  return request.post('/my/password/resetPayPassword', data)
}

/* 通过验证码重置登录密码 */
export function resetPassword (data) {
  return request.post('/my/password/resetPassword', data)
}

/* 设置登录密码 */
export function setPassword (data) {
  return request.post('/my/password/setPassword', data)
}

/* 设置登录密码 */
export function updatePassword (data) {
  return request.post('/my/password/updatePassword', data)
}

/* 成员列表 */
export function getMemberList (params) {
  return request.get('/room/binding/memberList', {
    params
  })
}

/* 新增报备成员 */
export function addMember (data) {
  return request.post('/my/member/addMember', data)
}

/* 修改报备成员 */
export function updateMember (data) {
  return request.post('/my/member/updateMember', data)
}

/* 删除报备成员 */
export function deleteMember (data) {
  return request.post('/my/member/deleteMember', data)
}

/* 房产信息 */
export function bindingHouse (params) {
  return request.get('/room/binding/bindingHouse', {
    params
  })
}

/* 业主房产信息接口 */
export function yzHouse (params) {
  return request.get('/room/binding/yzHouse', {
    params
  })
}

/* 房间认证 */
export function roomAttest (data) {
  return request.post('/room/binding/roomAttest', data)
}

/* 认证房间详情 */
export function bindingRoomInfo (params) {
  return request.get('/room/binding/bindingRoomInfo', {
    params
  })
}

/* 设置当前房间 */
export function bindingDefault (data) {
  return request.post('/room/binding/bindingDefault', data)
}

/* 解除绑定房间 */
export function unBinding (data) {
  return request.post('/room/binding/unBinding', data)
}

/* 检索小区 */
export function searchProject (params) {
  return request.get('/room/binding/searchProject', {
    params
  })
}

/* 检索楼栋 */
export function searchBuilding (params) {
  return request.get('/room/binding/searchBuilding', {
    params
  })
}

/* 检索单元 */
export function searchUnit (params) {
  return request.get('/room/binding/searchUnit', {
    params
  })
}

/* 检索房屋 */
export function searchHouse (params) {
  return request.get('/room/binding/searchHouse', {
    params
  })
}

/* 事务处理 start */
// 报事报修待办列表
export function getDbRepairList (params, ProjectId) {
  return request.get('/my/account/getDbRepairList', {
    params,
    headers: {
      ProjectId
    }
  })
}

// 报事报修统计事务处理
export function getRepairCount (params, ProjectId) {
  return request.get('/my/account/count_work', {
    headers: {
      ProjectId
    }
  })
}

// 事务处理人员列表
export function getDesigneeList (ProjectId) {
  return request.get('/my/account/getDesigneeList', {
    headers: {
      ProjectId
    }
  })
}
/* 事务处理 end */

/* 水电抄表 start */
// 事物处理 水电抄表
export function getHydropowerList (data) {
  return request.post('/live/thing/hydropower_list', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
// 事物处理 水电抄表 选择单元房间
export function getLiveHouseList (data) {
  return request.post('/live/thing/choose_house_list', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
// 事物处理 水电抄表 获取抄表信息
export function getMonthRecord (data) {
  return request.post('/live/thing/getMonthRecordJson', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
// 事物处理 账单录入 修改水电费
export function editRecord (data) {
  return request.post('/live/thing/editRecord', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
/* 水电抄表 end */

/* 幸福币 start */

// 获取付款码二维码
export function getPaymentCode (params) {
  return request.get('/credits/qrcode/paymentCode', {
    params
  })
}
// 获取收款码二维码
export function getCollectCode (params) {
  return request.get('/credits/qrcode/collectCode', {
    params
  })
}
// 付款码扫码请求
export function paymentScan (data) {
  return request.post('/credits/qrcode/paymentScan', data)
}
// 收款码扫码请求
export function collectScan (data) {
  return request.post('/credits/qrcode/collectScan', data)
}
// 付款方接收付款码状态
export function paymentStatus (data) {
  return request.post('/credits/qrcode/paymentStatus', data)
}
// 收款方接收收款码状态
export function collectStatus (data) {
  return request.post('/credits/qrcode/collectStatus', data)
}
// 付款码支付
export function paymentCredits (data) {
  return request.post('/credits/qrcode/paymentCredits', data)
}
// 收款码支付
export function collectCredits (data) {
  return request.post('/credits/qrcode/collectCredits', data)
}
// 收款方提交收款金额
export function skCredits (data) {
  return request.post('/credits/qrcode/skCredits', data)
}
// 签到
export function signin () {
  return request.post('/credits/account/signin')
}
// 签到日历数据
export function signinCalendar (data) {
  return request.post('/credits/account/signinCalendar', data)
}
// 幸福币账户首页
export function getCreditsAccount (data) {
  return request.post('/credits/account/index', data)
}
// 幸福币明细
export function getCreditsLog (params) {
  return request.get('/credits/account/credits_log', {
    params
  })
}
// 幸福币交易详情
export function getCreditsInfo (params) {
  return request.get('/credits/account/credits_info', {
    params
  })
}
// 签到日历数据
export function getCreditsOrderList (data) {
  return request.post('/life/order/credits_order_list', data)
}

/* 幸福币 end */

/* 我的互动 start */

// 我发布的接口
export function getMyArticleList (params) {
  return request.get('/my/interaction/getMyArticleList', {
    params
  })
}

// 我评论的
export function getMyCommentList (params) {
  return request.get('/my/interaction/getMyCommentList', {
    params
  })
}

// 我点赞的
export function getMythumbsupList (params) {
  return request.get('/my/interaction/getMythumbsupList', {
    params
  })
}

// 我参与的活动列表
export function getMyJoinActivityList (params) {
  return request.get('/my/interaction/getMyJoinActivityList', {
    params
  })
}

/* 我的互动 end */

/* 我的消息 start */

// 获取消息列表
export function getMessageList (params) {
  return request.get('/my/message/getMessageList', {
    params
  })
}
// 统计未读消息
export function getCountMessage (params) {
  return request.get('/my/message/countMessage', {
    params
  })
}
// 消息已读
export function messageRead (data) {
  return request.post('/my/message/messageRead', data)
}
// 消息全部已读
export function messageAllRead (data) {
  return request.post('/my/message/messageAllRead', data)
}

/* 我的消息 end */

/* 基础信息 start */

// 编辑头像
export function editAvatar (data) {
  return request.post('/my/account/editAvatar', data)
}
// 编辑昵称
export function editNickname (data) {
  return request.post('/my/account/editNickname', data)
}
// 编辑性别
export function editGender (data) {
  return request.post('/my/account/editGender', data)
}
// 编辑生日
export function editBirthday (data) {
  return request.post('/my/account/editBirthday', data)
}
// 编辑真实姓名
export function editRealname (data) {
  return request.post('/my/account/editRealname', data)
}
// 人脸采集
export function cjFace (data) {
  return request.post('/my/face/cjFace', data)
}
// 更换手机
export function updateMobile (data) {
  return request.post('/my/password/updateMobile', data)
}

// 银行卡所属银行名称
export function getBankInfo (data) {
  return request({
    url: '/my/fupay/getBankInfo',
    method: 'post',
    data
  })
}

// 支持的银行卡列表
export function supBankList () {
  return request({
    url: '/my/fupay/supBankList',
    method: 'post'
  })
}

// 我的银行卡
export function getBankList () {
  return request({
    url: '/my/fupay/getBankList',
    method: 'post'
  })
}
// 支付协议
export function payAgreement () {
  return request({
    url: '/ulogin/agreement/pay_agreement',
    method: 'post'
  })
}

/* 基础信息 end */
