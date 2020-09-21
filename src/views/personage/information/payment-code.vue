<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" placeholder left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-h3 tf-center">{{status ? '修改' : '设置'}}支付密码</div>
      <div v-if="status && steps === 1" class="tf-text-lg tf-center">请输入支付密码，以验证身份</div>
      <div v-else class="tf-text-lg tf-center">请设置支付密码，用于支付验证</div>
      <div class="item">
        <van-password-input
          v-if="status && steps === 1"
          :value="old_paypassword"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-password-input
          v-else
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
import {
  setPayPassword,
  updatePayPassword,
  yzPayPassword
} from '@/api/personage'
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
      steps: 0,
      forget: 0,
      paypassword: '', // 输入的内容
      old_paypassword: ''
    }
  },
  created () {
    this.status = parseInt(this.$route.query.status)
    this.forget = parseInt(this.$route.query.forget)
    this.steps = parseInt(this.$route.query.steps) || 1
  },
  methods: {
    onInput (key) {
      /* 修改密码且还是当前第一步验证密码 */
      if (this.status && this.steps === 1) {
        this.validPassword(key)
      } else {
        this.setPassword(key)
      }
    },
    /* 验证密码 */
    validPassword (key) {
      this.old_paypassword = (this.old_paypassword + key).slice(0, 6)
      if (this.old_paypassword.length === 6) {
        yzPayPassword({
          old_paypassword: this.old_paypassword
        }).then((res) => {
          this.steps = 2
        })
      }
    },
    /* 判断修改还是设置密码 */
    setPassword (key) {
      this.paypassword = (this.paypassword + key).slice(0, 6)
      if (this.paypassword.length === 6) {
        if (this.status || this.forget) {
          this.updatePayPassword()
        } else {
          this.setPayPassword()
        }
      }
    },
    /* 修改支付密码 */
    updatePayPassword () {
      updatePayPassword({
        paypassword: this.paypassword
      }).then((res) => {
        this.setSuccess('支付密码修改成功')
      })
    },
    /* 设置支付密码 */
    setPayPassword () {
      setPayPassword({
        paypassword: this.paypassword
      }).then((res) => {
        this.setSuccess('支付密码设置成功')
      })
    },
    setSuccess (title) {
      Dialog.alert({
        title
      }).then(() => {
        if (this.steps === 2) {
          this.$router.replace('/pages/personage/information/index')
        } else {
          this.$router.go(-1)
        }
      })
    },
    onDelete () {
      if (this.status && this.steps === 1) {
        this.old_paypassword = this.old_paypassword.slice(
          0,
          this.old_paypassword.length - 1
        )
      } else {
        this.paypassword = this.paypassword.slice(
          0,
          this.paypassword.length - 1
        )
      }
    },
    jumpForget () {
      this.$router.push({
        path: '/pages/personage/information/forget-payment-code',
        query: {
          type: 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-key {
  height: 100px;
}
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
