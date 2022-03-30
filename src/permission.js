import router from './router'
import store from './store'
import Vue from 'vue'
import {
  Dialog
} from 'vant'
import {
  pagesArr
} from './const/pages.js'
import {
  setStatisticsData,
  updateStatisticsData
} from '@/utils/analysis.js'
import {
  getParams
} from '@/utils/util.js'
import {
  butlerPermission
} from '@/utils/business'

const whiteList = ['/login', '/agreement', '/openingPage']
var flag = 0
var params = ''
var isClear = true

router.beforeEach(async (to, from, next) => {
  var toPageName = to.name
  var fromPageName = from.name
  if (process.env.VUE_APP_IS_APP) {
    if (fromPageName) {
      Vue.prototype.bdmtj.onPageEnd({
        pageName: fromPageName
      })
      // 页面统计-离开更新
      updateStatisticsData(2, {
        page_id: pagesArr[fromPageName]
      })
    } else {
      // 应用启动新增
      setStatisticsData(6, {
        type: 1,
        page_id: pagesArr[toPageName]
      })
      // 启动数据录入
      setStatisticsData(1)
    }
    Vue.prototype.bdmtj.onPageStart({
      pageName: toPageName
    })
    // 页面统计-进入新增
    setStatisticsData(2, {
      page_id: pagesArr[toPageName]
    })
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
  // 动态添加keepalive到列表，离开时再手动从列表中删除keepalive
  if (to.meta && to.meta.keepAlive) {
    store.commit('setKeepAliveList', to.name)
  }
  // 有token
  if (hasToken && hasToken != 'undefined') {
    if (store.state.user_info.user_type != 0 && !store.state.current_project) {
      // 获取当前项目
      await store.dispatch('getHouse')
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
        if (flag == 1) {
          flag = 0
          store.commit('setShare_params', params)
          next('/login')
        } else {
          next('/login')
        }
      }
    }
  }
  // Toast.clear()
  if (process.env.VUE_APP_IS_APP) {
    // 浏览器打开app
    api.addEventListener({
      name: 'appintent'
    }, function (ret, err) {
      flag = 1
      if (isClear) {
        params = ret.appParam
      } else {
        isClear = true
      }
      if (typeof ret.appParam.wx_arguments !== 'undefined' && ret.appParam.wx_arguments) {
        // 安卓微信跳转app
        const appParams = JSON.parse(ret.appParam.wx_arguments).app_params
        params = getParams(appParams)
      }
      if (typeof ret.iosUrl !== 'undefined' && api.systemType == 'ios') {
        // ios微信跳转app
        const wxPlus = api.require('wxPlus')
        wxPlus.addJumpFromWxListener(function (ret) {
          isClear = false
          params = getParams(ret.message.messageExt)
        })
      }
      // alert(JSON.stringify(params))
      // alert(params.page_type)
      if (params.page_type == 1) {
        router.push({
          path: '/store/goods-detail',
          query: {
            id: params.id,
            f_id: params.f_id
          }
        })
      } else if (params.page_type == 2) {
        router.push({
          path: '/pages/neighbours/details',
          query: {
            articleType: params.articleType,
            id: params.id
          }
        })
      } else if (params.page_type == 3) {
        router.push({
          path: '/life/movie/filmDetails',
          query: {
            id: params.id
          }
        })
      } else if (params.page_type == 4) {
        router.push({
          path: '/life/movie/cinemaDetails',
          query: {
            id: params.id,
            name: params.name
          }
        })
      } else if (params.page_type == 5) {
        router.push({
          path: '/pages/task/detail',
          query: {
            taskId: params.taskId
          }
        })
      } else if (params.page_type == 6) {
        router.push({
          path: '/specialTopic',
          query: {
            frameUrl: params.frameUrl
          }
        })
      } else if (params.page_type == 7) {
        router.push({
          name: 'questionnaireDetails',
          query: {
            id: params.id
          }
        })
      } else if (params.page_type == 8) {
        if (+store.getters.userType !== 0 || store.getters.userInfo.enter_project_id) {
          router.push({
            name: 'freeserverIndex'
          })
        } else {
          Dialog.confirm({
            title: '提示',
            message: '您尚未认证房间，是否去认证？',
            confirmButtonText: '去认证'
          }).then((res) => {
            router.push(
              '/pages/personage/house/attestation?type=1&mode=0&select=1'
            )
          }).catch(() => {})
        }
      } else if (params.routerName) {
        const { routerName, ...query } = params
        router.push({
          name: params.routerName,
          query
        })
      }
    })
  }
})

router.afterEach(async (to, from, next) => {
  // Toast.clear()
})
