import router from './router'
import store from './store'
import Vue from 'vue'
import {
  Toast
} from 'vant'

const whiteList = ['/login', '/agreement', '/openingPage']

router.beforeEach(async (to, from, next) => {
  var toPageName = to.name
  var fromPageName = from.name
  if (process.env.VUE_APP_IS_APP) {
    if (fromPageName) {
      Vue.prototype.bdmtj.onPageEnd({
        pageName: fromPageName
      })
    }
    Vue.prototype.bdmtj.onPageStart({
        pageName: toPageName
    });
  }

  // Toast.loading({
  //   duration: 0, // 持续展示 toast
  //   message: '',
  //   forbidClick: true
  // })

  // 获取token
  const hasToken = api.getPrefs({
    sync: true,
    key: 'access_token'
  })

  // 有token
  if (hasToken && hasToken != 'undefined') {
    if (store.state.user_info.user_type != 0 && !store.state.current_project) {
      // 获取当前项目
      await store.dispatch('getHouse')
    }
    // 动态添加keepalive到列表，离开时再手动从列表中删除keepalive
    if (to.meta && to.meta.keepAlive) {
      store.commit('setKeepAliveList', to.name)
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      const firstStatus = api.getPrefs({
        sync: true,
        key: 'first-open'
      })
      if (!firstStatus) {
        next('/openingPage')
      } else {
        next('/login')
      }
    }
  }
  // Toast.clear()
})

router.afterEach(async (to, from, next) => {
  // Toast.clear()
})
