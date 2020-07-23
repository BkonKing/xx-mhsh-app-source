<template>
  <div class="page tf-screen">
    <img class="logo" src="@/assets/app-icon.png">
    <img class="logo-text" src="@/assets/app-icon.png">
    <div class="form">
      <div class="form-body">
        <Field v-model="phoneNumber" class="form-input" maxlength="11" type="tel" placeholder="请输入您的手机号" ></Field>
        <Field v-if="login_type === 1" v-model="phoneCode" key="code" class="form-input" maxlength="11" type="text" placeholder="验证码" >
          <template #button>
            <van-button class="query-btn">获取</van-button>
          </template>
        </Field>
        <Field v-if="login_type === 2" v-model="password" class="form-input" key="password" :type="showPassword ? 'text' : 'password'" placeholder="请输入您的密码" >
          <template #button>
            <span class="tf-icon tf-text-white" @click="changePassword">{{showPassword ? '&#xe9aa;' : '&#xe7a4;'}}</span>
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
          <span class="tf-icon uni-checkbox-icon" :class="{ 'uni-checkbox-input-checked': agree }">{{ agree ? '&#xe886;' : '' }}</span>
        </div>
      </div>
      <span class="agreement-text" style="color: #fff;">登录即表示您同意《美好生活家园用户协议》</span>
    </div>
  </div>
</template>

<script>
import { Field, Button } from 'vant'
export default {
  components: {
    Field,
    [Button.name]: Button
  },
  data () {
    return {
      phoneNumber: undefined,
      phoneCode: undefined,
      password: undefined,
      login_type: 1,
      agree: true,
      showPassword: false
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
    login () {
      this.$store.dispatch('login').then(() => {
        this.$router.push({
          path: 'home'
        })
      })
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
}
.logo-text {
  width: 224px;
  height: 86px;
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
  background-color: rgba(255, 255, 255, 0.4);
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
  font-size: 22px;
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
  margin-top: 80px;
  margin-bottom: 30px;
}
.uni-checkbox-wrapper {
  align-items: center;
}
</style>
