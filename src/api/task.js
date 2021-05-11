import request from '@/utils/request.js'

// 获取任务开关
export function getTaskSwitch (params) {
  return request.post('/linli/linli/task_switch', params)
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

// 获取我的 我接单的任务 列表
export function getUserTaskList (params) {
  return request.post('/linli/my_linli/user_task_lisk', params)
}

// 获取我的 我发布的任务 列表
export function getMyTaskList (params) {
  return request.post('/linli/my_linli/my_task_lisk', params)
}

// 获取我的 我的投诉 列表
export function getMyComplaintList (params) {
  return request.post('/linli/my_linli/my_complaint_lisk', params)
}

// 获取我的 我的提问 列表
export function getMyQuestionList (params) {
  return request.post('/linli/my_linli/my_question_lisk', params)
}

// 选择发布类型-获取任务类型
export function getTaskTypeList (params) {
  return request.post('/linli/linli/linli_task_type', params)
}

// 选择发布类型-获取任务类型
export function searchProjectList (params) {
  return request.post('/linli/linli/searchProject', params)
}
