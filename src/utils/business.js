import { Dialog } from 'vant'
import router from '../router'

export function bulterPermission (to, from, next, userType, userInfo, fn) {
  const butlerList = [
    'entranceIndex',
    'noticeIndex',
    'repairsIndex',
    'freeserverIndex',
    'visitorIndex',
    'compraiseIndex',
    'questionnaireIndex',
    'propertyIndex',
    'convenienceIndex',
    'noticeDetails'
  ]
  if (userType == 0 && butlerList.indexOf(to.name) !== -1) {
    if (userInfo.bsbx_allots === '1' && to.name === 'repairsIndex') {
      next()
      return
    }
    Dialog.confirm({
      title: '提示',
      message: '您尚未认证房间，是否去认证？',
      confirmButtonText: '去认证'
    }).then((res) => {
      router.push(
        '/pages/personage/house/attestation?type=1&mode=0&select=1'
      )
    }).catch(() => {})
    next(false)
  } else {
    if (fn) {
      fn()
    } else {
      next()
    }
  }
}
