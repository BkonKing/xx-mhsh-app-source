import request from '@/utils/request.js'
import store from '../store'

// 智慧管家应用列表接口
export function queryAllApp (params) {
  return request.get('/butler/index/allApp', {
    params
  })
}
// 通知轮播列表
export function getNoticeLbList (params) {
  return request.get('/butler/notice/getNoticeLbList', {
    params
  })
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

// 开门记录
export function getMenjinLog (params) {
  return request.get('/butler/entrance/getMenjinLog', {
    params
  })
}

/* 云门禁 end */

/* 公告通知 start */

// 公告通知列表接口
export function getNoticeList (params) {
  return request.get('/butler/notice/getNoticeList', {
    params
  })
}

// 标记为已读接口
export function setNoticeReaded (data) {
  return request.post('/butler/notice/setNoticeReaded', data)
}

// 公告通知详情接口
export function getNoticInfo (params) {
  return request.get('/butler/notice/getNoticInfo', {
    params
  })
}

/* 公告通知 end */

/* 报事报修 start */

// 报事报修列表接口
export function getRepairList (params) {
  return request.get('/butler/repair/getRepairList', {
    params
  })
}

// 报事报修详情接口
export function getRepairInfo (params, id) {
  return request.get('/butler/repair/getRepairInfo', {
    params,
    headers: {
      ProjectId: id
    }
  })
}

// 新增报事报修接口
export function addRepair (data, HouseId) {
  return request.post('/butler/repair/addRepair', data, {
    headers: {
      HouseId
    }
  })
}

// 获取报事报修温馨提示
export function getTipsInfo () {
  return request.get('/butler/repair/getTipsInfo')
}

// 报事报修类型
export function getRepairCategoryList (params) {
  return request.get('/butler/repair/getRepairCategoryList', {
    params
  })
}

// 撤消提报接口
export function cancelRepair (data, id) {
  return request.post('/butler/repair/cancelRepair', data, {
    headers: {
      ProjectId: id
    }
  })
}

//
export function getRefuseReasonList (params) {
  return request.post('/butler/repair/getRefuseReasonList', {
    params
  })
}

// 协商确认
export function negotiationAffirm (data) {
  return request.post('/butler/repair/negotiation_affirm', data)
}

// 协商拒绝
export function negotiationRefuse (data) {
  return request.post('/butler/repair/negotiation_refuse', data)
}

// 用户确认结案
export function caseOverAffirm (data) {
  return request.post('/butler/repair/caseOverAffirm', data)
}

// 用户评价
export function evaluate (data) {
  return request.post('/butler/repair/evaluate', data)
}

// 协商详情
export function getNegotiationInfo (params) {
  return request.get('/butler/repair/getNegotiationInfo', {
    params
  })
}

// 获取发起评星相关数据
export function launchEvaluate (params) {
  return request.get('/butler/repair/launchEvaluate', {
    params
  })
}

// 评星详情
export function getEvaluateInfo (params) {
  return request.get('/butler/repair/getEvaluateInfo', {
    params
  })
}

// 协商详情(事务)
export function queryNegotiationInfo (params, ProjectId) {
  return request.get('/butler/repair/getNegotiationInfo', {
    params,
    headers: {
      ProjectId
    }
  })
}

/* 我的，事务处理 */

// 获取撤消提报原因
export function getUndoReasonList (id) {
  return request.get('/butler/repair/getUndoReasonList', {
    headers: {
      ProjectId: id
    }
  })
}

// 获取取消任务原因
export function getCancelReasonList (ProjectId) {
  return request.get('/butler/repair/getCancelReasonList', {
    headers: {
      ProjectId
    }
  })
}

// 客服受理
export function acceptCase (data, ProjectId) {
  return request.post('/butler/repair/acceptCase', data, {
    headers: {
      ProjectId
    }
  })
}

// 客服分派
export function assignTasks (data, ProjectId) {
  return request.post('/butler/repair/assignTasks', data, {
    headers: {
      ProjectId
    }
  })
}

// 拒绝任务
export function refuseTasks (data, ProjectId) {
  return request.post('/butler/repair/refuseTasks', data, {
    headers: {
      ProjectId
    }
  })
}

// 发起协商
export function negotiation (data, ProjectId) {
  return request.post('/butler/repair/negotiation', data, {
    headers: {
      ProjectId
    }
  })
}

// 工作人员处理预结案
export function caseOver (data, ProjectId) {
  return request.post('/butler/repair/caseOver', data, {
    headers: {
      ProjectId
    }
  })
}

// 上传结案图片
export function closingPicture (data, ProjectId) {
  return request.post('/butler/repair/closingPicture', data, {
    headers: {
      ProjectId
    }
  })
}

// 添加事务处理进度
export function timeaxis (data, ProjectId) {
  return request.post('/butler/repair/timeaxis', data, {
    headers: {
      ProjectId
    }
  })
}

/* 报事报修 end */

/* 免费服务 start */

// 免费服务列表接口
export function getFreeServerList (params) {
  return request.get('/butler/freeserver/getFreeServerList', {
    params
  })
}
// 我的免费预约列表接口
export function getMyFreeServerList (params) {
  return request.get('/butler/freeserver/getMyFreeServerList', {
    params
  })
}
// 确认服务预约
export function serverYuyue (data) {
  return request.post('/butler/freeserver/server_yuyue', data)
}
// 服务预约结束
export function serverClose (data) {
  return request.post('/butler/freeserver/server_close', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
// 预约服务二维码链接
export function getServerCode (data) {
  return request.post('/butler/freeserver/serverCode', data)
}
// 出示二维码用户监听状态
export function serverCodeStatus (data) {
  return request.post('/butler/freeserver/serverCodeStatus', data)
}
// 预约服务扫码确认
export function serverCodeScan (data) {
  return request.post('/butler/freeserver/serverCodeScan', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}

/* 免费服务 end */

/* 呼叫物业列表 start */
export function getCallWYList (params) {
  return request.get('/butler/phone/getCallWYList', {
    params
  })
}
/* 呼叫物业 end */

/* 便民黄页列表 start */
export function getYellowPagesList (params) {
  return request.get('/butler/phone/getYellowPagesList', {
    params
  })
}
/* 呼叫物业 end */

/* 投诉表扬 start */

// 新增投诉表扬接口
export function addComPraise (data, HouseId) {
  return request.post('/butler/compraise/addComPraise', data, {
    headers: {
      HouseId
    }
  })
}
// 投诉表扬列表接口
export function getComPraiseList (params) {
  return request.get('/butler/compraise/getComPraiseList', {
    params
  })
}
// 投诉表扬详情接口
export function getComPraiseInfo (params) {
  return request.get('/butler/compraise/getComPraiseInfo', {
    params
  })
}

/* 投诉表扬 end */

/* 问卷投票 start */

// 问卷投票列表接口
export function getWjtpList (params) {
  return request.get('/butler/wjtp/getWjtpList', {
    params
  })
}
// 我的问卷投票列表接口
export function getMyWjtpList (params) {
  return request.get('/butler/wjtp/getMyWjtpList', {
    params
  })
}
// 提交问卷调查接口
export function addWjtp (data) {
  return request.post('/butler/wjtp/addWjtp', data)
}
// 问卷调查详情接口
export function getWjtpInfo (params) {
  return request.get('/butler/wjtp/getWjtpInfo', {
    params
  })
}

/* 问卷投票 end */

/* 访客邀约 start */

// 发起邀约接口
export function addVisitorLog (data) {
  return request.post('/butler/visitor/addVisitorLog', data)
}
// 访客邀约记录接口
export function getVisitorLogList (params) {
  return request.get('/butler/visitor/getVisitorLogList', {
    params
  })
}
// 我的访客列表接口
export function getMyVisitorList (params) {
  return request.get('/butler/visitor/getMyVisitorList', {
    params
  })
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
// 访客二维码链接
export function visitorCode (data) {
  return request.post('/butler/visitor/visitorCode', data)
}
// 预约访客扫码
export function visitorCodeScan (data) {
  return request.post('/butler/visitor/visitorCodeScan', data, {
    headers: {
      ProjectId: store.getters.userInfo.xm_project_id
    }
  })
}
// 提货码链接
export function takeCodeScan (data) {
  return request.post('/life/order/projectSmztScanCode', data)
}

/* 访客邀约 end */
