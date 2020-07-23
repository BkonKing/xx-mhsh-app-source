<template>
  <view class="tf-bg-white">
    <text class="tf-h3">设置登陆密码</text>
    <view style="margin-bottom: 140px;">
      <view class="tf-phone-input-box">
        <text class="tf-phone-input-label">原密码</text>
        <input class="tf-phone-input" type="password" style="width: 400px;" />
      </view>
      <view class="tf-phone-input-box">
        <text class="tf-phone-input-label">新密码</text>
        <input class="tf-phone-input" type="password" placeholder="填写新密码" placeholder-class="placeholder-password" style="width: 400px;" />
      </view>
      <view class="tf-phone-input-box">
        <text class="tf-phone-input-label">密　　码</text>
        <input class="tf-phone-input" type="password" style="width: 400px;" />
      </view>
      <view class="tf-phone-input-box">
        <text class="tf-phone-input-label">确认密码</text>
        <input class="tf-phone-input" type="password" placeholder="再次填写确认" placeholder-class="placeholder-password" style="width: 400px;" />
      </view>
      <text class="text-hint">密码必须是8-16位的数字、字符组合(不能是纯数字)</text>
      <text class="forget-btn">忘记原登录密码</text>
    </view>
    <button type="warn" style="width: 100%;">完成</button>
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

  .tf-phone-input-label {
    width: 160px;
  }

  .placeholder-password {
    font-size: 34px;
    color: @gray-7;
  }

  .text-hint {
    margin-top: 40px;
    font-size: 24px;
    color: @gray-7;
  }

  .forget-btn {
    margin-top: 40px;
    font-size: 24px;
    color: #8F8F94;
    text-decoration:underline;
  }
</style>
