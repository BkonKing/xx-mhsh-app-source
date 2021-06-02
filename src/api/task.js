import request from '@/utils/request.js'

// 获取任务开关
export function getTaskSwitch (params) {
  return request.post('/linli/linli/task_switch', params)
}

// 获取首页任务列表
export function getHomeTaskList (params) {
  return request.post('/linli/linli/lift_task_lisk', params)
}

// 获取任务列表
export function getTaskList (params) {
  return request.post('/linli/linli/task_lisk', params)
}

// 获取任务方对接单方评价页面数据
export function getEvaluateData (params) {
  return request.post('/linli/linli/task_evaluate_json', params)
}

// 任务方对接单方评价提交
export function evaluateTask (params) {
  return request.post('/linli/linli/task_evaluate', params)
}

// 获取任务投诉 页面数据
export function getTaskComplaint (params) {
  return request.post('/linli/linli/task_complaint_json', params)
}

// 任务 投诉提交
export function complaintTask (params) {
  return request.post('/linli/linli/task_complaint', params)
}

// 提问/回答 投诉提交
export function complaintTaskQuestions (params) {
  return request.post('/linli/question/questions_complaint', params)
}

// 获取我的任务 数量
export function getMyTaskNum (params) {
  return request.post('/linli/my_linli/my_task_data', params)
}

// 获取我的 我接单的任务 列表
export function getUserTaskList (params) {
  return request.post('/linli/my_linli/user_task_lisk', params)
}

// 获取我的 我接单的任务 单条
export function reUserTask (params) {
  return request.post('/linli/my_linli/user_task_one_info', params)
}

// 获取我的 我发布的任务 列表
export function getMyTaskList (params) {
  return request.post('/linli/my_linli/my_task_lisk', params)
}

// 获取我的 我发布的任务 单条
export function reMyTask (params) {
  return request.post('/linli/my_linli/my_task_one_info', params)
}

// 获取我的 我的投诉 列表
export function getMyComplaintList (params) {
  return request.post('/linli/my_linli/my_complaint_lisk', params)
}

// 获取我的 我的提问 列表
export function getMyQuestionList (params) {
  return request.post('/linli/my_linli/my_question_lisk', params)
}

// 获取投诉详情
export function getComplaintInfo (params) {
  return request.post('/linli/my_linli/complaint_info', params)
}

// 获取我的任务详情
export function getMyTaskInfo (params) {
  return request.post('/linli/my_linli/my_task_info', params)
}

// 选择发布类型-获取任务类型
export function getTaskTypeList (params) {
  return request.post('/linli/linli/linli_task_type', params)
}

// 搜素项目
export function searchProjectList (params) {
  return request.post('/linli/linli/searchProject', params)
}

// 获取群组
export function getGroupList (params) {
  return request.post('/linli/linli/user_group', params)
}

// 任务提交
export function submitTask (params) {
  return request.post('/linli/linli/create_task', params)
}

// 保存任务到草稿
export function saveTask (params) {
  return request.post('/linli/linli/create_task_draft', params)
}

// 任务编辑
export function editTaskInfo (params) {
  return request.post('/linli/linli/task_info', params)
}

// 任务详情
export function getTaskInfo (params) {
  return request.post('/linli/linli/linli_task_info', params)
}

// 接单
export function receivingMask (params) {
  return request.post('/linli/linli/meet_task', params)
}

// 任务操作状态
export function getOpStatus (params) {
  return request.post('/linli/linli/task_operation', params)
}

// 任务删除
export function deleteTask (params) {
  return request.post('/linli/linli/del_task', params)
}

// 任务暂停
export function stopTask (params) {
  return request.post('/linli/linli/stop_task', params)
}

// 任务进度
export function getTaskSchedule (params) {
  return request.post('/linli/linli/task_longitude', params)
}

// 任务提问列表
export function getQuizList (params) {
  return request.post('/linli/question/task_question_list', params)
}

// 任务-提交提问
export function submitQuiz (data) {
  return request({
    url: '/linli/question/put_questions_to',
    method: 'post',
    data,
    headers: {
      noToast: true
    }
  })
}

// 任务-回复提问
export function replyQuiz (data) {
  return request({
    url: '/linli/question/reply_question',
    method: 'post',
    data,
    headers: {
      noToast: true
    }
  })
}

// 放弃、淘汰原因
export function getReasonList (params) {
  return request.post('/linli/linli/eliminate_give_data', params)
}

// 放弃提交
export function submitGiveUp (params) {
  return request.post('/linli/linli/abandon_task', params)
}

// 淘汰提交
export function submitEliminate (params) {
  return request.post('/linli/linli/eliminate_task', params)
}

// 交付任务
export function deliverTask (params) {
  return request.post('/linli/linli/deliver_task', params)
}

// 任务完成
export function getCompleteInfo (params) {
  return request.post('/linli/linli/task_confirm_json', params)
}

// 任务完成
export function submitCompleteInfo (params) {
  return request.post('/linli/linli/task_confirm', params)
}

// 任务超时
export function getOvertimeTask (params) {
  return request.post('/linli/linli/task_overtime_json', params)
}

// 任务超时
export function submitDelayTash (params) {
  return request.post('/linli/linli/task_overtime', params)
}

// 下架任务
export function closeTask (params) {
  return request.post('/linli/linli/task_close', params)
}

// 评价详情
export function getEvaluateInfo (params) {
  return request.post('/linli/linli/evaluate_info', params)
}
