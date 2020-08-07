<template>
  <div class="app" id="app">
    <div class="w100" :style="{height: `${paddingTop}px`}"></div>
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="w100" :style="{height: `${paddingBottom}px`}"></div>
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
      keepAlive: [],
      historyList: [],
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  created () {
    const userInfo = api.getGlobalData({
      key: 'user_info'
    })
    userInfo && this.$store.commit('setUser_info', JSON.parse(userInfo))
    // 看是否有当前项目
    const currentProject = api.getGlobalData({
      key: 'currentProject'
    })
    currentProject && this.$store.commit('setCurrentProject', JSON.parse(currentProject))
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes)
  },
  mounted () {
    // 接口调用
    // api.getTodayFortune({ typeid: 1 }).then(res => {
    //   console.log(res)
    // })
    this.paddingTop = api.safeArea.top
    this.paddingBottom = api.safeArea.bottom
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
  },
  watch: {
    $route (to, from) {
      // console.log(to)
      // console.log(from)
      // const index = this.historyList.indexOf(to.name)
      const len = this.historyList.length
      const lastPath = this.historyList[len - 2] // 上一次路由name
      // eslint-disable-next-line eqeqeq
      if (to.fullPath === lastPath && to.query.forward != '1') {
        // 返回
        const delIndex = this.historyList.indexOf(from.fullPath)
        this.transitionName = 'slide-right'
        this.historyList.splice(delIndex)
      } else {
        if (this.historyList.length > 0) {
          this.transitionName = 'slide-left'
        }
        const index = this.historyList.indexOf(to.fullPath)
        if (index !== -1) {
          this.historyList.splice(index)
        }
        to.fullPath && this.historyList.push(to.fullPath)
      }
      // console.log(this.historyList)
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
.w100 {
  width: 100%;
  background: #fff;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
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
  background-color: rgba(0, 0, 0, 0);
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
//轮播
.life-swipe .van-swipe__indicator {
  width: 10px;
  height: 10px;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}
</style>
