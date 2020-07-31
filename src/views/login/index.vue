<template>
  <div class="page tf-screen">
    <img class="logo" src="@/assets/app-icon.png" />
    <img class="logo-text" src="@/assets/app-icon.png" />
    <div class="form">
      <div class="form-body">
        <Field
          v-model="mobile"
          class="form-input"
          maxlength="11"
          type="tel"
          placeholder="请输入您的手机号"
        ></Field>
        <Field
          v-if="login_type === 1"
          v-model="yzm"
          key="code"
          class="form-input"
          maxlength="11"
          type="text"
          placeholder="验证码"
        >
          <template #button>
            <div class="tf-text-white" v-if="codeStatus">{{countDown}}s</div>
            <van-button v-else class="query-btn" @click="verifCode">获取</van-button>
          </template>
        </Field>
        <Field
          v-if="login_type === 2"
          v-model="pwd"
          class="form-input"
          key="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入您的密码"
        >
          <template #button>
            <span
              class="tf-icon tf-text-white"
              :class="[showPassword ? 'tf-icon-eye' : 'tf-icon-eye-close']"
              @click="changePassword"
            ></span>
          </template>
        </Field>
      </div>
    </div>
    <span class="login-text" @click="login">登 录</span>
    <span v-if="login_type === 1" class="login-method__text" @click="login_type = 2">密码登录</span>
    <span v-else-if="login_type === 2" class="login-method__text" @click="login_type = 1">验证码登录</span>
    <div class="agreement" @click="changeRememberPasswrod">
      <div class="uni-checkbox-wrapper">
        <div class="uni-checkbox-input">
          <span
            class="tf-icon uni-checkbox-icon"
            :class="{ 'uni-checkbox-input-checked': agree }"
          >{{ agree ? '&#xe886;' : '' }}</span>
        </div>
      </div>
      <span class="agreement-text" style="color: #fff;">登录即表示您同意《美好生活家园用户协议》</span>
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast } from 'vant'
import { verifCode } from '@/api/user'
import { validEmpty } from '@/utils/util'
export default {
  components: {
    Field,
    [Button.name]: Button
  },
  data () {
    return {
      mobile: undefined,
      yzm: undefined,
      pwd: undefined,
      login_type: 1, // 1:验证码登录 2：密码登陆
      agree: true,
      showPassword: false,
      codeStatus: false,
      countDown: 59,
      timer: null
    }
  },
  created () {},
  methods: {
    changeRememberPasswrod () {
      this.agree = !this.agree
    },
    changePassword () {
      this.showPassword = !this.showPassword
    },
    /* 登录 */
    login () {
      if (!this.agree) {
        Toast('请阅读并同意用户协议')
        return
      }
      let params = {}
      /* 验证码登录 */
      if (this.login_type === 1) {
        if (validEmpty(this.mobile, '请输入手机号码') || validEmpty(this.yzm, '请输入验证码')) {
          return
        }
        params = {
          mobile: this.mobile,
          yzm: this.yzm
        }
      } else if (this.login_type === 2) { /* 密码登录 */
        if (validEmpty(this.mobile, '请输入手机号码') || validEmpty(this.pwd, '请输入密码')) {
          return
        }
        params = {
          mobile: this.mobile,
          pwd: this.pwd
        }
      }
      this.$store.dispatch('login', {
        type: this.login_type,
        params
      }).then(() => {
        this.$router.push('')
      })
    },
    /* 发送验证码 */
    verifCode () {
      verifCode().then((res) => {
        this.codeStatus = true
        this.count()
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
div,
span,
image {
  display: flex;
  flex-direction: column;
  position: relative;
}
.page {
  width: 750px;
  padding-top: 120px;
  flex: 1;
  align-items: center;
  background-color: #333;
  // background-image: url(../../static/LoginHeader.png);
}
.logo {
  width: 212px;
  height: 214px;
  margin-bottom: 30px;
}
.logo-text {
  width: 224px;
  height: 86px;
  margin-bottom: 80px;
}
.form {
  width: 560px;
  position: relative;
  z-index: 9;
  align-items: center;
}
.form-body {
  width: 560px;
  margin-top: 10px;
}
.form-bg {
  position: absolute;
  width: 560px;
  left: 0;
  height: 120px;
  background-color: #fff;
  opacity: 0.4;
  border-radius: 10px;
}
.form-input {
  flex-direction: row;
  align-items: center;
  width: 560px;
  height: 120px;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 20px;
  margin-bottom: 30px;
  border: none;
  font-size: 34px;
  background-color: rgba(255, 255, 255, 0.4);
  .tf-icon {
    font-size: 36px;
  }
  /deep/ .van-field__control {
    color: #fff;
  }
}
.phone-input {
  flex: 1;
  height: 120px;
  font-size: 34px;
  color: #fff;
}
.input-image {
  width: 40px;
  height: 40px;
  margin-top: 22px;
}
.query-btn {
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-width: 2px;
  border-style: solid;
  border-color: #fff;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  background: none;
  font-size: 24px;
}
.agreement {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 82px;
  padding: 20px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.uni-checkbox-input {
  margin-right: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #fff;
  border-radius: 3px;
  width: 28px;
  height: 28px;
}
.uni-checkbox-icon {
  font-size: 20px;
  line-height: 28px;
}
.uni-checkbox-input-checked {
  color: #fff;
}
.login-method__text {
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  text-decoration: underline;
}
.login-text {
  width: 560px;
  height: 88px;
  line-height: 88px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}
.uni-checkbox-wrapper {
  align-items: center;
}
.agreement-text {
  font-size: 24px;
}
</style>
