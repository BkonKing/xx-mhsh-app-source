import request from '../utils/request.js'

/* 常见问题列表 */
export function getEqList (params) {
  return request.get('/my/server/getEqList', { params })
}

/* 意见反馈列表 */
export function getFeedbackList (params) {
  return request.get('/my/server/getFeedbackList', { params })
}

/* 添加意见反馈 */
export function addFeedback (data) {
  return request.post('/my/server/addFeedback', data)
}

/* 意见反馈详情 */
export function getFeedbackInfo (params) {
  return request.get('/my/server/getFeedbackInfo', { params })
}

/* 设置支付密码 */
export function setPayPassword (data) {
  return request.post('/my/password/setPayPassword', data)
}

/* 修改支付密码 */
export function updatePayPassword (data) {
  return request.post('/my/password/updatePayPassword', data)
}

/* 通过验证码重置支付密码 */
export function resetPayPassword (data) {
  return request.post('/my/password/resetPayPassword', data)
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
  return request.get('/room/binding/memberList', { params })
}

/* 新增报备成员 */
export function addMember (data) {
  return request.post('/my/member/addMember', data)
}

/* 修改报备成员 */
export function updateMember (data) {
  return request.post('/my/member/updateMember', data)
}

/* 房产信息 */
export function bindingHouse (params) {
  return request.get('/room/binding/bindingHouse', { params })
}

/* 业主房产信息接口 */
export function yzHouse (params) {
  return request.get('/room/binding/yzHouse', { params })
}

/* 房间认证 */
export function roomAttest (data) {
  return request.post('/room/binding/roomAttest', data)
}

/* 认证房间详情 */
export function bindingRoomInfo (params) {
  return request.get('/room/binding/bindingRoomInfo', { params })
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
  return request.get('/room/binding/searchProject', { params })
}

/* 检索楼栋 */
export function searchBuilding (params) {
  return request.get('/room/binding/searchBuilding', { params })
}

/* 检索单元 */
export function searchUnit (params) {
  return request.get('/room/binding/searchUnit', { params })
}

/* 检索房屋 */
export function searchHouse (params) {
  return request.get('/room/binding/searchHouse', { params })
}
