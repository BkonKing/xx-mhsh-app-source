import request from '../utils/request.js'

/* 常见问题列表 */
export function getEqList (data) {
  return request.post('/my/server/getEqList', data)
}
