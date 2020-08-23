import {
  Toast
} from 'vant'

export function getDate (time) {
  const date = time || new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month > 9 ? month : '0' + month
  day = day > 9 ? day : '0' + day
  return `${year}-${month}-${day}`
}

export function getTime () {
  const currentDate = getDate()
  const date = new Date()
  let hour = date.getHours() // 获取当前小时数(0-23)
  let minute = date.getMinutes() // 获取当前分钟数(0-59)
  hour = hour > 9 ? hour : '0' + hour
  minute = minute > 9 ? minute : '0' + minute
  return `${currentDate} ${hour}:${minute}:00`
}

export function formatDate (date) {
  const nowdate = getDate(new Date(date))
  return nowdate
}

export function formatDateTime (time) {
  const date = new Date(time + 8 * 3600 * 1000) // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ')
}

export function validEmpty (val, message) {
  const status = typeof val === 'undefined' || val === null || val === ''
  if (status) {
    Toast(message || '值不能为空')
  }
  return status
}

export function validForm (arr) {
  const status = arr.some(obj => {
    return validEmpty(obj.value, obj.message)
  })
  return new Promise((resolve, reject) => {
    if (!status) {
      resolve(status)
    } else {
      reject(status)
    }
  })
}
