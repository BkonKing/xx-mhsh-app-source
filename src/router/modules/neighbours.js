const neighboursRouter = [
  /* 发布 */
  {
    path: '/pages/neighbours/publish',
    name: 'neighboursPublish',
    component: () =>
      import(
        /* webpackChunkName: "neighboursPublish" */
        '@/views/neighbours/publish.vue'
      )
  },
  /* 详情 */
  {
    path: '/pages/neighbours/details',
    name: 'neighboursDetails',
    component: () =>
      import(
        /* webpackChunkName: "neighboursDetails" */
        '@/views/neighbours/details.vue'
      )
  },
  /* 小组列表 */
  {
    path: '/pages/neighbours/groupList',
    name: 'neighboursGroupList',
    component: () =>
      import(
        /* webpackChunkName: "neighboursGroupList" */
        '@/views/neighbours/groupList.vue'
      )
  },
  /* 回复页面 */
  {
    path: '/pages/neighbours/reply',
    name: 'neighboursReply',
    component: () =>
      import(
        /* webpackChunkName: "neighboursReply" */
        '@/views/neighbours/reply.vue'
      )
  }
]

export default neighboursRouter
