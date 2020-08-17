<template>
  <div class="tf-bg">
    <van-nav-bar
      title="幸福币记录"
      :fixed="true"
      placeholder
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab title="全部">
          <div class="coin-list">
            <list key="list1" :data.sync="list1" :load="({pageNum}) => getCreditsLog(pageNum, 0)"></list>
          </div>
        </van-tab>
        <van-tab title="获得">
          <div class="coin-list">
            <list key="list2" :data.sync="list2" :load="({pageNum}) => getCreditsLog(pageNum, 1)"></list>
          </div>
        </van-tab>
        <van-tab title="使用">
          <div class="coin-list">
            <list key="list3" :data.sync="list3" :load="({pageNum}) => getCreditsLog(pageNum, 2)"></list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
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
    getCreditsLog (page, type) {
      return getCreditsLog({
        page,
        trans_type: type
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coin-list {
  width: 710px;
  padding: 0 10px;
  margin: 30px 20px;
  background-color: #fff;
  border-radius: 10px;
}
.tf-main-container {
  @flex-column();
}
</style>
