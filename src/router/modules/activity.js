const activityRouter = [
  {
    path: '/pages/activity/activity',
    name: 'activity',
    component: () =>
      import(
        /* webpackChunkName: "settingIndex" */
        '@/views/activity/activity'
      )
  }
]
export default activityRouter
