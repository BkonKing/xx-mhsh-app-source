<template>
  <div class="tf-bg-white">
    <van-nav-bar :fixed="true" :border="false" placeholder left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="tf-h3">{{status ? '修改' : '设置'}}登录密码</div>
    <div class="mb140">
      <template v-if="status">
        <div class="tf-phone-input-box">
          <div class="tf-phone-input-label">原密码</div>
          <input v-model="old_password" class="tf-phone-input width400" type="password" />
        </div>
        <div class="tf-phone-input-box">
          <div class="tf-phone-input-label">新密码</div>
          <input
            v-model="password"
            class="tf-phone-input width400"
            type="password"
            placeholder="填写新密码"
            placeholder-class="placeholder-password width400"
          />
        </div>
      </template>
      <template v-else>
        <div class="tf-phone-input-box">
          <div class="tf-phone-input-label">密 码</div>
          <input v-model="password" class="tf-phone-input" type="password" placeholder="填写密码" />
        </div>
      </template>
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">确认密码</div>
        <input
          v-model="repassword"
          class="tf-phone-input width400"
          type="password"
          placeholder="再次填写确认"
        />
      </div>
      <div class="text-hint">密码必须是8-16位的数字、字符组合(不能是纯数字)</div>
      <div class="forget-btn" v-if="status" @click="jumpForget">忘记原登录密码</div>
    </div>
    <van-button type="danger" size="large" @click="submit">完成</van-button>
  </div>
</template>

<script>
import { NavBar, Button, Dialog } from 'vant'
import { setPassword, updatePassword } from '@/api/personage'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
      status: undefined,
      steps: 0,
      forget: 0,
      password: '',
      repassword: '',
      old_password: ''
    }
  },
  created () {
    this.status = parseInt(this.$route.query.status)
    this.forget = parseInt(this.$route.query.forget)
    this.steps = parseInt(this.$route.query.steps)
  },
  methods: {
    submit () {
      if (this.status || this.forget) {
        this.updatePassword()
      } else {
        this.setPassword()
      }
    },
    /* 修改登录密码 */
    updatePassword () {
      updatePassword({
        old_password: this.old_password,
        password: this.password,
        repassword: this.repassword
      }).then((res) => {
        this.setSuccess('登录密码修改成功')
      })
    },
    /* 设置登录密码 */
    setPassword () {
      setPassword({
        password: this.password,
        repassword: this.repassword
      }).then((res) => {
        this.setSuccess('登录密码设置成功')
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
    jumpForget () {
      this.$router.push({
        path: '/pages/personage/information/forget-payment-code',
        query: {
          type: 0
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 0 50px;
  height: 100%;
}

.tf-h3 {
  margin: 148px 0 60px;
}

.tf-phone-input-label {
  width: 160px;
}

.placeholder-password {
  font-size: 34px;
  color: @gray-7;
}

.text-hint {
  margin-top: 40px;
  font-size: 24px;
  color: @gray-7;
}

.forget-btn {
  margin-top: 40px;
  font-size: 24px;
  color: #8f8f94;
  text-decoration: underline;
}

.width400 {
  width: 400px;
}
.mb140 {
  margin-bottom: 140px;
}
</style>
