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
  // 专题
  {
    path: '/activity/special',
    name: 'activitySpecial',
    component: () =>
      import(
        /* webpackChunkName: "activitySpecial" */
        '@/views/activity/special'
      ),
    meta: {
      keepAlive: true
    }
  },
  // 专题外部链接frame页面
  {
    path: '/activity/frame',
    name: 'activityFrame',
    component: () =>
      import(
        /* webpackChunkName: "activityFrame" */
        '@/views/activity/frame'
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
  },
  // 转盘抽奖 - 奖品核销
  {
    path: '/pages/activity/award/verification',
    name: 'awardVerification',
    component: () =>
      import(
        /* webpackChunkName: "awardVerification" */
        '@/views/activity/award/verification'
      )
  }
]
export default activityRouter
