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
  }
]

export default neighboursRouter
