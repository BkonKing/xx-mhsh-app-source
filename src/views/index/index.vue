<template>
  <div class="view-container">
    <van-nav-bar title="标题" :left-arrow="false" right-text="按钮" @click-right="onClickRight" />
    <van-button type="warning">警告按钮</van-button>
    <main class="view-main">
      <router-view />
    </main>
    <footer>
      <Tabbar :tabList="tabList"></Tabbar>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar, Notify, Button } from 'vant'
import Tabbar from './components/tabbar'

export default {
  components: {
    Tabbar,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Notify.Component.name]: Notify.Component
  },
  data () {
    return {
      codeScan: null,
      tabList: [
        {
          title: 'page01',
          path: '/'
        },
        {
          title: 'page02',
          path: '/page02'
        },
        {
          title: 'page03',
          path: '/page03'
        },
        {
          title: 'page04',
          path: '/page04'
        }
      ]
    }
  },
  created () {
    Notify({ type: 'warning', message: '通知内容', duration: 0 })
    this.codeScan = this.$api.require('codeScan')
  },
  methods: {
    onClickRight () {
      this.codeScan.scan(function (ret, err) {
        if (ret.status) {
          alert(ret.code)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.view-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.view-main {
  flex: 1;
  overflow: hidden;
  // 兼容安卓低版本浏览器
  height: calc(100% - 51px);
}
</style>
