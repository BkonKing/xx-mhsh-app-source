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

// 版本更新，result APP检查更新新版本返回数据
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

/**
 * 判断是否安装地图应用
 * @param {number} type 类型 1：百度地图 2：高德地图 3：苹果地图 4：腾讯地图
 */
export function mapInstalled (type) {
  const isIos = api.systemType === 'ios'
  const iosAppBundle = {
    1: 'baidumap://',
    2: 'iosamap://',
    3: 'http://maps.apple.com',
    4: 'qqmap://'
  }
  const appBundle = {
    1: 'com.baidu.BaiduMap',
    2: 'com.autonavi.minimap',
    4: 'com.tencent.map'
  }
  if (!isIos && type === 3) {
    return Promise.reject(new Error(false))
  }
  return new Promise((resolve, reject) => {
    api.appInstalled({
      appBundle: isIos ? iosAppBundle[type] : appBundle[type]
    },
    (ret, err) => {
      // console.log('baidu:' + JSON.stringify(ret))
      if (ret.installed) {
        // 应用已安装
        resolve(ret.installed, ret)
      } else {
        // 应用未安装
        reject(new Error(false))
      }
    }
    )
  })
}

/**
 * 打开APP
 * @param {number} type 类型 1：百度地图 2：高德地图 3：苹果地图 4：腾讯地图
 */
export function openMapApp ({
  type,
  name,
  lat,
  lon
}) {
  let uri = ''
  let iosUrl = ''
  switch (type) {
    case 1:
      /**
       * 百度地图
       * origin 起点同终点，不传默认当前位置
       * destination终点名称或经纬度，或者可同时提供名称和经纬度，此时经纬度优先级高，将作为导航依据，名称只负责展示
       * coord_type坐标类型 bd09ll（百度经纬度坐标）
       * mode导航模式，固定为transit、driving、navigation、walking，riding分别表示公交、驾车、导航、步行和骑行
       * src 表示来源，用于统计,当前应用的包名
       */
      uri = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&coord_type=bd09ll&mode=driving&src=com.chuizi.brawlive`
      iosUrl = uri
      break
    case 2:
      /**
       * 高德地图
       * sourceApplication：第三方调用应用名称
       * dlat 终点纬度，经纬度参数同时存在或同时为空，视为有效参数
       * dlon 终点经度，经纬度参数同时存在或同时为空，视为有效参数
       * dname 终点名称（可为空）
       * dev 起终点是否偏移。0:lat和lon是已经加密后的,不需要国测加密;1:需要国测加密，可为空，但起点或终点不为空时，不能为空
       * t t = 0 驾车；t = 1 公交；t = 2 步行；t = 3 骑行
       */
      uri = `amapuri://route/plan/?dlat=${lat}&dlon=${lon}&dname=${name}&dev=0&t=0`
      // sourceApplication：第三方调用应用名称
      iosUrl = `iosamap://path?sourceApplication=${api.appName}&backScheme=mhshjyscheme&dlat=${lat}&dlon=${lon}&dname=${name}&dev=0&t=0`
      break
    case 3:
      /**
       * 苹果自带地图
       * address 地址名称（规划好像不起作用）
       * daddr 终点纬度经度lat,lon
       */
      iosUrl = `http://maps.apple.com/?address=${name}&daddr=${lat},${lon}`
      break
    case 4:
      /**
       * 腾讯地图
       * type 路线规划方式 公交：bus驾车：drive步行：walk骑行：bike
       * from 起点名称
       * fromcoord 起点坐标 格式：lat,lng;CurrentLocation ：使用定位点作为起点坐标
       * to 终点名称
       * tocoord 终点坐标
       * referer 开发者key，现在用的是腾讯默认key，所以打开腾讯地图无法点击返回自己应用
       */
      uri = `qqmap://map/routeplan?type=drive&fromcoord=CurrentLocation&to=${name}&tocoord=${lat},${lon}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
      iosUrl = uri
      break
  }

  if (api.systemType === 'ios') {
    api.openApp({
      iosUrl // ios下必传
    },
    (ret, err) => {
      console.log(JSON.stringify(ret))
      console.log(JSON.stringify(err))
    }
    )
  } else {
    api.openApp({
      uri, // android下必传
      androidPkg: 'android.intent.action.VIEW' // android下必传
    },
    (ret, err) => {
      console.log(JSON.stringify(ret))
      console.log(JSON.stringify(err))
    }
    )
  }
}
