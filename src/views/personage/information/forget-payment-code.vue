<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-text-lg tf-center">我们已经发送了验证码到你的手机</div>
      <div class="tf-h3 tf-center">15000112233</div>
      <div class="tf-phone-input-box tf-row-space-between">
        <div class="tf-row-vertical-center">
          <div class="tf-phone-input-label">验证码</div>
          <input class="tf-phone-input width200" type="number" />
        </div>
        <button class="tf-phone-code-btn">获取验证码</button>
      </div>
      <van-button type="danger" size="large" @click="next">下一步</van-button>
    </div>
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
  },
  methods: {
    next () {
      this.$router.push('/pages/personage/information/payment-code')
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 80px 50px;
  height: 100%;
}
.tf-h3 {
  margin: 40px 0 74px;
}
.tf-phone-input-box {
  margin-bottom: 130px;
}
.width200 {
  width: 200px;
}
</style>
