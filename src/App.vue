<template>
  <div class="app" id="app">
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import router from './router'
// import api from './api/index'
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      keepAlive: []
    }
  },
  created () {
    // this.$api.alert(
    //   {
    //     title: '静默更新',
    //     msg: '可行'
    //   }
    // )
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes)
    // 记录路由,动态给定动画
    this.$navigation.on('forward', to => {
      this.transitionName = to.route.meta.isTransition ? 'slide-left' : ''
    })
    this.$navigation.on('back', (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
    })
  },
  mounted () {
    // console.log(this.keepAlive) // 设置缓存匹配
    // console.log(this.$APICLOUD) // 只有在apicloud环境下才能获取
    // 接口调用
    // api.getTodayFortune({ typeid: 1 }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    setRouteKeepAlive (routes) {
      routes.map((item, i) => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children)
        }
        if (item.meta && item.meta.keepAlive) {
          this.keepAlive.push(item.name)
        }
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

/*导航栏标题*/
.bar-empty {
  height: 88px;
}
.order-bar .van-nav-bar {
  background-image: linear-gradient(to right, #f9866b, #eb5841);
  z-index: 99;
}
.bar-flash.order-bar .van-nav-bar {
  background-image: linear-gradient(to right, #ffa912, #ffa812);
}
.bar-nobg.order-bar .van-nav-bar {
  background-color: rgba(0,0,0,0);
  background-image: none;
}
.order-bar .van-nav-bar .van-nav-bar__title {
  color: #fefefe;
  font-weight: bold;
  font-size: 34px;
}
.order-bar .van-icon-arrow-left::before {
  color: #fff;
  font-size: 36px;
}
.bar-white.order-bar .van-nav-bar {
  background-image: none;
}
.bar-white.order-bar .van-nav-bar .van-nav-bar__title {
  color: #222;
}
.bar-white.order-bar .van-icon-arrow-left::before {
  color: #222;
}
</style>
