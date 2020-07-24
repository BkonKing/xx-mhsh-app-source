<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-h3 tf-center">设置支付密码</div>
      <div class="tf-text-lg tf-center">请输入支付密码，以验证身份</div>
      <div class="item">
        <van-password-input
          :value="value"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </div>
      <div class="tf-center forget-btn" @click="jumpForget">忘记支付密码</div>
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { NavBar, PasswordInput, NumberKeyboard } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput
  },
  data () {
    return {
      showKeyboard: true,
      value: '' // 输入的内容
    }
  },
  methods: {
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    jumpForget () {
      this.$router.push('/pages/personage/information/forget-payment-code')
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
  color: #8f8f94;
  text-decoration: underline;
}
</style>
