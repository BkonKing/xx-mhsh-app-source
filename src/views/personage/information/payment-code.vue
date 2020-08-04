<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-h3 tf-center">{{status ? '修改' : '设置'}}支付密码</div>
      <div v-if="status" class="tf-text-lg tf-center">请输入支付密码，以验证身份</div>
      <div v-else class="tf-text-lg tf-center">请设置支付密码，用于支付验证</div>
      <div class="item">
        <van-password-input
          v-if="status"
          :value="old_paypassword"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-password-input
          v-if="!status"
          :value="paypassword"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </div>
      <div v-if="status" class="tf-center forget-btn" @click="jumpForget">忘记支付密码</div>
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
import { NavBar, PasswordInput, NumberKeyboard, Toast, Dialog } from 'vant'
import { setPayPassword, updatePayPassword } from '@/api/personage.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput
  },
  data () {
    return {
      showKeyboard: true,
      status: undefined,
      paypassword: '', // 输入的内容
      old_paypassword: ''
    }
  },
  created () {
    this.status = parseInt(this.$route.query.status)
  },
  methods: {
    onInput (key) {
      this.paypassword = (this.paypassword + key).slice(0, 6)
      if (this.paypassword.length === 6) {
        if (this.status) {
          this.updatePayPassword()
        } else {
          this.setPayPassword()
        }
      }
    },
    /* 修改支付密码 */
    updatePayPassword () {
      updatePayPassword().then((res) => {})
    },
    /* 设置支付密码 */
    setPayPassword () {
      setPayPassword({
        paypassword: this.paypassword
      }).then((res) => {
        Dialog.alert({
          title: '支付密码设置成功'
        }).then(() => {
          this.$router.go(-1)
        })
      })
    },
    onDelete () {
      this.paypassword = this.paypassword.slice(0, this.paypassword.length - 1)
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
