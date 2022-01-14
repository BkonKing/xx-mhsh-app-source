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
  },
  // 2022-1-15 海丝文创广场 打卡活动
  {
    path: '/pages/activity/20220115activity',
    name: '20220115activity',
    component: () =>
      import(
        /* webpackChunkName: "activityService" */
        '@/views/activity/20220115'
      )
  }
]
export default activityRouter
