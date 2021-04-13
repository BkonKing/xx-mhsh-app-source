const taskRouter = [
  // 选择发布类型
  {
    path: '/pages/task/release/type',
    name: 'releaseType',
    component: () =>
      import(
        /* webpackChunkName: "releaseType" */
        '@/views/task/release/select-type'
      )
  },
  // 发布/修改任务
  {
    path: '/pages/task/release/edit',
    name: 'releaseEdit',
    component: () =>
      import(
        /* webpackChunkName: "releaseEdit" */
        '@/views/task/release/edit'
      )
  },
  // 交易规则
  {
    path: '/pages/task/release/rule',
    name: 'releaseRule',
    component: () =>
      import(
        /* webpackChunkName: "releaseRule" */
        '@/views/task/release/rule'
      )
  },
  // 任务详情-任务方
  {
    path: '/pages/task/detail/initiator',
    name: 'detailInitiator',
    component: () =>
      import(
        /* webpackChunkName: "detailInitiator" */
        '@/views/task/detail/initiator'
      )
  },
  // 任务详情-接单方
  {
    path: '/pages/task/detail/receiver',
    name: 'detailReceiver',
    component: () =>
      import(
        /* webpackChunkName: "detailReceiver" */
        '@/views/task/detail/receiver'
      )
  },
  // 任务进度-任务方
  {
    path: '/pages/task/schedule/initiator',
    name: 'scheduleInitiator',
    component: () =>
      import(
        /* webpackChunkName: "scheduleInitiator" */
        '@/views/task/schedule/initiator'
      )
  },
  // 任务进度-接单方
  {
    path: '/pages/task/schedule/receiver',
    name: 'scheduleReceiver',
    component: () =>
      import(
        /* webpackChunkName: "scheduleReceiver" */
        '@/views/task/schedule/receiver'
      )
  },
  // 交付任务
  {
    path: '/pages/task/operate/deliver',
    name: 'operateDeliver',
    component: () =>
      import(
        /* webpackChunkName: "operateDeliver" */
        '@/views/task/operate/deliver'
      )
  },
  // 确认完成
  {
    path: '/pages/task/operate/finish',
    name: 'operateFinish',
    component: () =>
      import(
        /* webpackChunkName: "operateFinish" */
        '@/views/task/operate/finish'
      )
  },
  // 提问
  {
    path: '/pages/task/operate/quiz',
    name: 'operateQuiz',
    component: () =>
      import(
        /* webpackChunkName: "operateQuiz" */
        '@/views/task/operate/quiz'
      )
  },
  // 投诉-任务
  {
    path: '/pages/task/operate/complaint',
    name: 'operateComplaint',
    component: () =>
      import(
        /* webpackChunkName: "operateComplaint" */
        '@/views/task/operate/complaint'
      )
  },
  // 评价-任务
  {
    path: '/pages/task/operate/evaluate',
    name: 'operateEvaluate',
    component: () =>
      import(
        /* webpackChunkName: "operateEvaluate" */
        '@/views/task/operate/evaluate'
      )
  },
  // 完成地点
  {
    path: '/pages/task/operate/locale',
    name: 'operateLocale',
    component: () =>
      import(
        /* webpackChunkName: "operateLocale" */
        '@/views/task/operate/locale'
      )
  }
]
export default taskRouter
