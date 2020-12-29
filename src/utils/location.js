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
        title: '定位服务未开启',
        message: '为了提供更好服务，需要您开启定位',
        confirmButtonText: '开启'
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
