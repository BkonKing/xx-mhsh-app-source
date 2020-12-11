<template>
  <div class="tf-bg-white">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-h3">验证手机号</div>
    <div class="mb140">
      <div class="tf-phone-input-box">
        <div class="tf-phone-input-label">手机号</div>
        <input v-model="mobile" class="tf-phone-input" type="number" />
      </div>
      <div class="tf-phone-input-box tf-row-space-between">
        <div class="tf-row-vertical-center tf-flex-item">
          <div class="tf-phone-input-label">验证码</div>
          <Field v-model="yzm" class="form-input" type="digit">
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
      </div>
    </div>
    <van-button type="danger" size="large" @click="submit">确定</van-button>
  </div>
</template>

<script>
import { NavBar, Button, Field, Toast, CountDown } from 'vant'
import { updateMobile } from '@/api/personage'
import { verifCode } from '@/api/user'
import { validForm } from '@/utils/util'

export default {
  components: {
    [NavBar.name]: NavBar,
    [CountDown.name]: CountDown,
    Field,
    [Button.name]: Button
  },
  data () {
    return {
      mobile: '',
      yzm: '',
      codeStatus: false,
      countDownTime: 60000
    }
  },
  methods: {
    /* 获取验证码 */
    verifCode () {
      verifCode({
        mobile: this.mobile
      }).then(res => {
        this.codeStatus = true
      })
    },
    /* 确定更改 */
    submit () {
      const validator = [
        {
          value: this.mobile,
          message: '请填写手机号'
        },
        {
          value: this.yzm,
          message: '请填写验证码'
        }
      ]
      validForm(validator).then(() => {
        updateMobile({
          mobile: this.mobile,
          yzm: this.yzm
        }).then(res => {
          Toast.alert({
            title: '更换成功'
          }).then(() => {
            this.$store.dispatch('getMyAccount')
            this.$router.go(-1)
          })
        })
      })
    },
    /* 倒计时结束 */
    countFinish () {
      this.countDownTime = 60000
      this.codeStatus = false
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg-white {
  padding: 50px;
  height: 100%;
}

.tf-h3 {
  margin: 148px 0 60px;
}

.mb140 {
  margin-bottom: 140px;
}

.tf-bg-primary {
  border: none;
}

.tf-phone-input-label {
  width: 140px;
  margin-right: 0;
  line-height: 86px;
}
</style>
