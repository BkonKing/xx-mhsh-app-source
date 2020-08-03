import request from '@/utils/request.js'

// 智慧管家应用列表接口
export function queryAllApp (params) {
  return request.get('/butler/index/allApp', { params })
}
/* 云门禁 start */
// 二维码开门接口
export function getQrCode (data) {
  return request.post('/butler/entrance/getQrCode', data)
}

// 远程开门接口
export function ycOpenDoor (data) {
  return request.post('/butler/entrance/ycOpenDoor', data)
}

/* 云门禁 end */

/* 公告通知 start */

// 公告通知列表接口
export function getNoticeList (params) {
  return request.get('/butler/notice/getNoticeList', { params })
}

// 标记为已读接口
export function setNoticeReaded (data) {
  return request.post('/butler/notice/setNoticeReaded', data)
}

// 公告通知详情接口
export function getNoticInfo (params) {
  return request.get('/butler/notice/getNoticInfo', { params })
}

/* 公告通知 end */

/* 报事报修 start */

// 报事报修列表接口
export function getRepairList (params) {
  return request.get('/butler/repairs/getRepairList', { params })
}

// 报事报修详情接口
export function getRepairInfo (params) {
  return request.get('/butler/repairs/getRepairInfo', { params })
}

// 新增报事报修接口
export function addRepair (data) {
  return request.post('/butler/repairs/addRepair', data)
}

// 撤消提报接口
export function cancelRepair (data) {
  return request.post('/butler/repairs/cancelRepair', data)
}

/* 报事报修 end */

/* 免费服务 start */

// 免费服务列表接口
export function getFreeServerList (params) {
  return request.get('/butler/freeserver/getFreeServerList', { params })
}
// 我的免费预约列表接口
export function getMyFreeServerList (params) {
  return request.get('/butler/freeserver/getMyFreeServerList', { params })
}

/* 免费服务 end */

/* 呼叫物业列表 start */
export function getCallWYList (params) {
  return request.get('/butler/phone/getCallWYList', { params })
}
/* 呼叫物业 end */

/* 便民黄页列表 start */
export function getYellowPagesList (params) {
  return request.get('/butler/phone/getYellowPagesList', { params })
}
/* 呼叫物业 end */

/* 投诉表扬 start */

// 新增投诉表扬接口
export function addComPraise (data) {
  return request.post('/butler/compraise/addComPraise', data)
}
// 投诉表扬列表接口
export function getComPraiseList (params) {
  return request.get('/butler/compraise/getComPraiseList', { params })
}
// 投诉表扬详情接口
export function getComPraiseInfo (params) {
  return request.get('/butler/compraise/getComPraiseInfo', { params })
}

/* 投诉表扬 end */

/* 问卷投票 start */

// 问卷投票列表接口
export function getWjtpList (params) {
  return request.get('/butler/wjtp/getWjtpList', { params })
}
// 我的问卷投票列表接口
export function getMyWjtpList (params) {
  return request.get('/butler/wjtp/getMyWjtpList', { params })
}
// 提交问卷调查接口
export function addWjtp (data) {
  return request.post('/butler/wjtp/addWjtp', data)
}
// 问卷调查详情接口
export function getWjtpInfo (params) {
  return request.get('/butler/wjtp/getWjtpInfo', { params })
}

/* 问卷投票 end */

/* 访客邀约 start */

// 发起邀约接口
export function addVisitorLog (data) {
  return request.post('/butler/visitor/addVisitorLog', data)
}
// 访客邀约记录接口
export function getVisitorLogList (params) {
  return request.get('/butler/visitor/getVisitorLogList', { params })
}
// 我的访客列表接口
export function getMyVisitorList (params) {
  return request.get('/butler/visitor/getMyVisitorList', { params })
}
// 删除我的访客接口
export function deleteMyVisitor (data) {
  return request.post('/butler/visitor/deleteMyVisitor', data)
}
// 新增我的访客接口
export function addMyVisitor (data) {
  return request.post('/butler/visitor/addMyVisitor', data)
}
// 修改我的访客接口
export function updateMyVisitor (data) {
  return request.post('/butler/visitor/updateMyVisitor', data)
}

/* 访客邀约 end */
