import axios from 'axios'
import store from '@/store'
import router from '../router'
import qs from 'qs'
import {
  Toast,
  Dialog
} from 'vant'
import {
  clearUserInfo
} from '@/utils/util'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  // 201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求发送前
    const token = api.getPrefs({
      sync: true,
      key: 'access_token'
    })
    // 转换参数格式
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = token
    }
    if (!config.headers.ProjectId) {
      // 获取当前项目
      const project = store.getters.currentProject
      if (project) {
        config.headers.ProjectId = project.project_id
      } else if (store.getters.userInfo.project_id) {
        config.headers.ProjectId = store.getters.userInfo.project_id
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async response => {
    const {
      status,
      data,
      config
    } = response
    const {
      code,
      message
    } = data
    if (status == 401 || code == 401) {
      Dialog.alert({
        title: '提示',
        message: '登录信息已经过期了，请重新登录'
      }).then(() => {
        clearUserInfo()
        router.push('/login')
      })
      return Promise.reject(code)
    } else if (code != 200) {
      Toast(message || codeMessage[code])
      return Promise.reject(data || 'Error')
    } else {
      return config.headers.completeData ? response : data
    }
  }
)

export default service
