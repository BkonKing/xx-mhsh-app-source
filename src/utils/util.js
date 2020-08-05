import {
  Toast
} from 'vant'

function friendlyDate (timestamp) {
  var formats = {
    year: '%n% 年前',
    month: '%n% 月前',
    day: '%n% 天前',
    hour: '%n% 小时前',
    minute: '%n% 分钟前',
    second: '%n% 秒前'
  }

  var now = Date.now()
  var seconds = Math.floor((now - timestamp) / 1000)
  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  var days = Math.floor(hours / 24)
  var months = Math.floor(days / 30)
  var years = Math.floor(months / 12)

  var diffType = ''
  var diffValue = 0
  if (years > 0) {
    diffType = 'year'
    diffValue = years
  } else {
    if (months > 0) {
      diffType = 'month'
      diffValue = months
    } else {
      if (days > 0) {
        diffType = 'day'
        diffValue = days
      } else {
        if (hours > 0) {
          diffType = 'hour'
          diffValue = hours
        } else {
          if (minutes > 0) {
            diffType = 'minute'
            diffValue = minutes
          } else {
            diffType = 'second'
            diffValue = seconds === 0 ? (seconds = 1) : seconds
          }
        }
      }
    }
  }
  return formats[diffType].replace('%n%', diffValue)
}

function getDate (type) {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (type === 'start') {
    year = year - 60
  } else if (type === 'end') {
    year = year + 2
  }
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

export {
  friendlyDate,
  getDate
}
