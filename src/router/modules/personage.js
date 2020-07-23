const personageRouter = [
  /* 设置 */
  {
    path: '/pages/personage/setting/index',
    name: 'settingIndex',
    component: () =>
      import(
        /* webpackChunkName: "settingIndex" */
        '@/views/personage/setting/index.vue'
      )
  },
  /* 切换账号 */
  {
    path: '/pages/personage/setting/account',
    name: 'settingAccount',
    component: () =>
      import(
        /* webpackChunkName: "settingAccount" */
        '@/views/personage/setting/account.vue'
      )
  },
  /* 个人资料 */
  {
    path: '/pages/personage/information/index',
    name: 'informationIndex',
    component: () =>
      import(
        /* webpackChunkName: "informationIndex" */
        '@/views/personage/information/index.vue'
      )
  },
  /* 新增房产 */
  {
    path: '/pages/personage/house/attestation',
    name: 'houseAttestation',
    component: () =>
      import(
        /* webpackChunkName: "houseAttestation" */
        '@/views/personage/house/attestation.vue'
      )
  },
  /* 选择小区 */
  {
    path: '/pages/personage/house/select-community',
    name: 'houSeselectCommunity',
    component: () =>
      import(
        /* webpackChunkName: "houSeselectCommunity" */
        '@/views/personage/house/select-community.vue'
      )
  },
  /* 选择房产 */
  {
    path: '/pages/personage/house/select-house',
    name: 'houSeselectHouse',
    component: () =>
      import(
        /* webpackChunkName: "houSeselectHouse" */
        '@/views/personage/house/select-house.vue'
      )
  },
  /* 手机验证 */
  {
    path: '/pages/personage/information/phone',
    name: 'informationPhone',
    component: () =>
      import(
        /* webpackChunkName: "informationPhone" */
        '@/views/personage/information/phone.vue'
      )
  }
]

export default personageRouter
