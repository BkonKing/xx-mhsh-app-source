import store from '../store'
import EXIF from 'exif-js'
import {
  Toast,
  ImagePreview,
  Dialog
} from 'vant'
import { bindAliasAndTags } from '@/utils/ajpush'
import {
  handlePermission
} from '@/utils/permission'

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

export function taskValidEmpty (obj) {
  const status = typeof obj.value === 'undefined' || obj.value === null || obj.value === ''
  if (status) {
    Toast(obj.message || '值不能为空')
  }
  Object.assign(obj, { status: status })
  return obj
}

export function taskValidForm (arr) {
  let res = {}
  let flag = 0
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i]
    res = taskValidEmpty(obj)
    if (res.status) {
      flag = 1
      break
    }
  }
  return new Promise((resolve, reject) => {
    console.log('callObj', flag, res)
    if (!flag) {
      resolve(res.status)
    } else {
      reject(res.id)
    }
  })
}

export function ValidNum (obj) {
  const status = (obj.value >= obj.min && obj.value <= obj.max)
  if (!status) {
    Toast(obj.message || '')
  }
  console.log('obj', obj, obj.value > obj.min && obj.value <= obj.max)
  return Object.assign(obj, { status: status })
}

export function ValidNumForm (arr) {
  let res = {}
  let flag = 0
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i]
    res = ValidNum(obj)
    if (!res.status) {
      flag = 1
      break
    }
  }
  return new Promise((resolve, reject) => {
    if (!flag) {
      resolve(res.status)
    } else {
      reject(res.id)
    }
  })
}

export function imagePreview (options) {
  const params = Object.assign({
    onClose () {
      api.removeEventListener({
        name: 'keyback'
      })
    }
  }, options)
  const instance = ImagePreview(params)
  api.addEventListener({
    name: 'keyback'
  }, function (ret, err) {
    instance.close()
  })
}

export function clearUserInfo () {
  if (process.env.VUE_APP_IS_APP === '1') {
    bindAliasAndTags(0)
  }
  const userId = store.getters.userInfo.id
  if (userId) {
    let tokenList = api.getPrefs({
      key: 'token_list',
      sync: true
    })
    tokenList = typeof tokenList === 'string' ? JSON.parse(tokenList) : tokenList
    delete tokenList[userId]
    api.setPrefs({
      key: 'token_list',
      value: tokenList
    })
    let userList = api.getPrefs({
      key: 'user_list',
      sync: true
    })
    userList = typeof userList === 'string' ? JSON.parse(userList) : userList
    delete userList[userId]
    api.setPrefs({
      key: 'user_list',
      value: userList
    })
  }
  api.removePrefs({
    key: 'user_info'
  })
  store.commit('setUser_info', '')
  store.commit('setCurrentProject', null)
  api.removePrefs({
    key: 'access_token'
  })
  api.removePrefs({
    key: 'refresh_token'
  })
  api.removePrefs({
    key: 'currentProject'
  })
}

export function getArea (str) {
  const area = {
    Province: '',
    City: '',
    Country: ''
  }
  let index11 = 0
  const index1 = str.indexOf('省')
  if (index1 == -1) {
    index11 = str.indexOf('自治区')
    if (index11 != -1) {
      area.Province = str.substring(0, index11 + 3)
    } else {
      area.Province = str.substring(0, 0)
    }
  } else {
    area.Province = str.substring(0, index1 + 1)
  }

  const index2 = str.indexOf('市')
  if (index11 == -1) {
    area.City = str.substring(index11 + 1, index2 + 1)
  } else {
    if (index11 == 0) {
      if (index2 > index11) {
        area.City = str.substring(index1 + 1, index2 + 1)
      }
    } else {
      if (index2 > index11) {
        area.City = str.substring(index11 + 3, index2 + 1)
      }
    }
  }

  let index3 = str.lastIndexOf('区')
  if (index3 == -1) {
    index3 = str.indexOf('县')
    if (index3 > 0) {
      if (index2 > index1 && index2 > index11) {
        area.Country = str.substring(index2 + 1, index3 + 1)
      } else {
        if (index11) {
          area.Country = str.substring(index11 + 3, index3 + 1)
        } else {
          area.Country = str.substring(index1 + 1, index3 + 1)
        }
      }
    }
  } else {
    if (index3 > index2 && index3 > index11 + 2 && index11 !== -1) {
      if (index2 > index11 && index2 > index1) {
        area.Country = str.substring(index2 + 1, index3 + 1)
      } else {
        if (index2 <= index11) {
          area.Country = str.substring(index11 + 3, index3 + 1)
        } else {
          area.Country = str.substring(index1 + 1, index3 + 1)
        }
      }
    }
  }
  return area.Province + area.City + area.Country
}

export async function selectFileImage (file) {
  if (file) {
    // 图片方向角
    var Orientation = null
    var fileType = file.type
    // var URL = URL || webkitURL;
    // 获取照片方向角属性，用户旋转控制
    EXIF.getData(file, function () {
      EXIF.getAllTags(this)
      Orientation = EXIF.getTag(this, 'Orientation')
    })

    var oReader = new FileReader()
    var base64 = null
    return await new Promise((resolve, reject) => {
      oReader.onload = function (e) {
        // var blob = URL.createObjectURL(file);
        // _compress(blob, file, basePath);
        var image = new Image()
        image.src = e.target.result
        image.onload = function () {
          var expectWidth = this.naturalWidth
          var expectHeight = this.naturalHeight

          if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
            expectWidth = 800
            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth
          } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
            expectHeight = 1200
            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight
          }
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          canvas.width = expectWidth
          canvas.height = expectHeight
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
          // 如果方向角不为1，都需要进行旋转
          if (Orientation != '' && Orientation != 1) {
            switch (Orientation) {
              case 6: // 需要顺时针（向左）90度旋转
                rotateImg(this, 'left', canvas)
                break
              case 8: // 需要逆时针（向右）90度旋转
                rotateImg(this, 'right', canvas)
                break
              case 3: // 需要180度旋转
                rotateImg(this, 'right', canvas) // 转两次
                rotateImg(this, 'right', canvas)
                break
            }
          }
          base64 = canvas.toDataURL(fileType, 1)
          resolve(new File([convertBase64Url(base64, fileType)], 'avatar.jpg'))
        }
      }
      oReader.readAsDataURL(file)
    })
  }
}

function convertBase64Url (urlData, fileType) {
  var bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte

  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }

  return new Blob([ab], {
    type: fileType
  })
}

// 对图片旋转处理 added by lzk
function rotateImg (img, direction, canvas) {
  // alert(img);
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0
  var max_step = 3
  // var img = document.getElementById(pid);
  if (img == null) return
  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  var height = img.height
  var width = img.width
  // var step = img.getAttribute('step');
  var step = 2
  if (step == null) {
    step = min_step
  }
  if (direction == 'right') {
    step++
    // 旋转到原位置，即超过最大值
    step > max_step && (step = min_step)
  } else {
    step--
    step < min_step && (step = max_step)
  }
  // 旋转角度以弧度值为参数
  var degree = step * 90 * Math.PI / 180
  var ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0)
      break
  }
}

// 百度地图获取当前地址信息,返回详细地址信息
/**
 * 百度地图获取当前地址信息
 * @param {type} 1：返回转换为详细地址信息（省市县），2：返回 getLocation获取到信息
 * @return {Promise} 根据type返回不同格式的地址信息
 */
export function bMapGetLocationInfo (type = 1) {
  return new Promise((resolve, reject) => {
    if (process.env.VUE_APP_IS_APP !== '1') {
      reject(new Error(false))
    }
    const bMap = api.require('bMap')
    if (api.systemType === 'ios') {
      // 初始化
      bMap.initMapSDK((ret, err) => {
        if (ret.status) {
          getLocationServices(type)
        } else {
          reject(err)
        }
      })
    } else {
      getLocationServices(type)
    }

    function getLocationServices (type) {
      // 获取当前是否打开定位
      bMap.getLocationServices((ret, err) => {
        if (ret.enable) {
          // 获取当前地址信息（经纬度等）
          bMap.getLocation({
            accuracy: '100m'
          }, (ret, err) => {
            if (ret.status) {
              if (type === 1) {
                const {
                  lon,
                  lat
                } = ret
                // 根据经纬度获取详细地址信息（省市县等）
                bMap.getNameFromCoords({
                  lon,
                  lat
                }, (ret, err) => {
                  if (ret.status) {
                    resolve(ret)
                  } else {
                    reject(err)
                  }
                })
              } else {
                resolve(ret)
              }
            } else {
              reject(err)
              console.log(err.code)
            }
          })
        } else {
          reject(err)
          console.log('未开启定位功能！')
        }
      })
    }
  })
}

export function getParams (params) {
  const vars = params.split('&')
  const paramsObj = {}
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    paramsObj[pair[0]] = pair[1]
  }
  return paramsObj
}

export function downloadPic (picUrl, name) {
  return new Promise((resolve, reject) => {
    handlePermission({
      name: 'storage',
      message: '没有开启数据存储权限，可能会影响部分功能哦，是否前往开启权限？',
      className: 'top-index-dialog',
      overlayStyle: {
        'z-index': 9998
      }
    }).then(() => {
      api.download({
        url: picUrl,
        savePath: 'fs://' + name + '.png',
        report: false,
        cache: true,
        allowResume: false
      }, function (ret, err) {
        if (ret.state == 1) {
          resolve(name)
        } else {
          reject(new Error(false))
        }
      })
    }).catch(() => {
      reject(new Error(false))
    })
  })
}

// 精准度计算转换
export function makeCount (num, precision = 12) {
  return parseFloat((num).toPrecision(precision))
}

// 防抖函数
export function debounce (fn, delay = 500) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const args = arguments
    timer = setTimeout(() => {
      fn.apply(this, args) // 改变this指向为调用debounce所指的对象
    }, delay)
  }
}
