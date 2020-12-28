import {
  hasPermission,
  reqPermission
} from '@/utils/permission'
import { Dialog } from 'vant'

// 获取定位权限
export function getLocationPermission () {
  return new Promise((resolve, reject) => {
    const perms = hasPermission('location')
    if (!perms[0].granted) {
      Dialog.confirm({
        title: '提示',
        message: '没有开启定位权限，将无法使用签到功能，是否前往开启权限？',
        confirmButtonText: '去开启'
      })
        .then(res => {
          reqPermission('location', ({ list }) => {
            if (list[0].granted) {
              resolve()
            } else {
              reject(new Error(false))
            }
          })
        })
        .catch(() => {
          reject(new Error(false))
        })
    } else {
      resolve()
    }
  })
}
