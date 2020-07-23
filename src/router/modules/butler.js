const butlerRouter = [
  /* 公告通知 */
  {
    path: '/pages/butler/notice/index',
    name: 'noticeIndex',
    component: () =>
      import(
        /* webpackChunkName: "noticeIndex" */
        '@/views/butler/notice/index.vue'
      )
  },
  {
    path: '/pages/butler/notice/details',
    name: 'noticeDetails',
    component: () =>
      import(
        /* webpackChunkName: "noticeDetails" */
        '@/views/butler/notice/details.vue'
      )
  },
  /* 报事报修 */
  {
    path: '/pages/butler/repairs/index',
    name: 'repairsIndex',
    component: () =>
      import(
        /* webpackChunkName: "repairsIndex" */
        '@/views/butler/repairs/index.vue'
      )
  },
  {
    path: '/pages/butler/repairs/details',
    name: 'repairsDetails',
    component: () =>
      import(
        /* webpackChunkName: "repairsDetails" */
        '@/views/butler/repairs/details.vue'
      )
  },
  /* 免费服务 */
  {
    path: '/pages/butler/freeserver/index',
    name: 'freeserverIndex',
    component: () =>
      import(
        /* webpackChunkName: "freeserverIndex" */
        '@/views/butler/freeserver/index.vue'
      )
  },
  {
    path: '/pages/butler/freeserver/list',
    name: 'freeserverList',
    component: () =>
      import(
        /* webpackChunkName: "freeserverList" */
        '@/views/butler/freeserver/list.vue'
      )
  },
  /* 呼叫物业 */
  {
    path: '/pages/butler/call-property/index',
    name: 'propertyIndex',
    component: () =>
      import(
        /* webpackChunkName: "propertyIndex" */
        '@/views/butler/call-property/index.vue'
      )
  },
  /* 便民电话 */
  {
    path: '/pages/butler/convenience-phone/index',
    name: 'convenienceIndex',
    component: () =>
      import(
        /* webpackChunkName: "convenienceIndex" */
        '@/views/butler/convenience-phone/index.vue'
      )
  }
]

export default butlerRouter
