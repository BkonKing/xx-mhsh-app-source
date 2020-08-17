<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-h3">验证手机号</div>
    <div class="mb140">
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">手机号</div>
        <input class="tf-phone-input" type="number" />
      </div>
      <div class="tf-phone-input-box tf-row-space-between">
        <div class="tf-row-vertical-center">
          <div class="tf-phone-input-label">验证码</div>
          <input class="tf-phone-input width200" type="number" />
        </div>
        <button class="tf-phone-code-btn">获取验证码</button>
      </div>
    </div>
    <van-button type="danger" size="large">确定</van-button>
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
    return {}
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 50px;
  height: 100%;
}

.tf-h3 {
  margin: 148px 0 60px;
}

.width200 {
  width: 200px;
}

.mb140 {
  margin-bottom: 140px;
}

.tf-bg-primary {
  border: none;
}
</style>
