import store from '../store'
import { setStatistics, updateStatistics } from '@/api/statistics.js'

export function setStatisticsData (type_val, params = '') {
  if (process.env.VUE_APP_IS_APP === '1') {
    let params_obj = params || {}
    let mobile_info = mobileInfo()
    let locationInfo = api.getPrefs({
    	key: 'location_info',
    	sync: true
    }) || ''
    locationInfo = locationInfo ? JSON.parse(locationInfo) : ''
    let project_info = api.getPrefs({
	    key: 'current_project',
	    sync: true
	  }) || ''
	  project_info = project_info ? JSON.parse(project_info) : ''
	  let user_info = api.getPrefs({
	    key: 'user_info',
	    sync: true
	  }) || ''
	  user_info = user_info ? JSON.parse(user_info) : ''
	  // this.$store.state.user_info ? this.$store.state.user_info.id : 0,
	  let data = {
	    'app_id': 1,
	    'device_id': mobile_info.deviceId,
	    'version': mobile_info.appVersion,
	    'project_id': project_info ? project_info.project_id : 0,
	    'os_type': mobile_info.systemType === 'ios' ? 2 : 1,
	  }
	  let data_obj15 = {
	    'equipment_number': mobile_info.deviceModel,
	    'brand': mobile_info.systemType === 'ios' ? 'iphone' : mobile_info.deviceName,
			'os': mobile_info.systemType + mobile_info.systemVersion,
			'networking_mode': mobile_info.connectionType,
			'ip': '0.0.0.0',
			'channel': mobile_info.systemType === 'android' ? 'AndroidChannel' : 'iOSChannel',
			'resolving_power': mobile_info.screenWidth + '*' + mobile_info.screenHeight,
			'operators': mobile_info.operator,
			'startup_province': locationInfo ? locationInfo.province : '',
			'startup_city': locationInfo ? locationInfo.city : '',
			'uid': user_info ? user_info.id : 0
	  }
	  if(type_val == 1 || type_val == 5){
	  	Object.assign(data, data_obj15)
	  }else if(type_val == 2 || type_val == 3 || type_val == 6) {
	  	Object.assign(data, {'uid': user_info ? user_info.id : 0})
	  }
	  Object.assign(data, params_obj)
	  setStatistics({
	    type: type_val,
	    data: data
	  }).then(res => {
	  	// alert(type_val+'add成功')
	    // alert(type_val+'add'+JSON.stringify(data))
	  })
	}
}

export function updateStatisticsData (type_val, params = '') {
	if (process.env.VUE_APP_IS_APP === '1') {
		let params_obj = params || {}
		let mobile_info = mobileInfo()
		let data = {
			'device_id': mobile_info.deviceId,
	  }
	  if(type_val == 2) {
	  	Object.assign(data, params_obj)
	  }
	  // alert(type_val+'update'+JSON.stringify(data))
	  updateStatistics({
	    type: type_val,
	    data: data
	  }).then(res => {
	  	// alert(type_val+'update成功')
	  })
	}
}


function mobileInfo () {
	let mobile_info = store.state.mobile_info || {}
	if((JSON.stringify(mobile_info) == "{}")) {
	// 获取手机设备信息
    // 1、appVersion应用版本号(比如：1.0.0)
    // 2、systemType系统类型(比如：ios)
    // 3、systemVersion手机平台的系统版本(比如：8.0)
    // 4、version引擎版本信息(比如：1.0.0)
    // 5、deviceId设备唯一标识(比如：FC408F8B-9598-48B6-A740-B9037ADCXXXE)
    // 6、deviceModel设备型号(比如iPhone X的型号： iPhone10,3)
    // 7、deviceName设备名称(比如：“柚子”的 iPhone)
    // 8、connectionType当前网络连接类型 (比如：wifi)
    // 9、screenWidth屏幕分辨率宽(比如：640)
    // 10、screenHeight屏幕分辨率高(比如：960)
    // 11、operator运营商名称(比如：中国移动)
    mobile_info.appVersion = api.appVersion
    mobile_info.systemType = api.systemType
    mobile_info.systemVersion = api.systemVersion
    mobile_info.version = api.version
    mobile_info.deviceId = api.deviceId
    mobile_info.deviceModel = api.deviceModel
    mobile_info.deviceName = api.deviceName
    mobile_info.connectionType = api.connectionType
    mobile_info.screenWidth = api.screenWidth
    mobile_info.screenHeight = api.screenHeight
    mobile_info.operator = api.operator
    store.commit('setMobile_info', mobile_info)
  }
  return mobile_info
}
