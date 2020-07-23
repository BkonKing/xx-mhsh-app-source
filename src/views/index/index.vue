<template>
  <div class="view-container">
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
import Tabbar from './components/tabbar'

export default {
  components: {
    Tabbar
  },
  data () {
    return {
      codeScan: null,
      tabList: [
        {
          title: '首页',
          path: '/'
        },
        {
          title: '生活',
          path: '/life'
        },
        {
          title: '管家',
          path: '/butler'
        },
        {
          title: '邻里',
          path: '/neighbours'
        },
        {
          title: '我的',
          path: '/personage'
        }
      ]
    }
  },
  created () {
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
  // flex: 1;
  overflow: hidden;
  // 兼容安卓低版本浏览器
  height: calc(100% - 98px);
}
</style>
