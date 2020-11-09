import Vue from 'vue'

// 初始化
export function ajpushInit (callback, errorBack) {
  Vue.prototype.ajpush = api.require('ajpush')

  Vue.prototype.ajpush.init((ret) => {
    if (ret && ret.status) {
      ajpushListener()
      callback && callback()
    } else {
      errorBack && errorBack()
    }
  })
}

// 别名绑定
export function bindAliasAndTags (alias, callback, errorBack) {
  const ajParams = {
    alias
  }
  Vue.prototype.ajpush.bindAliasAndTags(ajParams, (ret) => {
    if (ret && ret.statusCode) {
      callback && callback()
    } else {
      errorBack && errorBack()
    }
  })
}

/**
 * 监听
 * 若未注册监听，应用在前台运行时，收到“消息”和“通知”都会自动弹出通知到手机状态栏。
 *
 * 注册该监听后，应用在前台运行时，“消息”类型的推送，将直接交给该监听的回调函数，由开发人员自行处理推送消息，不自动弹出通知到手机状态栏。“通知”类型的推送，iOS平台也将直接交给该监听的回调函数，Android则会自动弹出通知到状态栏。
 *
 * 注意：由于系统差异，Android平台应用在前台、后台、退出情况下都能收到“消息”和“通知”，iOS平台应用在前台时才能收到“消息”和“通知”，后台、退出情况下只能收到“通知”。
 *
 * {
        id:''               //推送id，可能为空
        title:''            //推送标题，可能为空
        content:''          //推送内容
        extra:{}            //额外键值对，可能为空
        isNotification:     //是否是通知，只支持iOS，布尔类型
    }
*/
export function ajpushListener (callback) {
  Vue.prototype.ajpush.setListener(
    (ret) => {
      // console.log(JSON.stringify(ret))
      const {
        content
      } = ret
      if (content !== undefined && content !== '') {
        notification(ret)
        callback && callback(ret)
      }
    }
  )
}

function notification (ret) {
  api.notification({
    sound: ret.extra.sound,
    notify: {
      content: ret.content
    },
    vibrate: [500, 500]
  }, function (ret, err) {})
}
