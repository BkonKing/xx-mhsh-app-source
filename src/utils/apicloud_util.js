import Vue from 'vue'
import {
  Dialog
} from 'vant'

/**
 * APP检查更新新版本
 * @param {Boolean} update 是否直接提醒更新
 * checkUpdate(callback(ret, err))
 * ret: {
 *   status:true,                //操作成功状态值
 *   result:
 *   {
 *       update:true,            //是否有更新
 *       closed:true,            //设备上当前版本是否被强行关闭
 *       version:'1.0',          //新版本版本号
 *       versionDes:'',          //新版本更新描述
 *       closeTip:'',            //提示用户应用版本被强行关闭时弹框的提示语
 *       updateTip:'',           //提示用户有更新时弹框的提示语
 *       source:'',              //新版本安装包的下载地址
 *       time:''                 //新版本的发布时间
 *   }
 * }
 * err: {
 *  msg:''    //错误描述
 * }
 * update和closed字段是‘或’和‘与’的关系：
 *  -无更新：{update:false,closed:false}
 *  -有更新：{update:true,closed:false}
 *  -有更新，强制更新：{update:true,closed:true}
 *  -无更新，强制关闭：{update:false,closed:true}
 */
export function checkUpdate (update = true) {
  return new Promise((resolve, reject) => {
    var mam = api.require('mam')
    mam.checkUpdate(function (ret, err) {
      if (ret && ret.status) {
        var result = ret.result
        if (result.update == true) {
          if (update) {
            confirmUpdate(result)
          } else {
            resolve(result)
          }
        } else {
          reject(new Error(false))
        }
      } else {
        console.error(err.msg)
        reject(new Error(err.msg))
      }
    })
  })
}

export function confirmUpdate (result) {
  Dialog.confirm({
    title: '版本更新',
    message: `版本：V${result.version}\n时间：${result.time}\n${result.versionDes ? ('更新说明：' + result.versionDes) : ''}`,
    messageAlign: 'left',
    showCancelButton: !result.closed,
    closeOnPopstate: false,
    confirmButtonText: '更新'
  }).then(() => {
    if (api.systemType == 'android') {
      api.download({
        url: result.source,
        report: true
      }, function (ret, err) {
        if (ret && ret.state == 0) {
          /* 下载进度 */
          api.toast({
            msg: '正在下载应用' + ret.percent + '%',
            duration: 2000
          })
        }
        if (ret && ret.state == 1) {
          /* 下载完成 */
          var savePath = ret.savePath
          api.installApp({
            appUri: savePath
          })
        }
      })
    }
    if (api.systemType == 'ios') {
      api.installApp({
        appUri: result.source
      })
    }
    Vue.mtjEvent({
      eventId: 81
    })
  })
}
