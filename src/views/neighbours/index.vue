<template>
  <div class="tf-bg">
    <van-nav-bar class="tf-nav-bar" left-text="和谐邻里" :left-arrow="false">
    <template #right>
      <div class="tf-row-vertical-center">
        <span class="tf-icon margin-left">{{ iconMail }}</span>
        <span v-if="status" class="van-info">2</span>
      </div>
    </template>
  </van-nav-bar>
    <van-tabs v-model="current" @click="onClickItem">
      <van-tab v-for="(item, i) in items" :key="i" :title="item"></van-tab>
    </van-tabs>
    <div style="padding: 40px 20px;">
      <list>
        <cell>
          <div class="activity-cell">
            <img class="activity-image">
            <div class="tf-status-tag">活动</div>
            <div></div>
            <div></div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <user-info>
              <div></div>
            </user-info>
            <div></div>
            <div>
              <img>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div></div>
            <img>
            <div></div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </cell>
      </list>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import UserInfo from '@/components/user-info/index.vue'
import { iconLocation, iconScan, iconMail } from '@/const/icon.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    UserInfo
  },
  data () {
    return {
      iconLocation,
      iconScan,
      iconMail,
      status: 1,
      items: ['最新', '小组', '活动', '资讯'],
      current: 0
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .activity-cell {
    width:710px;
    background: #fff;
    border-radius:10px;
    padding: 30px;
  }
  .tf-status-tag {
    top: 50px;
    right: 20px;
    width:120px;
    background-image:linear-gradient(to right,rgba(249,134,107,1),rgba(235,88,65,1));
  }
.activity-image {
  width:650px;
  height:365px;
  background-color: #F0F0F0;
}
</style>
