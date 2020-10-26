<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-main-container">
      <div class="tf-h3 tf-center">
        {{ updateStatus ? '修改' : '设置' }}支付密码
      </div>
      <div v-if="updateStatus && steps === 1" class="tf-text-lg tf-center">
        请输入支付密码，以验证身份
      </div>
      <div v-else class="tf-text-lg tf-center">
        请设置支付密码，用于支付验证
      </div>
      <div class="item">
        <!-- 旧密码 -->
        <van-password-input
          v-if="updateStatus && steps === 1"
          :value="old_paypassword"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 新密码 -->
        <van-password-input
          v-else
          :value="paypassword"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </div>
      <div v-if="updateStatus" class="tf-center forget-btn" @click="goForget">
        忘记支付密码
      </div>
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      @input="handleInput"
      @delete="handleDelete"
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
      showKeyboard: true, // 数字键盘控制
      updateStatus: undefined, // 是否为修改状态
      steps: 1, // 步骤，1为设置，2为忘记密码后设置
      forgetStatus: 0, // 是否忘记密码后状态
      paypassword: '', // 输入的密码
      old_paypassword: '' // 旧密码
    }
  },
  created () {
    this.updateStatus = parseInt(this.$route.query.status)
    this.forgetStatus = parseInt(this.$route.query.forget)
    this.steps = parseInt(this.$route.query.steps) || 1
  },
  methods: {
    // 数字按钮输入事件
    handleInput (key) {
      // 修改密码且还是当前第一步验证密码
      if (this.updateStatus && this.steps === 1) {
        this.validPassword(key)
      } else {
        this.setPassword(key)
      }
    },
    // 验证密码
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
    // 判断修改还是设置密码
    setPassword (key) {
      this.paypassword = (this.paypassword + key).slice(0, 6)
      if (this.paypassword.length === 6) {
        if (this.updateStatus || this.forgetStatus) {
          this.updatePayPassword()
        } else {
          this.setPayPassword()
        }
      }
    },
    // 修改支付密码
    updatePayPassword () {
      updatePayPassword({
        paypassword: this.paypassword
      }).then((res) => {
        this.successCallback('支付密码修改成功')
      })
    },
    // 设置支付密码
    setPayPassword () {
      setPayPassword({
        paypassword: this.paypassword
      }).then((res) => {
        this.successCallback('支付密码设置成功')
      })
    },
    // 操作成功后回调
    successCallback (title) {
      Dialog.alert({
        title
      }).then(() => {
        if (this.steps === 2 && this.forgetStatus) {
          this.$router.go(-3)
        } else {
          this.$router.go(-1)
        }
      })
    },
    // 数字键盘删除，触发密码删除
    handleDelete () {
      // 判断是否为旧密码（修改状态并且是第一步时）
      if (this.updateStatus && this.steps === 1) {
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
    // 跳转到忘记密码
    goForget () {
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
