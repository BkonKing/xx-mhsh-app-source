import request from '@/utils/request.js'

// 获取影片资料(列表) type:1执映2待映
export function getfilmlist (data) {
  return request.post('/film/film/getfilmlist', data)
}

// 获取附近影院
export function getcinemanearby (data) {
  return request.post('/film/film/getcinemanearby', data)
}
