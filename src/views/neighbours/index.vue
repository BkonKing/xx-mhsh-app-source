<template>
  <view class="tf-bg">
    <uni-nav-bar background-color="#fff" leftWidth="500px" rightWidth="200px" :statusBar="true">
      <view slot="left"><text class="">和谐邻里</text></view>
      <view class="tf-row" slot="right">
        <text class="tf-icon" @click="scan">{{ icon_scan }}</text>
        <view class="notice-box">
          <text class="tf-icon margin-left">{{ icon_mail }}</text>
          <uni-badge class="neighbours" text="26" type="error" v-if="status"></uni-badge>
        </view>
      </view>
    </uni-nav-bar>
    <uni-segmented-control
      style="background-color: #fff;"
      :current="current"
      :values="items"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#EB5841"
    ></uni-segmented-control>
    <view style="padding: 40px 20px;">
      <list>
        <cell>
          <view class="activity-cell">
            <image class="activity-image"></image>
            <text class="tf-status-tag">活动</text>
            <text></text>
            <text></text>
            <view>
              <text></text>
              <text></text>
            </view>
          </view>
          <view>
            <user-info>
              <text></text>
            </user-info>
            <text></text>
            <view>
              <image></image>
            </view>
            <view>
              <text></text>
              <text></text>
              <text></text>
            </view>
          </view>
          <view>
            <text></text>
            <image></image>
            <text></text>
            <view>
              <text></text>
              <text></text>
            </view>
          </view>
        </cell>
      </list>
    </view>
  </view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import uniBadge from '@/components/uni-badge/uni-badge.vue'
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
import UserInfo from '@/pages/components/user-info/index.nvue'
import { icon_location, icon_scan, icon_mail } from '@/pages/const/icon.js'
export default {
  components: {
    uniNavBar,
    uniBadge,
    uniSegmentedControl,
    UserInfo
  },
  data () {
    return {
      icon_location,
      icon_scan,
      icon_mail,
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
