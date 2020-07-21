import Vue from 'vue'
import VueRouter from 'vue-router'

// tarBar ----- 子页面
import Index from '../views/index/index.vue'

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
  component: Index,
  children: [{
    path: '',
    name: 'page01',
    component: () =>
      import(
        /* webpackChunkName: "page01" */
        '@/views/page/page01.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/page02',
    name: 'page02',
    component: () =>
      import(
        /* webpackChunkName: "page02" */
        '@/views/page/page02.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/page03',
    name: 'page03',
    component: () =>
      import(
        /* webpackChunkName: "page03" */
        '@/views/page/page03.vue'
      ),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/page04',
    name: 'page04',
    component: () =>
      import(
        /* webpackChunkName: "page04" */
        '@/views/page/page04.vue'
      ),
    meta: {
      keepAlive: true
    }
  }]
}]

const router = new VueRouter({
  routes
})

export default router
