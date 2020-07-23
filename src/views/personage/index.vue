<template>
  <div class="tf-screen">
    <uni-nav-bar>
      <div class="tf-row" slot="right">
        <text class="tf-icon" @click="goSetting">{{ icon_setting }}</text>
        <text class="tf-icon margin-left" @click="goMessage">{{ icon_message }}</text>
        <uni-badge class="badge" text="2" type="error" @click="bindClick"></uni-badge>
      </div>
    </uni-nav-bar>
    <div class="tf-bg-white">
      <div class="tf-row tf-padding-lg" @click="goInformation">
        <img class="personage-info__avatar" src="/static/app-icon.png" mode="aspectFit">
        <div class="personage-info--base">
          <div class="user-info-box">
            <text class="user-name">这是一个默认昵</text>
            <uni-tag class="user-role" text="业主" type="error" :inverted="true" size="small"></uni-tag>
            <uni-tag class="user-role" text="管理员" type="success" :inverted="true" size="small"></uni-tag>
            <uni-tag class="user-role" text="维修员" type="primary" :inverted="true" size="small"></uni-tag>
          </div>
          <text class="user-address">5座7B单元-1001</text>
        </div>
      </div>
      <div class="tf-row coin-box">
        <div class="tf-flex-item" @click="goHappiness">
          <text class="user-text--lg">90000</text>
          <text class="user-text--grey">幸福币</text>
        </div>
        <div class="tf-flex-item">
          <text class="user-text--lg">26</text>
          <text class="user-text--grey">优惠券</text>
        </div>
        <div class="tf-flex-item tf-flex-center">
          <button :class="['user-btn', signStatus ? 'user-btn--unsign' : 'user-btn--signin']" @click="sign">
            <text class="user-btn__text" :style="({ color: signStatus ? '#8F8F94' : '#fff' })">签到</text>
          </button>
        </div>
      </div>
    </div>
    <scroll-div :scroll-y="true">
      <div class="tf-bg">
        <div class="module-box">
          <text class="module-title">事务处理</text>
          <div class="tf-padding-base">
            <div class="tf-row manage-border-bottom">
              <div class="manage-box manage-border-right" @click="goTransaction(1)">
                <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
                <text class="text-sm">待处理</text>
                <uni-badge class="personage-badge" text="3" type="error" :inverted="true"></uni-badge>
              </div>
              <div class="manage-box" @click="goTransaction(2)">
                <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
                <text class="text-sm">待分派</text>
              </div>
            </div>
            <div class="tf-row">
              <div class="manage-box manage-border-right" @click="goTransaction(3)">
                <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
                <text class="text-sm">待结案</text>
              </div>
              <div class="manage-box" @click="goTransaction(4)">
                <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
                <text class="text-sm">已结案</text>
              </div>
            </div>
          </div>
        </div>
        <div class="module-box" @click="goOrder">
          <text class="module-title">我的订单</text>
          <div class="tf-row">
            <div class="order-box">
              <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
              <text class="text-sm">待付款</text>
            </div>
            <div class="order-box">
              <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
              <text class="text-sm">待发货</text>
            </div>
            <div class="order-box">
              <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
              <text class="text-sm">待收货</text>
            </div>
            <div class="order-box">
              <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
              <text class="text-sm">退换</text>
            </div>
            <div class="order-box">
              <image class="manage-image" src="/static/tabbar/me.png" mode="aspectFit"></image>
              <text class="text-sm">全部</text>
            </div>
          </div>
        </div>
        <uni-list class="personage-list tf-mb-lg">
          <uni-list-item title="我的订单" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
          <uni-list-item title="我的互动" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
          <uni-list-item title="我的资料" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @click="goInformation"></uni-list-item>
          <uni-list-item title="幸福基金" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
        </uni-list>
        <uni-list class="personage-list">
          <uni-list-item title="常见问题" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
          <uni-list-item title="意见反馈" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @click="goFeedback"></uni-list-item>
        </uni-list>
      </div>
    </scroll-div>
  </div>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import uniBadge from '@/components/uni-badge/uni-badge.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
import { icon_setting, icon_message } from '../const/icon.js'
export default {
  components: {
    uniNavBar,
    uniBadge,
    uniList,
    uniListItem,
    uniTag
  },
  data () {
    return {
      icon_setting,
      icon_message,
      signStatus: false
    }
  },
  methods: {
    sign () {
      if (!this.signStatus) {
        uni.showToast({
          icon: 'none',
          title: '签到成功   幸福币+10'
        })
      } else {
        // 已签到，弹出签到日历
      }
    },
    goSetting () {
      uni.navigateTo({
        url: '/pages/personage/setting/index'
      })
    },
    goMessage () {
      uni.navigateTo({
        url: '/pages/personage/message/index'
      })
    },
    goInformation () {
      uni.navigateTo({
        url: '/pages/personage/information/index'
      })
    },
    goOrder () {
      uni.navigateTo({
        url: '/pages/personage/order-form/index'
      })
    },
    goTransaction (type) {
      const url = `/pages/personage/transaction/index?type=${type}`
      uni.navigateTo({
        url
      })
    },
    // 意见反馈
    goFeedback () {
      uni.navigateTo({
        url: '/pages/personage/feedback/index'
      })
    },
    // 幸福币
    goHappiness () {
      uni.navigateTo({
        url: '/pages/personage/happiness-coin/index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-icon {
  width: 44px;
  font-size: 44px;
  color: @gray-8;
  margin-left: 10px;
}

.badge {
  width: 34px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  left: -20px;
  top: 0;
}

.personage-info--base {
  justify-content: space-around;
}

.personage-info__avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-right: @padding-md;
}

.user-info-box {
  flex-direction: row;
  align-items: center;
}

.user-name {
  font-size: 34px;
  font-weight: 500;
  color: @text-color;
}

.user-role {
  margin-left: 10px;
}

.user-address {
  font-size: 26px;
  color: @gray-7;
}

.user-text--lg {
  text-align: center;
  font-size: 54px;
  line-height: 54px;
  margin-bottom: 20px;
}

.user-text--grey {
  text-align: center;
  line-height: 24px;
  font-size: 24px;
  color: @gray-7;
}
.coin-box {
  padding: 40px 20px;
}

.module-box {
  width: 710px;
  padding: 0 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #fff;
}
.module-title {
  font-size: 30px;
  font-weight: 500;
  height: 90px;
  line-height: 90px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: @divider-color;
}

.user-btn {
  width: 200px;
  height: 66px;
  line-height: 66px;
  border-radius: 33px;
  border-width: 0;
}
.user-btn--signin {
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
.user-btn--unsign {
  background-image: none;
  background-color: #f2f2f4;
  color: @gray-7;
}
.user-btn__text {
  font-size: 30px;
  line-height: 66px;
}
.manage-box {
  flex: 1;
  height: 144px;
  justify-content: center;
  align-items: center;
}
.personage-list {
  width: 710px;
  background-color: #fff;
  border-radius: 8px;
}
.order-box {
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 174px;
}
.text-sm {
  font-size: 24px;
}
.margin-left {
  margin-left: 32px;
}
.tf-bg {
  padding: 30px 20px;
}
.manage-image {
  width: 60px;
  height: 35px;
  margin-bottom: 20px;
}
.manage-border-right {
  border-right-width: 2px;
  border-right-style: dashed;
  border-right-color: @divider-color;
}
.manage-border-bottom {
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  border-bottom-color: @divider-color;
}
.personage-badge {
  position: absolute;
  top: 0;
  right: 20px;
  height: 34px;
  line-height: 32px;
  border-width: 1px;
  border-style: solid;
  border-color: @red-dark;
  border-radius: 50%;
}
</style>
