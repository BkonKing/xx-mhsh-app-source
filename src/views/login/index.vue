<template>
  <div class="login-page">
    <div class="logo-header"></div>
    <i
      v-if="status"
      class="van-icon van-icon-arrow-left van-nav-bar__arrow"
      @click="$router.go(-1)"
    ></i>
    <div class="logo-container">
      <img class="logo" src="@/assets/imgs/login_logo.png" />
    </div>
    <div class="form-container">
      <van-field
        v-model="mobile"
        class="form-input"
        maxlength="11"
        type="digit"
        placeholder="手机号"
      ></van-field>
      <div v-if="loginType === 1" class="code-cell">
        <van-field
          v-model="yzm"
          key="code"
          class="form-input tf-flex-item"
          maxlength="4"
          type="digit"
          placeholder="验证码"
        >
        </van-field>
        <van-button
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
      <van-field
        v-if="loginType === 2"
        v-model="pwd"
        class="form-input"
        key="password"
        :type="showPassword ? 'text' : 'password'"
        maxlength="16"
        placeholder="密码"
      >
        <template #button>
          <span
            class="tf-icon"
            :class="[showPassword ? 'tf-icon-kejian' : 'tf-icon-bukejian']"
            @click="showPassword = !showPassword"
          ></span>
        </template>
      </van-field>
      <van-button
        v-preventReClick
        :disabled="loginLoading"
        class="login-btn"
        @click="submitLogin"
        >登 录</van-button
      >
      <span
        class="login-method__text"
        @click="loginType = loginType === 1 ? 2 : 1"
        >{{ loginType === 1 ? "密码登录" : "验证码登录" }}</span
      >
      <div class="agreement">
        <div class="agreement-checkbox-input" @click="agree = !agree">
          <span
            class="tf-icon checkbox-icon"
            :class="{ 'tf-icon-gou': agree }"
          ></span>
        </div>
        <span class="agreement-text">
          <span @click="agree = !agree">已阅读并同意</span>
          <router-link class="agreement-link" to="/agreement?articleType=1"
            >《{{ userAgreementTitle }}》</router-link
          >
          <router-link class="agreement-link" to="/agreement?articleType=6"
            >《{{ privacyAgreementTitle }}》</router-link
          >
        </span>
      </div>
    </div>
    <agree-popup v-model="agreePopup" @handleAgree="handleAgree"></agree-popup>
    <tf-dialog-v2
      v-model="logoutDialog"
      title="账号注销已提交"
      confirmButtonText="我知道了"
      cancelButtonText="取消注销申请"
      @confirm="() => logoutDialog = false"
      @cancel="logoutDialog = false;cancelLogoutDialog = true"
    >
      <template slot="content">
        您的账号注销申请已提交，在30天内请不要登录美好生活家园APP，以确保注销顺利完成。可再次查看<router-link
          class="agreement-link"
          to="/agreement?articleType=7"
          >《注销重要提醒》</router-link
        >
      </template>
    </tf-dialog-v2>
    <tf-dialog-v2
      v-model="cancelLogoutDialog"
      title="确定取消账号注销申请？"
      content="取消账号注销申请后，不再删除账号的数据，您的账号可正常进行登录。"
      confirmButtonText="确定取消"
      :showCancelButton="false"
      :closeOnClickOverlay="true"
      @confirm="cancelLogout"
    >
    </tf-dialog-v2>
  </div>
</template>

<script>
import { verifCode, cancelLogout } from '@/api/user'
import { validEmpty } from '@/utils/util'
import { getAllAgreement } from '@/api/home'
import { setStatisticsData } from '@/utils/analysis'
import AgreePopup from '@/components/Business/agree-popup'
import TfDialogV2 from '@/components/tf-dialog-v2'

export default {
  name: 'login',
  components: {
    AgreePopup,
    TfDialogV2
  },
  data () {
    return {
      firstStatus: false, // 是否第一次登录
      mobile: undefined,
      yzm: undefined, // 验证码
      pwd: undefined, // 密码
      loginType: 1, // 1:验证码登录 2：密码登陆
      agree: false, // 同意协议
      showPassword: false,
      codeLoading: false, // 获取验证loading状态
      codeStatus: false, // 验证码发送状态
      countDownTime: 60000,
      status: 0, // 1：换个账号登录 0：登录
      loginLoading: false, // 登录loading状态
      userAgreementTitle: '用户协议', // 用户协议标题
      privacyAgreementTitle: '隐私协议', // 隐私协议标题
      agreePopup: false, // 登录协议弹窗
      logoutDialog: false,
      cancelLogoutDialog: false
    }
  },
  created () {
    this.firstStatus = api.getPrefs({
      sync: true,
      key: 'first-login'
    })
    if (!this.firstStatus) {
      this.agreePopup = true
    }
    this.status = this.$route.query.status
    // 换个账号登录则默认同意协议
    if (this.status) {
      this.agree = true
    }
    this.getAllAgreement()
  },
  methods: {
    // 获取协议名称
    getAllAgreement () {
      getAllAgreement().then(({ data }) => {
        data.forEach(obj => {
          obj.article_type === '1' && (this.userAgreementTitle = obj.title)
          obj.article_type === '6' && (this.privacyAgreementTitle = obj.title)
        })
      })
    },
    // 同意协议
    handleAgree () {
      this.agree = true
    },
    // 提交登录验证
    submitLogin () {
      if (!this.agree) {
        this.agreePopup = true
        return
      }
      let params
      /* 验证码登录 */
      if (this.loginType === 1) {
        if (
          validEmpty(this.mobile, '请输入手机号码') ||
          validEmpty(this.yzm, '请输入验证码')
        ) {
          return
        }
        params = {
          mobile: this.mobile,
          yzm: this.yzm
        }
      } else if (this.loginType === 2) {
        /* 密码登录 */
        if (
          validEmpty(this.mobile, '请输入手机号码') ||
          validEmpty(this.pwd, '请输入密码')
        ) {
          return
        }
        params = {
          mobile: this.mobile,
          pwd: this.pwd
        }
      }
      this.login(params)
    },
    // 登录请求
    login (params) {
      this.loginLoading = true
      this.$store
        .dispatch('login', {
          type: this.loginType,
          params
        })
        .then(data => {
          this.loginLoading = false
          if (!this.firstStatus) {
            api.setPrefs({
              key: 'first-login',
              value: 1
            })
          }
          this.loginJump()
          // 行为数据分析收集
          if (data.first_register == 1) {
            this.mtjEvent({
              eventId: 2
            })
          }
          this.mtjEvent({
            eventId: 1
          })
          // 登入新增
          setStatisticsData(4, { mobile: this.mobile })
        })
        .catch((res) => {
          this.loginLoading = false
          // 弹出注销提交
          if (+res.is_popup) {
            this.logoutDialog = true
          } else {
            this.$toast(res.message)
          }
        })
    },
    // 确定取消注销申请
    cancelLogout () {
      cancelLogout({
        mobile: this.mobile
      }).then(({ success }) => {
        if (success) {
          this.submitLogin()
        }
      })
    },
    // 登录跳转，判断是否通过分享进入未登录情况下吗，登录成功后跳转到分享页面，否则跳转到首页
    loginJump () {
      const share_params = this.$store.state.share_params || ''
      if (share_params) {
        this.$store.commit('setShare_params', '')
        if (share_params.page_type == 1) {
          this.$router.replace({
            path: '/store/goods-detail',
            query: {
              id: share_params.id,
              f_id: share_params.f_id
            }
          })
        } else if (share_params.page_type == 2) {
          this.$router.replace({
            path: '/pages/neighbours/details',
            query: {
              articleType: share_params.articleType,
              id: share_params.id
            }
          })
        } else if (share_params.page_type == 3) {
          this.$router.replace({
            path: '/life/movie/filmDetails',
            query: {
              id: share_params.id
            }
          })
        } else if (share_params.page_type == 4) {
          this.$router.replace({
            path: '/life/movie/cinemaDetails',
            query: {
              id: share_params.id,
              name: share_params.name
            }
          })
        } else if (share_params.page_type == 5) {
          this.$router.replace({
            path: '/pages/task/detail',
            query: {
              taskId: share_params.taskId
            }
          })
        }
      } else {
        this.$router.replace({
          name: 'home'
        })
      }
    },
    // 发送验证码
    verifCode () {
      this.codeLoading = true
      verifCode({
        mobile: this.mobile
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
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setShare_params', '')
    if (to.name !== 'agreement') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-nav-bar__arrow {
    position: fixed;
    left: 20px;
    top: 52px;
    color: #fff;
  }
  .logo-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 339px;
    background-image: url("../../assets/imgs/login_header.png");
    background-size: contain;
  }
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    height: 190px;
    z-index: 1;
    margin-top: 244px;
    background: #ffffff;
    box-shadow: 0px 15px 21px 0px rgba(199, 0, 23, 0.2);
    border-radius: 50%;
    .logo {
      width: 140px;
      height: 140px;
    }
  }
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  margin-top: 86px;
  .code-cell {
    display: flex;
    width: 100%;
  }
  .form-input {
    align-items: center;
    width: 100%;
    height: 86px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 60px;
    border: none;
    border-bottom: 1px solid @red;
    font-size: 42px;
    background-color: rgba(255, 255, 255, 0.4);
    .tf-icon {
      display: flex;
      line-height: 80px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 36px;
    }
    /deep/ .van-field__control::placeholder {
      font-size: 30px;
      color: #383838 !important;
    }
  }
  .query-code-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 88px;
    margin-left: 40px;
    border: 2px solid @red;
    border-radius: 4px;
    font-size: 24px;
    color: @red;
  }
  .code-count-down {
    background: #f2f2f4;
    color: #8f8f94;
    border-color: #f2f2f4;
  }
  .login-btn {
    width: 560px;
    height: 88px;
    margin-top: 36px;
    margin-bottom: 40px;
    background-image: linear-gradient(to right, @red, @red-dark);
    border-radius: 44px;
    border-width: 0;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }
  .login-method__text {
    font-size: 26px;
    color: #8f8f94;
    text-decoration: underline;
  }
}
.agreement {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
  margin-top: 160px;
  .agreement-checkbox-input {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 30px;
    height: 28px;
    margin-top: 2px;
    margin-right: 10px;
    border: 2px solid #aaa;
    .tf-icon-gou {
      font-size: 24px;
      color: #aaa;
    }
  }
  .agreement-text {
    font-size: 24px;
    color: #8f8f94;
    text-align: center;
    .agreement-link {
      color: #8f8f94;
    }
  }
}
</style>
