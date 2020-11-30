import router from './router'
import store from './store'
import Vue from 'vue'
import {
  Toast
} from 'vant'
import { pagesArr } from './const/pages.js'
import { setStatisticsData, updateStatisticsData } from '@/utils/analysis.js'

const whiteList = ['/login', '/agreement', '/openingPage']

router.beforeEach(async (to, from, next) => {
  var toPageName = to.name
  var fromPageName = from.name
  if (process.env.VUE_APP_IS_APP) {
    if (fromPageName) {
      Vue.prototype.bdmtj.onPageEnd({
        pageName: fromPageName
      })
      // 页面统计-离开更新
      updateStatisticsData(2, {'page_id': pagesArr[fromPageName]})
    } else {
      // 应用启动新增
      setStatisticsData(6, {'type': 1, 'page_id': pagesArr[toPageName]})
      // 启动数据录入
      setStatisticsData(1)
    }
    Vue.prototype.bdmtj.onPageStart({
      pageName: toPageName
    })
    // 页面统计-进入新增
    setStatisticsData(2, {'page_id': pagesArr[toPageName]})
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
