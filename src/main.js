import '../public/js/api.js' // 引入apiCloud-api
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import txAnalysis from './directive/txAnalysis'
import './styles/base.css'
// import './utils/rem.js' // 引入rem自适应
// vconsole 悬浮console
import VConsole from 'vconsole'
import './styles/common.less'
import './styles/components.less'
import './styles/iconfont.css'
import 'amfe-flexible'

Vue.config.errorHandler = function (err, vm, info) {
  console.error(err, info)
}
Vue.config.productionTip = false
const isApp = false // 手动切换
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(txAnalysis)
// 该判断只在云编译环境下才有效 使用isApp变量手动设置环境(ios必须要有测试包的情况下，才会携带apicloud标识)
// 标识可以在config.xml文件userAgent字段设置
if (process.env.VUE_APP_IS_APP === '1') {
  window.apiready = () => {
    require('./permission')
    process.env.NODE_ENV === 'development' && new VConsole()
    // 静默更新
    const mam = api.require('mam')
    mam.startSmartUpdate(function (ret, err) {
      // if (ret) {
      //   alert(JSON.stringify(ret))
      // } else {
      //   alert(JSON.stringify(err))
      // }
    })
    // 极光推送
    Vue.prototype.ajpush = api.require('ajpush')

    Vue.prototype.ajpush.init((ret) => {
      if (ret && ret.status) {
        // console.log(ret.status)
      }
    })
    // 腾讯统计
    Vue.prototype.txAnalysis = api.require('txAnalysis')
    // 自定义扫码防止黑屏配置
    const FNScanner = api.require('FNScanner')
    api.addEventListener({
      name: 'resume'
    }, function (ret, err) {
      FNScanner.onResume()
    })
    api.addEventListener({
      name: 'pause'
    }, function (ret, err) {
      FNScanner.onPause()
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
        const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        const arr = document.cookie.match(reg)
        if (arr) {
          let value
          try {
            value = JSON.parse(arr[2])
          } catch (error) {
            value = arr[2]
          }
          return value
        } else {
          return null
        }
      },
      setPrefs (obj) {
        const {
          key: name,
          value
        } = obj
        const val = typeof value === 'object' ? JSON.stringify(value) : value
        document.cookie = name + '=' + val + ';path=/;'
      },
      removePrefs (obj) {
        const {
          key: name
        } = obj
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      }
    }
  }
  // Vue.use(Vuex)
  require('./permission')
  process.env.NODE_ENV === 'development' && new VConsole()
  new Vue({
    router,
    store: store,
    render: h => h(App)
  }).$mount('#app')
}
