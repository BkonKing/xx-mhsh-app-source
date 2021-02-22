<template>
  <div class="app" id="app" :style="[{ 'padding-top': `${paddingTop}px` }]">
    <transition
      :name="transitionName"
      v-on:before-enter="beforeEnter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:after-leave="afterLeave"
    >
      <keep-alive :max="10" :include="keepAlives">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '@/api/eventbus'
import { setStatisticsData, updateStatisticsData } from '@/utils/analysis.js'
import { pagesArr } from './const/pages.js'
// import api from './api/index'
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      keepAlive: [],
      historyList: [],
      paddingTop: 0,
      paddingBottom: 0,
      mobile_info: {}
    }
  },
  computed: {
    ...mapGetters(['keepAlives'])
  },
  created () {
    const userInfo = api.getPrefs({
      key: 'user_info',
      sync: true
    })
    userInfo && this.$store.commit('setUser_info', userInfo)
    this.$store.dispatch('getOtherAgreement')
    api.setStatusBarStyle({
      style: 'dark'
    })
    const whiteList = [
      'goodsDetail',
      'orderList',
      'flashPurchase',
      'life',
      'interactionIndex',
      'waterElectricityMeter',
      'movieCinemaDetails',
      'movieSeat',
      'movieIndex'
    ]
    api.addEventListener(
      {
        name: 'swiperight'
      },
      (ret, err) => {
        if (
          this.$route.matched.length === 1 &&
          whiteList.indexOf(this.$route.name) === -1
        ) {
          this.$router.go(-1)
        } else {
          eventBus.$emit('swiperight', ret, err)
        }
      }
    )
    this.paddingTop = api.safeArea.top
    this.$store.commit('setPaddingTop', this.paddingTop)
    this.paddingBottom = api.safeArea.bottom
    this.$store.commit('setPaddingBottom', this.paddingBottom)
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    // this.setRouteKeepAlive(router.options.routes)
    // 应用升级
    setStatisticsData(5)
    // 应用从后台回到前台事件/进入应用
    eventBus.$on('resume', () => {
      setStatisticsData(1)
      setStatisticsData(6, { type: 1, page_id: pagesArr[this.$route.name] })
    })
    // 应用进入后台事件/离开应用
    eventBus.$on('pause', () => {
      updateStatisticsData(1)
      setStatisticsData(6, { type: 2, page_id: pagesArr[this.$route.name] })
    })
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
    },
    // --------
    // 进入中
    // --------
    beforeEnter (el) {
      if (el.className.indexOf('tf-immersion') === -1) {
        el.style.top = `${this.paddingTop}px`
      } else {
        el.children[0].style.paddingTop = `${this.paddingTop}px`
      }
      el.style.height = 'auto'
    },
    afterEnter (el) {
      if (el.className.indexOf('tf-immersion') > -1) {
        el.children[0].style.paddingTop = ''
      } else {
        el.style.top = ''
      }
      el.style.height = ''
    },
    // --------
    // 离开时
    // --------
    beforeLeave (el) {
      if (el.className.indexOf('tf-immersion') === -1) {
        el.style.top = `${this.paddingTop}px`
      } else {
        el.children[0].style.paddingTop = `${this.paddingTop}px`
      }
      el.style.height = 'auto'
    },
    afterLeave (el) {
      if (el.className.indexOf('tf-immersion') > -1) {
        el.children[0].style.paddingTop = ''
      }
      el.style.height = ''
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
  background-color: #fff;
}
body::-webkit-scrollbar {
  //隐藏滚动条
  display: none;
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
  position: fixed;
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
  background-image: linear-gradient(to top, #38b3ef, #26a2fb);
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
