<template>
  <div class="tf-bg-white tf-body">
    <van-nav-bar
      title="注销账号"
      :fixed="true"
      placeholder
      :border="false"
      :left-arrow="type !== 4"
      @click-left="handleClickLeft"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <div v-if="type !== 4" class="bg-tag"></div>
      <template v-if="type === 1">
        <div class="page-title-container">
          <div class="page-title">申请注销账号</div>
          <div class="page-title-tag"></div>
        </div>
        <div class="rules-group">
          <span class="rules-title">账号注销后，将放弃以下资产和权益：</span>
          <div class="rules-ul">
            <div v-for="(item, index) in rules" :key="index" class="rules-li">
              <span class="rules-icon-circle"></span>
              <span class="rules-caption">{{ item }}</span>
            </div>
          </div>
        </div>
        <van-button
          class="btn"
          type="danger"
          :disabled="!agreement"
          @click="openApply"
          >申请注销</van-button
        >
        <div class="agreement">
          <van-checkbox v-model="agreement" class="agreement-checkbox"
            >阅读并同意<a @click.stop="$router.push('/agreement?articleType=7')"
              >《{{ logoutAgreementTitle }}》</a
            ></van-checkbox
          >
        </div>
      </template>
      <div v-else-if="type === 2 || type === 3" class="validate">
        <div class="page-header">
          <div class="page-title">验证账号</div>
          <div class="page-title-tag"></div>
        </div>
        <div class="form-container">
          <div class="form-label">手机号码</div>
          <div class="code-cell">
            <van-field
              v-model="mobile"
              class="form-input"
              maxlength="11"
              disabled
              placeholder="手机号"
            ></van-field>
            <van-button
              v-if="type === 3"
              class="query-code-btn"
              :class="{ 'code-count-down': codeStatus }"
              :loading="codeLoading"
              :disabled="codeStatus"
              @click="verifCode"
            >
              <template #default>
                <van-count-down
                  v-if="codeStatus"
                  :time="countDownTime"
                  @finish="countFinish"
                >
                  <template #default="timeData">
                    <span>重发({{ timeData.seconds }}s)</span>
                  </template>
                </van-count-down>
                <span v-else>获取验证码</span>
              </template>
            </van-button>
          </div>
          <template v-if="type === 3">
            <div class="form-label form-label-1">验证码</div>
            <div class="code-cell">
              <van-field
                v-model="yzm"
                key="code"
                class="form-input tf-flex-item"
                maxlength="4"
                type="digit"
                placeholder="请输入验证码"
              >
              </van-field>
            </div>
          </template>
          <template v-if="type === 2">
            <div class="form-label form-label-1 form-pwd">登录密码</div>
            <div class="code-cell">
              <van-field
                v-model="pwd"
                class="form-input form-input-password"
                key="password"
                type="password"
                maxlength="16"
                placeholder="请输入密码"
              >
              </van-field>
            </div>
          </template>
        </div>
        <van-button
          class="btn"
          type="danger"
          :disabled="!yzm && !pwd"
          @click="applyLogout"
          >申请注销</van-button
        >
      </div>
      <div class="success-container" v-else>
        <img
          class="success-img"
          src="@/assets/imgs/logout-success.png"
          alt=""
        />
        <div class="success-info">提交成功</div>
        <div class="success-alert">
          您的账号注销申请已提交，在30天内请不要登录美好生活家园APP，以确保注销顺利完成。
        </div>
        <van-button class="btn" type="danger" @click="confirm">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { clearUserInfo } from '@/utils/util'
import { getAllAgreement } from '@/api/home'
import { verifCode, setLogout } from '@/api/user'

export default {
  name: 'logout',
  data () {
    return {
      rules: [
        '身份、账户信息、账户权益将清空且无法恢复；',
        '银行卡的快捷支付服务将被自动关闭;',
        '幸福币将被清空；',
        '交易记录将被清空；',
        '其他APP、网站的授权登录或绑定关系将被解绑。'
      ],
      logoutAgreementTitle: '',
      agreement: false,
      type: 1, // 1：申请注销 2：密码 3：手机验证码 4：成功
      mobile: '',
      yzm: '',
      pwd: '',
      codeLoading: false, // 获取验证loading状态
      codeStatus: false, // 验证码发送状态
      countDownTime: 60000
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.getAllAgreement()
  },
  methods: {
    // 获取协议名称
    getAllAgreement () {
      getAllAgreement().then(({ data }) => {
        data.forEach(obj => {
          obj.article_type === '7' && (this.logoutAgreementTitle = obj.title)
        })
      })
    },
    handleClickLeft () {
      if (this.type !== 4) {
        this.$router.go(-1)
      }
    },
    // 打开申请注销
    openApply () {
      if (this.agreement) {
        // 若是账号有设置登录密码，则验证登录密码；若是没有登录密码，则验证手机验证码
        this.type = this.userInfo.is_setpassword ? 2 : 3
        const mobile = this.userInfo.mobile
        this.mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
      } else {
        this.$toast('请勾选注销重要提示协议')
      }
    },
    // 发送验证码
    verifCode () {
      this.codeLoading = true
      verifCode({
        mobile: this.userInfo.mobile
      })
        .then(res => {
          this.$toast.success('验证码发送成功，请注意查收')
          this.codeLoading = false
          this.codeStatus = true
        })
        .catch(err => {
          if (!err) {
            this.$toast.fail('获取失败，请重试')
          }
          this.codeLoading = false
        })
    },
    // 倒计时结束
    countFinish () {
      this.countDownTime = 60000
      this.codeStatus = false
    },
    // 申请注销
    applyLogout () {
      setLogout({
        mobile: this.userInfo.mobile,
        type: this.type === 2 ? 2 : 1,
        code: this.type === 2 ? this.pwd : this.yzm
      }).then(({ success }) => {
        if (success) {
          this.type = 4
          clearUserInfo()
          this.$store.commit('clearKeepAlive')
        }
      })
    },
    // 关闭APP
    confirm () {
      api.closeWidget({ silent: true })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'agreement') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
span {
  line-height: 1;
}
.bg-tag {
  position: fixed;
  top: 44px;
  right: -125px;
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #ff6555 0%, #ffffff 54%);
  opacity: 0.1;
  border-radius: 50%;
}
.page-title-container {
  display: flex;
  justify-content: center;
  margin-top: 144px;
  position: relative;
}
.page-title {
  position: relative;
  z-index: 2;
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
}
.page-title-tag {
  width: 60px;
  height: 12px;
  background: #ff6555;
  border-radius: 6px;
  position: absolute;
  left: calc(50% - 30px);
  bottom: -4px;
}

.rules-group {
  display: flex;
  flex-direction: column;
  width: 650px;
  padding: 50px 30px;
  margin-top: 66px;
  margin-left: 50px;
  position: relative;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
}

.rules-title {
  margin-top: 9px;
  color: #222222;
  font-size: 28px;
  font-weight: bold;
  line-height: 28px;
}

.rules-ul {
  margin-top: 28px;
}

.rules-li {
  display: flex;
}

.rules-icon-circle {
  display: block;
  width: 10px;
  height: 10px;
  margin-top: 19px;
  margin-right: 30px;
  background: #ff6555;
  border-radius: 50%;
}

.rules-caption {
  line-height: 48px;
  font-size: 28px;
  color: #8f8f94;
}
.btn {
  width: 340px;
  height: 88px;
  margin-top: 80px;
  margin-left: 205px;
  background: #ff6555;
  border-radius: 44px;
}
.agreement {
  display: flex;
  justify-content: center;
  margin-top: 41px;
}
.agreement-checkbox {
  display: flex;
  align-items: center;
  font-size: 26px;
  line-height: 1;
  /deep/ .van-checkbox__icon {
    height: 40px;
  }
  /deep/ .van-checkbox__icon .van-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  /deep/ .van-checkbox__label {
    display: flex;
    align-items: center;
    margin-left: 21px;
    margin-top: 2px;
    line-height: 1;
    a {
      line-height: 1;
      color: #0e80e1;
    }
  }
}

.validate {
  margin-top: 239px;
  padding: 0 100px;
  .page-header {
    position: relative;
  }
  .page-title-tag {
    left: 0;
  }
  .btn {
    margin-left: 105px;
    margin-top: 140px;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 91px;
  .form-label {
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: bold;
    color: #000000;
  }
  .form-label-1 {
    margin-top: 44px;
  }
  .form-pwd {
    margin-bottom: 26px;
    + .code-cell .form-input {
      margin-bottom: 26px;
    }
  }
  .code-cell {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
  .form-input {
    flex: 1;
    height: 36px;
    margin-bottom: 30px;
    padding: 0 20px 0 0;
    border: none;
    font-size: 32px;
    /deep/ .van-field__control {
      font-size: 32px;
      font-weight: bold;
      line-height: 1;
      &::placeholder {
        font-size: 32px;
        font-weight: 400;
        letter-spacing: 0;
        color: #8f8f94 !important;
      }
    }
  }
  .query-code-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 168px;
    height: 36px;
    // padding-left: 30px;
    padding-right: 0;
    border: none;
    border-radius: 0;
    border-left: 1px solid #8f8f94;
    /deep/ .van-button__text > span {
      font-size: 28px;
      font-weight: bold;
      color: #222222;
    }
    &:active::before {
      opacity: 0;
    }
  }
  .code-count-down {
    background: #fff !important;
    /deep/ .van-button__text {
      line-height: 1;
    }
  }
  .form-input-password {
    font-size: 32px;
    /deep/ .van-field__control {
      letter-spacing: 10px;
    }
  }
}

.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .success-img {
    width: 260px;
    height: 308px;
    margin-top: 239px;
  }
  .success-info {
    margin-top: -32px;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    line-height: 1;
  }
  .success-alert {
    width: 510px;
    margin-top: 50px;
    font-size: 24px;
    color: #8f8f94;
    text-align: center;
    line-height: 44px;
  }
  .btn {
    margin-top: 170px;
    margin-left: 0;
  }
}

/deep/ .van-button--disabled {
  background: #f7f7f7;
  border-color: #f7f7f7;
  color: #8f8f94;
}

/deep/ .van-field__control:disabled {
  color: #222222;
}
</style>
