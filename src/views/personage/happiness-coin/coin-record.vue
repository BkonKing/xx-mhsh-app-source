<template>
  <div class="tf-bg">
    <van-nav-bar
      title="幸福币记录"
      :fixed="true"
      left-arrow
      :border="false"
      @click-left="$router.go(-1)"
    />
    <div class="tf-main-container">
      <van-tabs v-model="current">
        <van-tab title="全部">
          <div class="coin-list">
            <list :data.sync="list1" :load="onLoad"></list>
          </div>
        </van-tab>
        <van-tab title="获得">
          <list :data.sync="list2" :load="onLoad"></list>
        </van-tab>
        <van-tab title="使用">
          <list :data.sync="list3" :load="onLoad"></list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import list from './components/list'
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
      list1: [
        {
          id: 1,
          type: 1,
          name: '签到送积分',
          time: '2020-07-07 12:00:00',
          number: '1',
          status: 1
        },
        {
          id: 2,
          type: 2,
          name: '签到送积分',
          time: '2020-07-07 12:00:00',
          number: '1',
          status: 0
        }
      ],
      list2: [],
      list3: []
    }
  },
  methods: {
    onLoad () {}
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
