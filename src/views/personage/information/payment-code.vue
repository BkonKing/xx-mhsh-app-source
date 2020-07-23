<template>
  <view class="tf-bg-white">
    <text class="tf-h3 tf-center">设置支付密码</text>
    <text class="tf-text-lg tf-center">请输入支付密码，以验证身份</text>
    <view class="item" @click='KeyboarOpen'>
      <password-input :numLng='password'></password-input>
    </view>
    <text class="tf-center forget-btn" @click="jumpForget">
      忘记支付密码
    </text>
    <number-keyboard tabBar ref='KeyboarHid' @input='clickInput' psdLength='6'></number-keyboard>
  </view>
</template>
<script>
import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
import passwordInput from '@/components/password-input/password-input.vue'
export default {
  components: {
    numberKeyboard,
    passwordInput
  },
  data () {
    return {
      password: '' // 输入的内容
    }
  },
  onLoad () {
    // 因为此时实例没有挂载完成，需要延迟操作
    setTimeout(() => {
      this.$refs.KeyboarHid.open()
    }, 50)
  },
  methods: {
    // 打开键盘
    KeyboarOpen (e) {
      this.$refs.KeyboarHid.open()
    },
    // 输入的值
    clickInput (val) {
      this.password = val

      if (this.password.length === 6) {
        console.log(this.password)
      }
    },
    jumpForget () {
      uni.navigateTo({
        url: '/pages/personage/information/forget-payment-code'
      })
    }
  }
}
</script>

<style scoped>
  .tf-bg-white {
    height: 100%;
    padding: 0 50px;
  }
  .tf-h3 {
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .tf-text-lg {
    margin-bottom: 100px;
  }
  .forget-btn {
    margin-top: 60px;
    font-size: 24px;
    color: #8F8F94;
    text-decoration:underline;
  }
</style>
