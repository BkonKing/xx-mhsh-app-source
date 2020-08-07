import {
  yzmLogin,
  pwdLogin,
  outLogin
} from '@/api/user.js'
import {
  Toast
} from 'vant'
import router from '@/router'

if (!window.api) {
  window.api = {
    getGlobalData (obj) {
      const {
        key: name
      } = obj
      const strcookie = document.cookie // 获取cookie字符串
      const arrcookie = strcookie.split('; ') // 分割
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
      document.cookie = name + '=' + JSON.stringify(value) + ';path=/;'
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
      api.setGlobalData({
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
            api.setGlobalData({
              key: 'access_token',
              value: data.access_token
            })
            api.setGlobalData({
              key: 'refresh_token',
              value: data.refresh_token
            })
            api.setGlobalData({
              key: 'user_info',
              value: data
            })
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
            api.setGlobalData({
              key: 'user_info',
              value: null
            })
            api.setGlobalData({
              key: 'access_token',
              value: undefined
            })
            api.setGlobalData({
              key: 'refresh_token',
              value: undefined
            })
            router.push('/login')
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }
}
// module.exports = store

export default store
