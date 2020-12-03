<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-body-container">
      <div class="tf-text-lg tf-center">我们已经发送了验证码到你的手机</div>
      <div class="tf-h3 tf-center">{{ userInfo.mobile }}</div>
      <div class="tf-phone-input-box tf-row-space-between">
        <div class="tf-phone-input-label">验证码</div>
        <Field v-model="code" class="form-input width300" type="digit">
          <template #button>
            <van-count-down
              v-if="codeStatus"
              :time="countDownTime"
              @finish="countFinish"
            >
              <template #default="timeData">
                <div class="tf-phone-code-btn">{{ timeData.seconds }}s</div>
              </template>
            </van-count-down>
            <button v-else class="tf-phone-code-btn" @click="verifCode">
              获取验证码
            </button>
          </template>
        </Field>
      </div>
      <van-button type="danger" size="large" @click="next">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Field, CountDown } from 'vant'
import { verifCode, getMyAccount } from '@/api/user'
import { resetPayPassword, resetPassword } from '@/api/personage.js'
import { mapGetters } from 'vuex'

export default {
  name: 'informationForgetPaymentCode',
  components: {
    [CountDown.name]: CountDown,
    [NavBar.name]: NavBar,
    Field,
    [Button.name]: Button
  },
  data () {
    return {
      code: '',
      codeStatus: false,
      countDownTime: 60000,
      countCopy: 60,
      codeTime: 0,
      type: 0 // 0：登录密码 1：支付密码
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.type = parseInt(this.$route.query.type)
  },
  activated () {
    this.isCountDown()
  },
  methods: {
    // 判断是否存在倒计时
    isCountDown () {
      getMyAccount().then(res => {
        if (this.codeTime) {
          const time =
            this.countCopy - Math.ceil((res.timestamp - this.codeTime) / 1000)
          if (time >= 0) {
            this.codeTime = res.timestamp
            this.countCopy = time
            this.countDownTime = time * 1000
            this.codeStatus = true
            return
          }
        }
        this.verifCode()
      })
    },
    /* 获取验证码 */
    verifCode () {
      verifCode({
        mobile: this.userInfo.mobile
      }).then(res => {
        this.codeTime = new Date(res.headers.date).getTime()
        this.codeStatus = true
      })
    },
    /* 下一步验证 */
    next () {
      this.type ? this.resetPayPassword() : this.resetPassword()
    },
    /* 通过验证码重置支付密码 */
    resetPayPassword () {
      resetPayPassword({
        mobile: this.userInfo.mobile,
        yzm: this.code
      }).then(res => {
        this.$router.push({
          path: '/pages/personage/information/payment-code',
          query: {
            steps: 2,
            forget: 1
          }
        })
      })
    },
    /* 通过验证码重置登录密码 */
    resetPassword () {
      resetPassword({
        mobile: this.userInfo.mobile,
        yzm: this.code
      }).then(res => {
        this.$router.push({
          path: '/pages/personage/information/login-password',
          query: {
            steps: 2,
            forget: 1
          }
        })
      })
    },
    /* 倒计时结束 */
    countFinish () {
      this.countDownTime = 60000
      this.codeStatus = false
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 0 50px;
  height: 100%;
}
.tf-body-container {
  padding: 80px 0;
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
