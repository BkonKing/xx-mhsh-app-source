import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user.js'
import { Toast } from 'vant'

if (!window.api) {
  window.api = {
    getGlobalData (obj) {
      const { key: name } = obj
      const strcookie = document.cookie// 获取cookie字符串
      const arrcookie = strcookie.split('; ')// 分割
      // 遍历匹配
      for (let i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    },
    setGlobalData (obj) {
      const {
        key: name,
        value
      } = obj
      document.cookie = name + '=' + escape(value) + ';path=/;'
    }

  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    access_token: api.getGlobalData('access_token') || '',
    refresh_token: api.getGlobalData('refresh_token') || '',
    user_info: api.getGlobalData('user_info') || '',
    hasLogin: false,
    loginProvider: '',
    openid: null,
    testvuex: false,
    colorIndex: 0,
    colorList: ['#FF0000', '#00FF00', '#0000FF']
  },
  mutations: {
    setAccess_token (state, value) {
      state.access_token = value
      api.setGlobalData({
        key: 'access_token',
        value
      })
    },
    setRefresh_token (state, value) {
      state.refresh_token = value
      api.setGlobalData({
        key: 'refresh_token',
        value
      })
    },
    setUser_info (state, value) {
      state.user_info = value
      api.setGlobalData({
        key: 'user_info',
        value
      })
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
    }
  },
  getters: {
    currentColor (state) {
      return state.colorList[state.colorIndex]
    }
  },
  actions: {
    login: async function ({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        Toast.loading({
          duration: 0,
          message: '正在登录中...'
        })
        login().then((res, reject) => {
          if (res.success) {
            const { data } = res
            commit('setAccess_token', data.access_token)
            commit('setRefresh_token', data.refresh_token)
            commit('setUser_info', data)
            Toast.clear()
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }
})

export default store
