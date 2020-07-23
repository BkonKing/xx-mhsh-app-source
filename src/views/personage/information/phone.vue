<template>
  <view class="tf-bg-white">
    <text class="tf-h3">验证手机号</text>
    <view style="margin-bottom: 140px;">
      <view class="tf-phone-input-box">
        <text class="tf-phone-input-label">手机号</text>
        <input class="tf-phone-input" type="number" style="width: 400px;" />
      </view>
      <view class="tf-phone-input-box tf-row-space-between">
        <view class="tf-row-vertical-center">
          <text class="tf-phone-input-label">验证码</text>
          <input class="tf-phone-input" type="number" style="width: 200px;"/>
        </view>
        <button class="tf-phone-code-btn" size="mini" :plain="true" :disabled="true">获取验证码</button>
      </view>
    </view>
    <button type="warn" style="width: 100%;">确定</button>
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .tf-bg-white {
    padding: 50px;
    height: 100%;
  }

  .tf-h3 {
    margin: 60px 0;
  }
</style>
