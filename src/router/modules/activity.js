const activityRouter = [
  {
    path: '/pages/activity',
    name: 'activity',
    component: () =>
      import(
        /* webpackChunkName: "activityIndex" */
        '@/views/activity/activity'
      )
  },
  // 积分发放/核销
  {
    path: '/pages/activity/service',
    name: 'activityService',
    component: () =>
      import(
        /* webpackChunkName: "activityService" */
        '@/views/activity/service'
      )
  }
]
export default activityRouter
