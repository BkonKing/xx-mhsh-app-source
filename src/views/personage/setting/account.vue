<template>
  <view class="tf-bg-white">
    <text class="tf-h3">切换账户登录</text>
    <view class="account">
      <image class="user-avatar" src="/static/app-icon.png" mode="aspectFill"></image>
      <view style="justify-content: center;">
        <text class="user-name">这是一个默认昵称</text>
        <text class="tf-text-grey">15022223333</text>
      </view>
    </view>
    <button type="warn" style="width: 100%;margin-top: 70px;">换个账户登录</button>
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
    padding: 30px 50px;
    height: 100%;
  }

  .tf-h3 {
    margin: 80px 0;
  }

  .account {
    flex-direction: row;
    width: 650px;
    height: 180px;
    padding: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: #aaa;
    border-radius:10px;
  }

  .user-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: @padding-md;
  }

  .user-name {
    font-size: 34px;
    font-weight: 500;
    color: @text-color;
    margin-bottom: 10px;
  }

  .tf-text-grey {
    font-size: 30px;
  }
</style>
