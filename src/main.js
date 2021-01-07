import '../public/js/api.js' // 引入apiCloud-api
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import txAnalysis from './directive/txAnalysis'
import imageCach from './directive/imageCach'
import preventReClick from './directive/preventReClick'
import eventBus from '@/api/eventbus'
import './styles/base.css'
// vconsole 悬浮console
// import VConsole from 'vconsole'
import './styles/common.less'
import './styles/components.less'
import './styles/iconfont.css'
import 'amfe-flexible'
import { setStatisticsData } from '@/utils/analysis.js'
import { checkUpdate } from '@/utils/apicloud_util'
import { ajpushInit } from '@/utils/ajpush'
import './utils/lazy_use'

Vue.config.errorHandler = function (err, vm, info) {
  console.error(err, info)
}
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(txAnalysis)
Vue.use(imageCach)
Vue.use(preventReClick)
// 该判断只在云编译环境下才有效 使用isApp变量手动设置环境(ios必须要有测试包的情况下，才会携带apicloud标识)
// 标识可以在config.xml文件userAgent字段设置
if (process.env.VUE_APP_IS_APP === '1') {
  window.apiready = () => {
    require('./permission')
    // process.env.NODE_ENV === 'development' && new VConsole()
    // 检查更新
    checkUpdate()
    // 极光推送
    ajpushInit()
    // 百度统计
    Vue.prototype.bdmtj = api.require('modulebaidumtj')
    if (api.systemType == 'android') {
      // android平台的初始化
      Vue.prototype.bdmtj.startWithAppkey({
        appkey: 'f672a40c5d',
        appVersion: api.appVersion,
        channelId: 'AndroidChannel',
        enableExceptionLog: 'true',
        enableDebugOn: 'true'
      })
    } else {
      // iOS平台的初始化
      Vue.prototype.bdmtj.startWithAppkey({
        appkey: 'b8c2842306',
        appVersion: api.appVersion,
        channelId: 'iOSChannel',
        enableExceptionLog: 'true',
        enableDebugOn: 'true'
      })
    }
    Vue.prototype.mtjEvent = function (params) {
      Vue.prototype.bdmtj.onEvent({
        eventId: params.eventId,
        eventLabel: 'event'
      })
      setStatisticsData(3, { event_id: params.eventId })
    }

    // 自定义扫码防止黑屏配置
    const FNScanner = api.require('FNScanner')
    api.addEventListener({
      name: 'resume'
    }, function (ret, err) {
      FNScanner.onResume()
      eventBus.$emit('resume', ret, err)
    })
    api.addEventListener({
      name: 'pause'
    }, function (ret, err) {
      FNScanner.onPause()
      eventBus.$emit('pause', ret, err)
    })
    // 将API链接Vue原型，后续通过this.$APICLOUD代替window.api
    Vue.prototype.$api = window.api
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
} else {
  if (!window.api) {
    window.api = {
      getPrefs (obj) {
        const {
          key: name
        } = obj
        return localStorage.getItem(name)
      },
      setPrefs (obj) {
        const {
          key: name,
          value
        } = obj
        const val = typeof value === 'object' ? JSON.stringify(value) : value
        localStorage.setItem(name, val)
      },
      removePrefs (obj) {
        const {
          key: name
        } = obj
        localStorage.removeItem(name)
      }
    }
  }
  Vue.prototype.mtjEvent = function (params) {
    console.log(params)
  }
  // Vue.use(Vuex)
  require('./mock')
  require('./permission')
  // process.env.NODE_ENV === 'development' && new VConsole()
  new Vue({
    router,
    store: store,
    render: h => h(App)
  }).$mount('#app')
}
