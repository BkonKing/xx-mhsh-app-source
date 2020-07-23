<template>
  <view class="tf-bg tf-screen">
    <uni-segmented-control
      style="background-color: #fff;"
      :current="current"
      :values="items"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#EB5841"
    ></uni-segmented-control>
    <scroll-view class="tf-padding-base tab-content" :scroll-y="true">
      <template v-if="current === 0">
        <uni-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
          <uni-list-item title="头像">
            <template v-slot:right>
              <image class="tf-avatar-m tf-mr-base" src="/static/logo.png" mode="widthFix"></image>
            </template>
          </uni-list-item>
          <uni-list-item title="昵称" rightText="这是一个默认昵称" :showArrow="false"></uni-list-item>
          <uni-list-item title="性别" rightText=""></uni-list-item>
          <uni-list-item title="生日" rightText="1990-01-01"></uni-list-item>
        </uni-list>
        <uni-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;">
          <uni-list-item title="姓名" rightText="张三" :showArrow="false"></uni-list-item>
          <uni-list-item title="手机号" rightText="1555555555" @click="jumpPhone"></uni-list-item>
          <uni-list-item
            title="收货地址"
            rightText="福建省省福建省福建省福建省福建省省福建省福建省福建省福建省省福建省福建省福建省福建省省福建省福建省福建省"
            rightWidth="460px"
            @click="goAddress"
          ></uni-list-item>
        </uni-list>
        <uni-list style="background-color: #fff;border-radius: 8px;margin-bottom: 30px;"><uni-list-item title="人脸采集"></uni-list-item></uni-list>
        <uni-list style="background-color: #fff;border-radius: 8px;">
          <uni-list-item title="修改支付密码" @click="editPaymentCode"></uni-list-item>
          <uni-list-item title="修改登录密码" @click="editLoginPassword"></uni-list-item>
        </uni-list>
      </template>
      <template v-if="current === 1">
        <view class="house-owner house-box">
          <view class="tf-row-center"><text class="house-owner-current">当前房产</text></view>
          <view class="tf-row-space-between">
            <view class="tf-row">
              <text class="house-user house-user--owner">业主业主</text>
              <view class="tf-space-between">
                <text class="house-name">XXXX美好生活家园</text>
                <text class="house-address">5栋1单元1001</text>
              </view>
            </view>
            <view class="tf-row-vertical-center house-people-box">
              <text class="tf-icon" style="font-size: 36px;">&#xe7cf;</text>
              <text class="house-people-number">4</text>
            </view>
          </view>
        </view>
        <view class="house-box tf-row">
          <text class="house-user house-user--relation">业主业主</text>
          <view class="tf-space-between">
            <text class="house-name">XXXX美好生活家园</text>
            <text class="house-address">5栋1单元1001</text>
          </view>
        </view>
        <view class="house-box tf-row">
          <text class="house-user house-user--tenant">业主业主</text>
          <view class="tf-space-between">
            <text class="house-name">XXXX美好生活家园</text>
            <text class="house-address">5栋1单元1001</text>
          </view>
        </view>
        <view class="house-box tf-row">
          <text class="house-user house-user--relation">业主业主</text>
          <view class="tf-space-between">
            <text class="house-name">XXXX美好生活家园</text>
            <text class="house-address">5栋1单元1001</text>
          </view>
        </view>
        <button class="tf-btn tf-btn-primary" type="warn" @click="addHouse">新增房产</button>
      </template>
      <template v-if="current === 2">
        <dropdown-menu>
          <!-- <dropdown-item v-model="value2" :list="list"></dropdown-item> -->
          <dropdown-item v-model="value" :list="list"></dropdown-item>
        </dropdown-menu>
        <view class="tf-card tf-mt-base">
          <text class="tf-card-header">XXXX美好生活家园 5栋1单元1002</text>
          <view class="tf-card-content">
            <uni-tag class="user-role tf-mr-base" text="业主" type="error" :inverted="true" size="small"></uni-tag>
            <text>哈哈哈</text>
            <text class="tf-mr-base">(本人)</text>
            <text class="tf-mr-base">女</text>
            <text>12312312312</text>
          </view>
        </view>
        <button class="tf-btn tf-btn-primary" type="warn" @click="addHouse">新增成员</button>
      </template>
    </scroll-view>
  </view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
import dropdownMenu from '@/components/dropdown/dropdown-menu.vue'
import dropdownItem from '@/components/dropdown/dropdown-item.vue'
export default {
  components: {
    uniSegmentedControl,
    uniList,
    uniListItem,
    uniTag,
    dropdownMenu,
    dropdownItem
  },
  data () {
    return {
      items: ['基础信息', '房产信息', '成员信息'],
      current: 0,
      value: 0,
      list: [
        {
          text: 'item1',
          value: 0
        },
        {
          text: 'item2',
          value: 1
        },
        {
          text: 'item3',
          value: 2
        }
      ]
    }
  },
  methods: {
    onClickItem (e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    },
    addHouse () {
      uni.navigateTo({
        url: '/pages/personage/house/attestation'
      })
    },
    goAddress () {
      uni.navigateTo({
        url: '/pages/personage/information/address'
      })
    },
    jumpPhone () {
      uni.navigateTo({
        url: '/pages/personage/information/phone'
      })
    },
    editPaymentCode () {
      uni.navigateTo({
        url: '/pages/personage/information/payment-code'
      })
    },
    editLoginPassword () {
      uni.navigateTo({
        url: '/pages/personage/information/login-password'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.house-owner {
  border-width: 3px;
  border-style: solid;
  border-color: @red-dark;
  padding-top: 0 !important;
}

.house-owner-current {
  width: 194px;
  height: 40px;
  line-height: 40px;
  background: @red-dark;
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin-bottom: @padding-md;
}

.house-user {
  width: 88px;
  padding: 0 20px;
  height: 88px;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-right: @padding-md;
}

.house-user--owner {
  background-image: linear-gradient(to top left, #eb5841, #f9866b);
}

.house-user--relation {
  background-image: linear-gradient(to top left, #ffc017, #ffa110);
}

.house-user--tenant {
  background-image: linear-gradient(to top left, #45d5da, #31b4b9);
}

.house-name {
  font-size: 30px;
  color: @text-color;
}

.house-address {
  font-size: 30px;
  color: @gray-7;
}

.house-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  margin-bottom: @padding-lg;
}
.house-people-box {
  padding: 0 40px;
  border-left-width: 1px;
  border-left-style: dashed;
  border-left-color: #aaa;
}
.house-people-number {
  font-size: 30px;
  color: #383838;
  margin-left: 20px;
}
.tab-content {
  width: 750px;
  position: fixed;
  top: 98px;
  bottom: 128px;
}
.tf-btn {
  width: 710px;
  position: fixed;
  bottom: 20px;
}
.tf-card-header {
  font-size: 24px;
  color: @gray-7;
}
.tf-card-content {
  flex-direction: row;
  align-items: center;
}
</style>
