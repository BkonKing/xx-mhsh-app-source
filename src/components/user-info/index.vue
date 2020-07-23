<template>
  <view class="tf-row-space-between tf-flex-item">
    <view class="tf-row tf-flex-item" style="height: 88px;">
      <image class="tf-avatar tf-mr-base" :src="avatar" mode="aspectFit"></image>
      <slot name="left">
        <view class="tf-space-between">
          <text class="user-info--name">{{name}}</text>
          <text class="user-info-time">{{time}}</text>
        </view>
      </slot>
    </view>
    <view class="user-info__right-box">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
  const stringProp = {
    type: String,
    default: ''
  }
  export default {
    props: {
      avatar: stringProp,
      name: stringProp,
      time: stringProp
    }
  }
</script>

<style lang="less" scoped>
  .user-info--name {
    font-size: 30px;
    font-weight: 500;
    color: @text-color;
  }
  .user-info-time {
    font-size: 24px;
    color: @gray-7
  }
  .user-info__right-box {
    flex-direction: row;
    align-items: center;
  }
</style>