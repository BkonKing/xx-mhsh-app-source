import {
  Dialog
} from 'vant'
// camera               //相机/拍照/录像
// contacts             //联系人读取/写入
// contacts-r           //仅联系人读取
// contacts-w           //仅联系人写入
// microphone           //使用麦克风录制音频
// photos               //访问相册|本地存储空间。Android上等同storage权限
// location             //定位
// locationAlways       //后台定位，只支持iOS
// notification         //状态栏通知
// calendar             //日历读取/写入。只支持Android
// calendar-r           //仅日历读取
// calendar-w           //仅日历写入
// phone                //直接拨打电话/获取手机号码|IMEI。只支持Android
// phone-call           //仅直接拨打电话
// phone-r              //仅获取手机号码|IMEI
// phone-r-log          //读取通话记录
// phone-w-log          //写入通话记录
// sensor               //传感器.只支持Android
// sms                  //读取短信/后台发送短信。只支持Android
// sms-s                //仅后台发送短信
// sms-r                //仅读取短信
// storage              //读取/写入|相册|多媒体|本地存储空间。只支持Android
// storage-r            //仅写入|相册|多媒体|文件|本地存储空间
// storage-w            //仅读取|相册|多媒体|文件|本地存储空间

/**
 * 判断是否有权限并发起提醒，没有权限的情况下请求权限
 * @param {Object} perm
 * @return {Promise} 返回成功或失败结果
 * {
 *    name:     //权限名
 *    message:  //提醒语
 *    className: dialog自定义类名
 *    overlayStyle: dialog自定义遮罩样式
 * }
 */
export function handlePermission ({
  name,
  message,
  className,
  overlayStyle
}) {
  return new Promise((resolve, reject) => {
    const perms = hasPermission(name)
    if (!perms[0].granted) {
      if (message) {
        Dialog.confirm({
          title: '提示',
          message: message,
          confirmButtonText: '去开启',
          className,
          overlayStyle
        })
          .then(res => {
            reqPermission(name, ({ list }) => {
              if (list[0].granted) {
                resolve()
              } else {
                reject(new Error(false))
              }
            })
          })
          .catch(() => {
            reject(new Error(false))
          })
      } else {
        reqPermission(name, ({ list }) => {
          if (list[0].granted) {
            resolve()
          } else {
            reject(new Error(false))
          }
        })
      }
    } else {
      resolve()
    }
  })
}

/**
 * 判断是否有权限
 * @param {string | Array} perms 权限列表
 * @return {Array} 查询权限结果
 * [{
 *    name:                 //权限名，字符串类型
 *    granted:              //是否允许，如果从未请求过该权限或者用户未做出过选择时将返回false，布尔类型
 *    undetermined:         //是否从未请求过该权限或者用户未做出过选择，只支持iOS，注意：请求notification权限时无法获取该状态，布尔类型
 * }]
 */
export function hasPermission (perms) {
  let arr = []
  if (typeof perms === 'string') {
    arr = [perms]
  } else if (Array.isArray(perms)) {
    arr = perms
  }
  const rets = api.hasPermission({
    list: arr
  })
  if (!perms) {
    console.log('判断结果：' + JSON.stringify(rets))
    return
  }
  return rets
}

/**
 * 请求权限
 * @param {string | Array} perms 权限列表
 * @param {Function} callback 查询权限结果
 * {
 *     list:[{
 *         name:              //权限名，字符串类型
 *         granted:           //是否允许，布尔类型
 *     }],
 *     never:                 //用户是否选择了“不再提示“，只支持Android，布尔类型
 *     code:                  //请求跟踪码，只支持Android，数字类型。
 * }
 */
export function reqPermission (perms, callback) {
  let arr = []
  if (typeof perms === 'string') {
    arr = [perms]
  } else if (Array.isArray(perms)) {
    arr = perms
  }
  api.requestPermission({
    list: arr,
    code: 100001
  }, function (ret, err) {
    if (callback) {
      callback(ret)
      return
    }
    console.log(JSON.stringify(ret))
  })
}
