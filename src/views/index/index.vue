<template>
  <div class="view-container">
    <div class="view-main-container">
      <div class="placeholder-box" :style="{height: `${statusBarHeight}px`}"></div>
      <div class="view-main">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <footer>
      <Tabbar :tabList="tabList"></Tabbar>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from './components/tabbar'

export default {
  name: 'mainIndex',
  components: {
    Tabbar
  },
  data () {
    return {
      codeScan: null,
      statusBarHeight: 0,
      tabList: [
        {
          title: '首页',
          path: '/',
          icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '生活',
          path: '/life',
          icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '管家',
          path: '/butler',
          icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '邻里',
          path: '/neighbours',
          icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        },
        {
          title: '我的',
          path: '/personage',
          icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1048926945,1586672807&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  created () {},
  methods: {
    getStatusBarHeight () {
      const statusBar = this.$api.require('statusBar')
      this.statusBarHeight = statusBar.getStatusBarHeight()
    },
    onClickRight () {}
  }
}
</script>

<style lang="less" scoped>
.view-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.view-main-container {
  @flex-column();
  // flex: 1;
  overflow: hidden;
  // 兼容安卓低版本浏览器
  height: calc(100% - 98px);
}
.view-main {
  flex: 1;
  overflow: auto;
}
</style>
