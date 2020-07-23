import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'
// import './utils/rem.js' // 引入rem自适应
import '../public/js/api.js' // 引入apiCloud-api
// import * as method from '@/utils/utils.js' // 引入全局方法
// vconsole 悬浮console
import VConsole from 'vconsole'
import Navigation from 'vue-navigation'
import './permission'
import './styles/common.less'
import './styles/components.less'
import 'amfe-flexible'

Vue.use(Navigation, {
  router
})
Vue.config.productionTip = false
// 全局引入公用方法，也可以在组件中单独引入，推荐在组件中单独引入。
// Vue.prototype.$METHOD = method
// 引入路由记录插件
// Vue.use(Navigation, {
//   router
//   // moduleName: 'navigation',
//   // keyName: 'mhsh'
// })
// const isApp = true; // 手动切换
// alert(window.navigator.userAgent);
// 该判断只在云编译环境下才有效 使用isApp变量手动设置环境(ios必须要有测试包的情况下，才会携带apicloud标识)
// 标识可以在config.xml文件userAgent字段设置
if (window.navigator.userAgent.match(/APICloud/i)) {
  if (window.apiready) {
    window.apiready = () => {
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
        store,
        render: h => h(App)
      }).$mount('#app')
    }
  }
} else {
  process.env.NODE_ENV === 'development' && new VConsole()
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
