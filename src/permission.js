import router from './router'
import store from './store'
import {
  Toast
} from 'vant'

const whiteList = ['/login', '/agreement']

router.beforeEach(async (to, from, next) => {
  // console.log(11,to)
  // var pageName = to.name;
  // if(process.env.VUE_APP_IS_APP){
  //   var txAnalysis = api.require('txAnalysis');
  //   txAnalysis.trackPageBegin({
  //     page: pageName
  //   });
  // }

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
      next('/login')
    }
  }
  // Toast.clear()
})

router.afterEach(async (to, from, next) => {
  console.log(22,to)
  // var pageName = to.name;
  // if(process.env.VUE_APP_IS_APP){
  //   var txAnalysis = api.require('txAnalysis');
  //   txAnalysis.trackPageBegin({
  //     page: pageName
  //   });
  // }
  // Toast.clear()
})
