import request from '@/utils/request.js'

// 选择发布类型-获取任务类型
export function getTaskTypeList (params) {
  return request.post('/linli/linli/linli_task_type', params)
}
