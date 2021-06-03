import Vue from 'vue'
import VueRouter from 'vue-router'

/* tabbar */
import Index from '../views/index/index.vue'

/* Router Modules */
import butlerRouter from './modules/butler'
import lifeRouter from './modules/life'
import neighboursRouter from './modules/neighbours'
import personageRouter from './modules/personage'
import activityRouter from './modules/activity'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/**
 * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
 * meta：{
 *  title: 页面标题，
 *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
 *  isTransition: 是否开启过渡动画
 * }
 */
const routes = [{
  path: '/',
  name: 'mainIndex',
  component: Index,
  meta: {
    keepAlive: true
  },
  children: [{
    path: '',
    name: 'home',
    component: () =>
      import(
        /* webpackChunkName: "home" */
        '@/views/home/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/life',
    name: 'life',
    component: () =>
      import(
        /* webpackChunkName: "life" */
        '@/views/life/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/butler',
    name: 'butler',
    component: () =>
      import(
        /* webpackChunkName: "butler" */
        '@/views/butler/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/neighbours',
    name: 'neighbours',
    component: () =>
      import(
        /* webpackChunkName: "neighbours" */
        '@/views/neighbours/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/personage',
    name: 'personage',
    component: () =>
      import(
        /* webpackChunkName: "personage" */
        '@/views/personage/index.vue'
      ),
    meta: {
      keepAlive: true
    }
  }]
},
{
  path: '/login',
  name: 'login',
  component: () =>
    import(
      /* webpackChunkName: "login" */
      '@/views/login/index.vue'
    )
},
{
  path: '/applist',
  name: 'applist',
  component: () =>
    import(
      /* webpackChunkName: "applist" */
      '@/views/home/applist.vue'
    )
},
{
  path: '/agreement',
  name: 'agreement',
  component: () =>
    import(
      /* webpackChunkName: "agreement" */
      '@/views/index/agreement.vue'
    )
},
{
  path: '/openingPage',
  name: 'openingPage',
  component: () =>
    import(
      /* webpackChunkName: "openingPage" */
      '@/views/index/openingPage.vue'
    )
},
{
  path: '/specialTopic',
  name: 'specialTopic', // 专题页
  component: () =>
    import(
      /* webpackChunkName: "specialTopic" */
      '@/views/index/special.vue'
    )
},
{
  path: '/specialMap',
  name: 'specialMap', // 专题地址
  component: () =>
    import(
      /* webpackChunkName: "specialMap" */
      '@/views/index/specialMap.vue'
    )
},
...butlerRouter,
...lifeRouter,
...neighboursRouter,
...personageRouter,
...activityRouter
]

const router = new VueRouter({
  routes
})

export default router
