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
        <van-tab v-for="(item, i) in items" :key="i" :title="item" @click="onLoad"></van-tab>
      </van-tabs>
      <div class="coin-list">
        <refreshList :list.sync="list" @load="onLoad">
          <template v-slot="{item}">
            <div class="coin-list-item">
              <div class="coin-list-item-left">
                <div class="coin-list-item__name">{{item.name}}</div>
                <div class="coin-list-item__time">{{item.time}}</div>
              </div>
              <div class="coin-list-item__number">{{item.number}}</div>
            </div>
          </template>
        </refreshList>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import refreshList from '@/components/tf-refresh-list'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    refreshList
  },
  data () {
    return {
      items: ['全部', '获得', '使用'],
      current: 0,
      list: [
        {
          id: 1,
          name: '签到送积分',
          time: '2020-07-07 12:00:00',
          number: '+1'
        },
        {
          id: 1,
          name: '签到送积分',
          time: '2020-07-07 12:00:00',
          number: '+1'
        }
      ]
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
.coin-list-item {
  @flex();
  justify-content: space-between;
  align-items: center;
  // height: 144px;
  padding: 20px 0 30px 0;
  border-bottom: 1px solid @divider-color;
}
.coin-list-item-left {
  height: 84px;
  justify-content: space-between;
}
.coin-list-item__name {
  font-size: 30px;
  margin-bottom: 8px;
}
.coin-list-item__time {
  font-size: 24px;
  color: @gray-7;
}
.coin-list-item__number {
  font-size: 38px;
  font-weight: 500;
  color: @gray-7;
}
.coin-list-item__number--add {
  color: @red-dark;
}
.tf-main-container {
  @flex-column();
}
</style>
