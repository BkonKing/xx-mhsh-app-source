import Vue from 'vue'
import Vuex from 'vuex'
import {
  yzmLogin,
  pwdLogin,
  outLogin,
  refreshToken
} from '@/api/user.js'
import {
  Toast,
  Dialog
} from 'vant'
import router from '@/router'

Vue.use(Vuex)

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

const store = {
  state: {
    user_info: '',
    hasLogin: false,
    loginProvider: '',
    openid: null,
    testvuex: false,
    colorIndex: 0,
    colorList: ['#FF0000', '#00FF00', '#0000FF'],
    visitorList: null,
    houseSelected: null,
    current_project: null
  },
  mutations: {
    setUser_info (state, value) {
      state.user_info = value
    },
    login (state, provider) {
      state.hasLogin = true
      state.loginProvider = provider
    },
    logout (state) {
      state.hasLogin = false
      state.openid = null
    },
    setOpenid (state, openid) {
      state.openid = openid
    },
    setTestTrue (state) {
      state.testvuex = true
    },
    setTestFalse (state) {
      state.testvuex = false
    },
    setColorIndex (state, index) {
      state.colorIndex = index
    },
    setVisitorList (state, list) {
      state.visitorList = list
    },
    setHouseSelected (state, obj) {
      state.houseSelected = obj
    },
    setCurrentProject (state, obj) {
      state.current_project = obj
      api.setPrefs({
        key: 'currentProject',
        value: obj
      })
    }
  },
  getters: {
    currentColor (state) {
      return state.colorList[state.colorIndex]
    },
    userInfo (state) {
      return state.user_info
    },
    currentProject (state) {
      return state.current_project
    },
    userType (state) {
      return state.user_info.user_type || 0
    }
  },
  actions: {
    login ({
      commit,
      state
    }, {
      type,
      params
    }) {
      return new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0,
          message: '正在登录中'
        })
        const loginUrl = type === 1 ? yzmLogin : pwdLogin
        loginUrl(params).then((res) => {
          Toast.clear()
          if (res.success) {
            const {
              data
            } = res
            api.setPrefs({
              key: 'access_token',
              value: data.access_token
            })
            api.setPrefs({
              key: 'refresh_token',
              value: data.refresh_token
            })
            api.setPrefs({
              key: 'user_info',
              value: data
            })
            commit('setUser_info', data)
            resolve()
          } else {
            reject(res.message)
          }
        })
      })
    },
    async outLogin ({
      commit
    }) {
      return await new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0
        })
        outLogin().then((res) => {
          Toast.clear()
          if (res.success) {
            api.removePrefs({
              key: 'user_info'
            })
            api.removePrefs({
              key: 'access_token'
            })
            api.removePrefs({
              key: 'refresh_token'
            })
            router.push('/login')
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    async refresh ({
      commit
    }) {
      Toast.loading({
        duration: 0
      })
      await refreshToken().then((res) => {
        Toast.clear()
        if (res.success) {
          const {
            data: info
          } = res
          api.setPrefs({
            key: 'access_token',
            value: info.access_token
          })
          api.setPrefs({
            key: 'refresh_token',
            value: info.refresh_token
          })
          Toast('请重新操作')
        }
      }).catch(err => {
        if (err == 401) {
          Dialog.alert({
            title: '提示',
            message: '登录信息已经过期了，请重新登录'
          }).then(() => {
            api.removePrefs({
              key: 'user_info'
            })
            api.removePrefs({
              key: 'access_token'
            })
            api.removePrefs({
              key: 'refresh_token'
            })
            router.push('/login')
          })
        }
        return err
      })
    }
  }
}

export default new Vuex.Store(store)
