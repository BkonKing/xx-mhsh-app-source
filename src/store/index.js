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
  clearUserInfo,
  bMapGetLocationInfo
} from '@/utils/util'
import { bindAliasAndTags } from '@/utils/ajpush'

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
    otherAgreement: null,
    temporaryType: undefined,
    mobile_info: '',
    map_info: '',
    share_params: ''
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
        Toast.allowMultiple()
        const loadingToast = Toast.loading({
          duration: 0,
          message: '正在登录中'
        })
        const loginUrl = type === 1 ? yzmLogin : pwdLogin
        bMapGetLocationInfo().then((ret) => {
          const locationInfo = {
            lon: ret.lon, // 数字类型；经度
            lat: ret.lat, // 数字类型；纬度
            province: ret.province, // 字符串类型；省份
            cityCode: ret.cityCode, // 字符串类型；城市编码
            city: ret.city, // 字符串类型；城市
            district: ret.district, // 字符串类型；县区
            streetName: ret.streetName// 字符串类型；街道名
          }
          const newParams = { ...locationInfo, ...params }
          api.setPrefs({
            key: 'location_info',
            value: locationInfo
          })
          toLogin(newParams)
        }).catch(() => {
          toLogin(params)
        })
        function toLogin (newParams) {
          loginUrl(newParams).then(async (res) => {
            if (res.success) {
              const {
                data
              } = res
              if (process.env.VUE_APP_IS_APP === '1') {
                bindAliasAndTags(data.id)
              }
              api.setPrefs({
                key: 'access_token',
                value: data.access_token
              })
              api.setPrefs({
                key: 'refresh_token',
                value: data.refresh_token
              })
              let tokenList = api.getPrefs({
                key: 'token_list',
                sync: true
              }) || {}
              tokenList = typeof tokenList === 'string' ? JSON.parse(tokenList) : tokenList
              tokenList[data.id] = data.access_token
              api.setPrefs({
                key: 'token_list',
                value: tokenList
              })
              commit('setUser_info', data)
              // dispatch('getHouse')
              // dispatch('getMyAccount')
              await dispatch('getHouse')
              resolve(data)
            } else {
              reject(res.message)
            }
            loadingToast.clear()
          }).catch((error) => {
            loadingToast.clear()
            reject(error.message)
          })
        }
      })
    },
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
      await bindingHouse().then(({
        data
      }) => {
        data && commit('setCurrentProject', data[0])
      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新用户信息
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
    },
    getOtherAgreement ({
      commit
    }) {
      getOtherAgreement().then(({
        data
      }) => {
        commit('setOtherAgreement', data || {})
      })
    }
  }
}

export default new Vuex.Store(store)
