import router from './router'
import store from './store'
import {
  Toast
} from 'vant'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  Toast.loading({
    duration: 0, // 持续展示 toast
    message: '',
    forbidClick: true
  })

  const hasToken = api.getPrefs({
    sync: true,
    key: 'access_token'
  })

  // eslint-disable-next-line eqeqeq
  if (hasToken && hasToken != 'undefined' && hasToken != '') {
    next()
    if (!store.state.current_project) {
      // 看是否有当前项目
      store.dispatch('getHouse')
    }
    if (to.meta && to.meta.keepAlive) {
      store.commit('setKeepAliveList', to.name)
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
  Toast.clear()
})

router.afterEach(() => {
  // finish progress bar
  Toast.clear()
})
