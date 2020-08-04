<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-text-lg tf-center">我们已经发送了验证码到你的手机</div>
      <div class="tf-h3 tf-center">15000112233</div>
      <div class="tf-phone-input-box tf-row-space-between">
          <div class="tf-phone-input-label">验证码</div>
          <Field
            v-model="code"
            class="form-input width300"
            type="digit"
          >
            <template #button>
              <div class="tf-phone-code-btn" v-if="codeStatus">{{countDown}}s</div>
              <button v-else class="tf-phone-code-btn" @click="getCode">获取验证码</button>
            </template>
          </Field>
      </div>
      <van-button type="danger" size="large" @click="next">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field } from 'vant'
import { resetPayPassword } from '@/api/personage.js'

export default {
  components: {
    [NavBar.name]: NavBar,
    Field,
    [Button.name]: Button
  },
  data () {
    return {
      code: '',
      codeStatus: false,
      countDown: 59,
      timer: null,
      type: 0 // 0：登录密码 1：支付密码
    }
  },
  created () {
    this.getCode()
    this.type = parseInt(this.$route.query.type)
  },
  methods: {
    getCode () {
      this.codeStatus = true
      this.count()
    },
    next () {
      const path = this.type ? '/pages/personage/information/payment-code' : '/pages/personage/information/login-password'
      this.$router.push({
        path,
        query: {
          steps: 2
        }
      })
    },
    /* 验证码倒计时 */
    count () {
      if (this.countDown === 0) {
        clearTimeout(this.timer)
        this.countDown = 59
        this.codeStatus = false
        return
      }
      this.timer = setTimeout(() => {
        this.countDown--
        this.count()
      }, 1000)
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
  width: 100%;
  margin-bottom: 100px;
}
.width300 {
  flex: 1;
}
.tf-phone-input-label {
  line-height: 86px;
}
</style>
