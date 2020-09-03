<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="幸福币记录"
      :fixed="true"
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <van-tabs class="tf-body-container" v-model="current">
      <van-tab title="全部">
        <list
          class="coin-list"
          key="list1"
          :data.sync="list1"
          :load="({pages}) => getCreditsLog(pages, 0)"
        ></list>
      </van-tab>
      <van-tab title="获得">
        <list
          class="coin-list"
          key="list2"
          :data.sync="list2"
          :load="({pages}) => getCreditsLog(pages, 1)"
        ></list>
      </van-tab>
      <van-tab title="使用">
        <list
          class="coin-list"
          key="list3"
          :data.sync="list3"
          :load="({pages}) => getCreditsLog(pages, 2)"
        ></list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import list from './components/list'
import { getCreditsLog } from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    list
  },
  data () {
    return {
      current: 0,
      list1: [],
      list2: [],
      list3: []
    }
  },
  methods: {
    getCreditsLog (pages, type) {
      return getCreditsLog({
        pages,
        trans_type: type
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coin-list {
  width: 710px !important;
  // padding: 0 10px;
  margin: 30px 20px;
  background-color: #fff;
  border-radius: 10px;
}
.tf-body-container {
  @flex-column();
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    // .van-tab__pane {
    //   height: 100%;
    //   padding: 30px 0;
    // }
  }
}
</style>
