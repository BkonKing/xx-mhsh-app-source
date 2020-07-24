<template>
  <div class="tf-bg-white">
        <van-nav-bar
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-h3">设置登录密码</div>
    <div style="margin-bottom: 140px;">
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">原密码</div>
        <input class="tf-phone-input width400" type="password" />
      </div>
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">新密码</div>
        <input class="tf-phone-input width400" type="password" placeholder="填写新密码" placeholder-class="placeholder-password width400" />
      </div>
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">密　　码</div>
        <input class="tf-phone-input" type="password" />
      </div>
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">确认密码</div>
        <input class="tf-phone-input width400" type="password" placeholder="再次填写确认" placeholder-class="placeholder-password" />
      </div>
      <div class="text-hint">密码必须是8-16位的数字、字符组合(不能是纯数字)</div>
      <div class="forget-btn">忘记原登录密码</div>
    </div>
    <van-button type="danger" size="large">完成</van-button>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
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

  .width400 {
    width: 400px;
  }
</style>
