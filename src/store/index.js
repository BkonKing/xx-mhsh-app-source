import Vue from 'vue'
import Vuex from 'vuex'
import {
  yzmLogin,
  pwdLogin,
  outLogin,
  refreshToken,
  getMyAccount
} from '@/api/user.js'
import {
  bindingHouse
} from '@/api/personage.js'
import {
  Toast,
  Dialog
} from 'vant'
import router from '@/router'
import {
  clearUserInfo
} from '@/utils/util'

Vue.use(Vuex)

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
    current_project: null,
    keepAliveList: ['mainIndex'],
    paddingTop: 0,
    paddingBottom: 0,
    temporaryType: undefined,
    mobile_info: '',
    map_info: '',
    share_params: '',
    groupInfo: '',
    winResize: false,
    taskFinishStatus: false
  },
  mutations: {
    setUser_info (state, value) {
      const val = (value && typeof value === 'string') ? JSON.parse(value) : value
      state.user_info = val
      api.setPrefs({
        key: 'user_info',
        value: val
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
    },
    setKeepAliveList (state, name) {
      if (state.keepAliveList.indexOf(name) === -1) {
        if (name === 'home' && state.keepAliveList.indexOf('mainIndex') === -1) {
          state.keepAliveList.push('mainIndex')
        }
        state.keepAliveList.push(name)
      }
    },
    deleteKeepAlive (state, name) {
      const index = state.keepAliveList.indexOf(name)
      if (index !== -1) {
        state.keepAliveList.splice(index, 1)
      }
    },
    clearKeepAlive (state) {
      state.keepAliveList = []
    },
    setPaddingTop (state, value) {
      state.paddingTop = value
    },
    setPaddingBottom (state, value) {
      state.paddingBottom = value
    },
    setTemporaryType (state, value) {
      state.temporaryType = value
    },
    setMobile_info (state, value) {
      state.mobile_info = value
    },
    setMap_info (state, value) {
      state.map_info = value
    },
    setShare_params (state, value) {
      state.share_params = value
    },
    setGroupInfo (state, value) {
      state.groupInfo = value
    },
    setWinResize (state, value) {
      state.winResize = value
    },
    setTaskFinishStatus (state, value) {
      state.taskFinishStatus = value
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
    },
    keepAlives (state) {
      return state.keepAliveList
    }
  },
  actions: {
    async outLogin ({
      commit
    }) {
      return await new Promise((resolve, reject) => {
        const loadingToast = Toast.loading({
          duration: 3000
        })
        outLogin().then((res) => {
          loadingToast.clear()
          if (res.success) {
            clearUserInfo()
            commit('clearKeepAlive')
            resolve()
          } else {
            reject(res)
          }
        }).catch(() => {
          loadingToast.clear()
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
          Toast('???????????????')
        }
      }).catch(err => {
        if (err == 401) {
          Dialog.alert({
            title: '??????',
            message: '?????????????????????????????????????????????'
          }).then(() => {
            clearUserInfo()
            router.push('/login')
          })
        }
        return err
      })
    },
    async getHouse ({
      commit
    }) {
      await bindingHouse().then(({
        data
      }) => {
        data && commit('setCurrentProject', data[0])
      }).catch(err => {
        console.log(err)
      })
    },
    // ??????????????????
    getMyAccount ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMyAccount().then(({
          data
        }) => {
          commit('setUser_info', data && data.user_info)
          let userList = api.getPrefs({
            key: 'user_list',
            sync: true
          }) || {}
          userList = typeof userList === 'string' ? JSON.parse(userList) : userList
          userList[data.user_info.id] = data.user_info
          api.setPrefs({
            key: 'user_list',
            value: userList
          })
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default new Vuex.Store(store)
