import '../public/js/api.js' // 引入apiCloud-api
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
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
// 该判断只在云编译环境下才有效 使用isApp变量手动设置环境(ios必须要有测试包的情况下，才会携带apicloud标识)
// 标识可以在config.xml文件userAgent字段设置
if (isApp /* window.navigator.userAgent.match(/APICloud/i) */) {
  window.apiready = () => {
    Vue.use(Vuex)
    require('./permission')
    process.env.NODE_ENV === 'development' && new VConsole()
    const mam = api.require('mam')
    mam.startSmartUpdate(function (ret, err) {
      if (ret) {
        alert(JSON.stringify(ret))
      } else {
        alert(JSON.stringify(err))
      }
    })
    // 将API链接Vue原型，后续通过this.$APICLOUD代替window.api
    Vue.prototype.$api = window.api
    new Vue({
      router,
      store: new Vuex.Store(store),
      render: h => h(App)
    }).$mount('#app')
  }
} else {
  Vue.use(Vuex)
  require('./permission')
  process.env.NODE_ENV === 'development' && new VConsole()
  new Vue({
    router,
    store: new Vuex.Store(store),
    render: h => h(App)
  }).$mount('#app')
}
