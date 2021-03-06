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
import eventBus from '@/utils/eventbus'
import { setStatisticsData, updateStatisticsData } from '@/utils/analysis.js'
import { pagesArr } from './const/pages.js'
import { swiperightWhiteList } from './const/whiteList'
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
      winHeight: 0,
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
    api.setStatusBarStyle({
      style: 'dark'
    })
    api.addEventListener(
      {
        name: 'swiperight'
      },
      (ret, err) => {
        if (
          this.$route.matched.length === 1 &&
          swiperightWhiteList.indexOf(this.$route.name) === -1 &&
          !haveImgPreview()
        ) {
          this.$router.go(-1)
        } else {
          eventBus.$emit('swiperight', ret, err)
        }
        // 查看是否有图片预览
        function haveImgPreview () {
          // 图片预览
          const imgPreviewEle = document.getElementsByClassName(
            'van-image-preview'
          )
          let imgPreviewStatus = false
          imgPreviewEle.forEach(el => {
            if (el.style.display !== 'none') {
              imgPreviewStatus = true
            }
          })
          return imgPreviewStatus
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
    this.winHeight = api.winHeight
    window.onresize = () => {
      if (api.winHeight === this.winHeight) {
        this.$store.commit('setWinResize', false)
      } else {
        this.$store.commit('setWinResize', true)
      }
    }
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
      // console.log(to, from)
      const len = this.historyList.length
      const lastPath = this.historyList[len - 2] // 上一次路由name
      const index = this.historyList.indexOf(to.fullPath) // 路由所在index
      // eslint-disable-next-line eqeqeq
      if (to.fullPath === lastPath && to.query.forward != '1') {
        const delIndex = this.historyList.indexOf(from.fullPath) // 返回页面路由所在的位置
        // 返回
        this.transitionName = 'slide-right'
        this.historyList.splice(delIndex)
      } else {
        // 进入第一个页面就会执行监听，所以第一个页面不需要动画
        len > 0 && (this.transitionName = 'slide-left')
        // 如果跳转页面是前面跳转过页面（historyList）中的页面，则删除这些页面
        index !== -1 && this.historyList.splice(index)
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
