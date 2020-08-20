<template>
  <div class="view-container tf-immersion">
    <div class="view-main-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar></Tabbar>
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
      statusBarHeight: 0
    }
  },
  created () {},
  methods: {
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
