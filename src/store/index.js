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
  getOtherAgreement
} from '@/api/home'
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
    otherAgreement: null
  },
  mutations: {
    setUser_info (state, value) {
      state.user_info = value
      api.setPrefs({
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
        state.keepAliveList.push(name)
      }
    },
    deleteKeepAlive (state, name) {
      const index = state.keepAliveList.indexOf(name)
      if (index !== -1) {
        state.keepAliveList.splice(index, 1)
      }
    },
    setPaddingTop (state, value) {
      state.paddingTop = value
    },
    setPaddingBottom (state, value) {
      state.paddingBottom = value
    },
    setOtherAgreement (state, value) {
      state.otherAgreement = value
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
    },
    otherAgreement (state) {
      return state.otherAgreement
    }
  },
  actions: {
    login ({
      commit,
      state,
      dispatch
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
            if (process.env.VUE_APP_IS_APP === '1') {
              const ajParams = {
                alias: data.id
              }
              Vue.prototype.ajpush.bindAliasAndTags(ajParams, (ret) => {
                if (ret && ret.statusCode) {
                  // alert(ret)
                }
              })
            }
            api.setPrefs({
              key: 'access_token',
              value: data.access_token
            })
            api.setPrefs({
              key: 'refresh_token',
              value: data.refresh_token
            })
            // api.setPrefs({
            //   key: 'user_info',
            //   value: data
            // })
            commit('setUser_info', data)
            // dispatch('getHouse')
            // dispatch('getMyAccount')
            resolve(data)
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
            clearUserInfo()
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
      const {
        data
      } = await bindingHouse()
      data && commit('setCurrentProject', data[0])
    },
    getMyAccount ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMyAccount().then(({
          data
        }) => {
          commit('setUser_info', data && data.user_info)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getOtherAgreement ({
      commit
    }) {
      getOtherAgreement().then(({ data }) => {
        commit('setOtherAgreement', data || {})
      })
    }
  }
}

export default new Vuex.Store(store)
