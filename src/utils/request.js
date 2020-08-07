import axios from 'axios'
import store from '@/store'
import router from '../router'
import qs from 'qs'
import {
  Toast,
  Dialog
} from 'vant'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
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

// create an axios instance
const service = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求发送前
    // eslint-disable-next-line no-undef
    const token = api.getGlobalData('access_token')
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = 'Bearer ' + token
    }
    config.data = qs.stringify(config.data)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const {
      status,
      data: res,
      config
    } = response
    const {
      code
    } = res

    // if the custom code is not 20000, it is judged as an error.
    if (status == 401 || code == '401') {
      const isGetToken = config.url.indexOf('getToken') !== -1
      // const res = !isGetToken &&
      //   (await getToken({
      //     headers: {
      //       Authorization: getStore({
      //         name: 'refresh_token'
      //       }),
      //     },
      //   }));
      if (res.data.success) {
        const {
          data: info
        } = res
        api.setGlobalData({
          key: 'access_token',
          value: info.access_token
        })
        api.setGlobalData({
          key: 'refresh_token',
          value: info.refresh_token
        })
        Toast('请重新操作')
      } else {
        Dialog.alert({
          title: '提示',
          message: '登录信息已经过期了，请重新登录'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        router.replace({
          pathname: '/login'
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else if (code != '200') {
      Toast(codeMessage[code])
      return res
    } else {
      return res
    }
  }
)

export default service
