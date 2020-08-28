<template>
  <div class="page">
    <img class="logo" src="@/assets/imgs/login_logo.png" />
    <img class="logo-text" src="@/assets/imgs/login_logo_text.png" />
    <template v-if="isExempt">
      <div class="form">
        <div class="form-body">
          <div class="form-input form-input-phoneNum">{{phoneNum}}</div>
        </div>
      </div>
      <span class="login-text" @click="openActivity">本机号码一键登录</span>
      <span class="login-method__text" @click="isExempt = false">其他登录</span>
    </template>
    <template v-else>
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
            type="digit"
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
                :class="[showPassword ? 'tf-icon-kejian' : 'tf-icon-bukejian']"
                @click="changePassword"
              ></span>
            </template>
          </Field>
        </div>
      </div>
      <span class="login-text" @click="login">登 录</span>
      <span v-if="login_type === 1" class="login-method__text" @click="login_type = 2">密码登录</span>
      <span v-else-if="login_type === 2" class="login-method__text" @click="login_type = 1">验证码登录</span>
    </template>
    <div class="agreement" @click="changeRememberPasswrod">
      <div class="uni-checkbox-input">
        <span class="tf-icon checkbox-icon" :class="{ 'tf-icon-gou': agree }"></span>
      </div>
      <span class="agreement-text" style="color: #fff;">
        登录即表示您同意
        <router-link style="color: #fff;text-decoration: underline;" to="/agreement">《美好生活家园用户协议》</router-link>
      </span>
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
      isExempt: 1, // 1: 一键登录 2：账号登录
      login_type: 1, // 1:验证码登录 2：密码登陆
      agree: true, // 同意协议
      showPassword: false,
      codeStatus: false,
      countDown: 59,
      timer: null,
      shanyan: null,
      phoneNum: '', // 一键登录手机号
      platform: '' // 系统
    }
  },
  created () {
    this.platform = api.systemType
    this.oneKeyInit()
  },
  methods: {
    changeRememberPasswrod () {
      this.agree = !this.agree
    },
    changePassword () {
      this.showPassword = !this.showPassword
    },
    /* 一键登录 - 初始化 */
    oneKeyInit () {
      this.shanyan = api.require('clSDKShanYanSDKModule')
      // ios appid:Yf4r8DYF appkey:bWrcMriC
      // android appid:Co1XaiAR appkey:YHiNa8xN
      let appid
      if (this.platform == 'android') {
        appid = 'Co1XaiAR'
      } else if (this.platform == 'ios') {
        appid = 'Yf4r8DYF'
      }

      this.shanyan.init(
        {
          appid: appid
        },
        (ret, err) => {
          if (this.platform == 'android') {
            this.preLogin()
            api.alert({
              title: JSON.stringify(ret)
            })
          } else if (this.platform == 'ios') {
            // iOS回调
            if (err != null) {
              // iOS初始化失败
              this.isExempt = false
            } else {
              // iOS初始化成功
              this.preLogin()
            }
            api.alert({
              title: JSON.stringify(ret)
            })
          }
          console.log(
            'callback---button--shanyanSdkInit========' + JSON.stringify(ret)
          )
        }
      )
    },
    /* 一键登录 - 获取预号码 */
    preLogin () {
      if (this.platform == 'android') {
        // 安卓预取号
        this.shanyan.preLogin((ret, err) => {
          api.alert({
            title: JSON.stringify(ret)
          })
        })
      } else if (this.platform == 'ios') {
        // iOS预取号
        this.shanyan.preGetPhonenumber((ret, err) => {
          if (err != null) {
            // iOS预取号失败
          } else {
            // iOS预取号成功
            this.phoneNum = ret.data.number
            // this.openActivity()
          }
          console.log(
            'callback---button--shanyanSdkGetPhoneInfo========' +
              JSON.stringify(ret)
          )
        })
      }
    },
    /* 拉起授权页 */
    openActivity () {
      api.showProgress()
      setTimeout(function () {
        api.hideProgress()
      }, 5000)
      if (this.platform == 'android') {
        // Android 全屏模式
        var param = {
          isFinish: false
        }
        this.shanyan.openActivity(param, function (ret, err) {
          api.hideProgress()

          if (ret.type == 1) {
            // ret.type：1 调起授权页成功，后续回调
            this.shanyan.finishAuthActivity()
            if (ret.code == 1000) {
              // 获取Token成功
              api.alert({
                title: 'SDK获取Token成功',
                msg: JSON.stringify(ret.result)
              })
            } else {
              // 获取Token失败
            }
          } else {
            // ret.type：0 拉授权页的回调
          }

          console.log(JSON.stringify(ret))
        })
      } else if (this.platform == 'ios') {
        // 一键登录
        // iOS 简单竖屏全屏模式

        const screenWidth_Portrait = api.winWidth // 竖屏宽

        let screenScale = screenWidth_Portrait / 375.0 // 相对iphone6屏幕
        if (screenScale > 1) {
          screenScale = 1 // 大屏的无需放大
        }

        // 先计算各控件位置及相对关系
        // logo
        const clLayoutLogoTop_Portrait = screenScale * 60
        const clLayoutLogoWidth_Portrait = 60 * screenScale
        const clLayoutLogoHeight_Portrait = 60 * screenScale
        const clLayoutLogoCenterX_Portrait = 0

        // 手机号
        const clLayoutPhoneCenterY_Portrait = -20 * screenScale
        const clLayoutPhoneLeft_Portrait = 50 * screenScale
        const clLayoutPhoneRight_Portrait = -50 * screenScale
        const clLayoutPhoneHeight_Portrait = 20 * screenScale

        // 一键登录按钮
        const clLayoutLoginBtnCenterY_Portrait =
          clLayoutPhoneCenterY_Portrait +
          clLayoutPhoneHeight_Portrait * 0.5 * screenScale +
          20 * screenScale +
          15 * screenScale
        const clLayoutLoginBtnHeight_Portrait = 30 * screenScale
        const clLayoutLoginBtnLeft_Portrait = 70 * screenScale
        const clLayoutLoginBtnRight_Portrait = -70 * screenScale

        // 隐私协议
        const clLayoutAppPrivacyLeft_Portrait = 40 * screenScale
        const clLayoutAppPrivacyRight_Portrait = -40 * screenScale
        const clLayoutAppPrivacyBottom_Portrait = 0 * screenScale
        const clLayoutAppPrivacyHeight_Portrait = 45 * screenScale

        // 运营商能力标签(认证服务由**提供)
        const clLayoutSloganLeft_Portrait = 0
        const clLayoutSloganRight_Portrait = 0
        const clLayoutSloganHeight_Portrait = 15 * screenScale
        const clLayoutSloganBottom_Portrait =
          clLayoutAppPrivacyBottom_Portrait - clLayoutAppPrivacyHeight_Portrait

        // ios_uiConfigure 用于传入一键登录方法
        this.ios_uiConfigure = {
          clBackgroundImg: '../../assets/imgs/login_bg.png', // 全屏背景
          shouldAutorotate: false, // 支持自动旋转
          supportedInterfaceOrientations: 0,
          clNavigationBackgroundClear: true, // 导航栏透明
          clNavigationBackBtnImage: 'image/shanyanImg/close-white.png', // 返回按钮图片，自带返回按钮大小将由1x图片大小决定
          clNavBackBtnAlimentRight: false, // 返回按钮居右

          clLogoImage: '../../assets/imgs/login_logo.png', // logo图片

          clLoginBtnText: '本机号码一键登录', // 一键登录按钮文字
          clLoginBtnTextColor: [1, 1, 1, 1.0], // rgba
          clLoginBtnBgColor: [235, 88, 65, 1.0], // rgba
          clLoginBtnTextFont: 15 * screenScale,
          clLayoutLoginBtnHeight: 90 * screenScale,
          clLoginBtnCornerRadius: 10,
          clLoginBtnBorderWidth: 0.5,
          clLoginBtnBorderColor: [235, 88, 65, 1.0], // rgba

          clPhoneNumberFont: 26.0 * screenScale, // 手机号字体

          clAuthTypeUseWindow: true, // 弹窗模式
          // clAuthWindowCornerRadius: 20,//弹窗模式下的窗口圆角

          // 隐私协议
          clAppPrivacyColor: [
            [0.6, 0.6, 0.6, 1.0],
            [0, 1, 0, 1.0]
          ], // 2 item,commomTextColor and appPrivacyTextColor
          clAppPrivacyTextFont: 11 * screenScale,
          clAppPrivacyTextAlignment: 0, // 0: center 1: left 2: right
          clAppPrivacyFirst: ['《美好生活家园用户协议》', '/agreement'],

          // 隐私协议勾选框
          clCheckBoxVerticalAlignmentToAppPrivacyCenterY: true,
          clCheckBoxSize: [30 * screenScale, 30 * screenScale], // 2 item, width and height
          clCheckBoxImageEdgeInsets: [
            2 * screenScale,
            10 * screenScale,
            13 * screenScale,
            5 * screenScale
          ], // 4 item, top left bottom right
          clCheckBoxUncheckedImage: 'image/shanyanImg/checkBoxNor.png',
          clCheckBoxCheckedImage: 'image/shanyanImg/checkBoxSEL.png',

          // 加载动画
          clLoadingSize: [50, 50], // 2 item, width and height
          clLoadingTintColor: [0.2, 0.8, 0.2, 1],
          clLoadingBackgroundColor: [1, 1, 1, 1],
          clLoadingCornerRadius: 5,

          // 竖屏布局对象
          clOrientationLayOutPortrait: {
            // 控件:
            // logo
            clLayoutLogoWidth: clLayoutLogoWidth_Portrait,
            clLayoutLogoHeight: clLayoutLogoHeight_Portrait,
            clLayoutLogoCenterX: clLayoutLogoCenterX_Portrait,
            clLayoutLogoTop: clLayoutLogoTop_Portrait,
            // 手机号
            clLayoutPhoneCenterY: clLayoutPhoneCenterY_Portrait,
            clLayoutPhoneHeight: clLayoutPhoneHeight_Portrait,
            clLayoutPhoneLeft: clLayoutPhoneLeft_Portrait,
            clLayoutPhoneRight: clLayoutPhoneRight_Portrait,
            // 一键登录按钮
            clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Portrait,
            clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Portrait,
            clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Portrait,
            clLayoutLoginBtnRight: clLayoutLoginBtnRight_Portrait,
            // 隐私协议
            clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Portrait,
            clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Portrait,
            clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Portrait,
            clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Portrait,
            // 运营商能力标签(认证服务由**提供)
            clLayoutSloganLeft: clLayoutSloganLeft_Portrait,
            clLayoutSloganRight: clLayoutSloganRight_Portrait,
            clLayoutSloganHeight: clLayoutSloganHeight_Portrait,
            clLayoutSloganBottom: clLayoutSloganBottom_Portrait
          }
        }

        // 先设置SDK回调
        this.shanyan.openLoginAuthListener(
          {},
          // openLoginAuthListener:调起授权页回调
          function (ret, err) {
            api.hideProgress()

            if (err != null) {
              // 调起授权页 失败
            } else {
              // 调起授权页 成功
            }

            api.toast({
              msg: JSON.stringify(ret),
              location: 'middle'
            })

            console.log(JSON.stringify(ret))
          }
        )
        this.shanyan.oneKeyLoginListener(
          {},
          // oneKeyLoginListener:调起授权页成功，后续回调
          function (ret, err) {
            api.hideProgress()

            if (err != null) {
              if (err.errorCode == 1011) {
                // 点了返回,自动授权页关闭
                // 提示：错误无需提示给用户，可以在用户无感知的状态下直接切换登录方式
                // 用户取消登录（点返回）
                // 处理建议：如无特殊需求可不做处理，仅作为交互状态回调，此时已经回到当前用户自己的页面
                // 点击sdk自带的返回，无论是否设置手动销毁，授权页面都会强制关闭
              } else {
                // 处理建议：其他错误代码表示闪验通道无法继续，可以统一走开发者自己的其他登录方式，也可以对不同的错误单独处理
                // 关闭授权页
                this.shanyan.finishAuthControllerCompletion()
              }
            } else {
              // SDK获取Token成功
              api.alert({
                title: 'SDK获取Token成功',
                msg: JSON.stringify(ret.data.token)
              })

              // 此处根据token调用户后台接口获取手机号，获取成功或失败后再调shanYanSDKModule.finishAuthControllerCompletion()关闭页面
              // //关闭授权页
              this.shanyan.finishAuthControllerCompletion()
            }

            api.toast({
              msg: JSON.stringify(ret),
              location: 'middle'
            })

            console.log(JSON.stringify(ret))
          }
        )
        // 调起授权页
        this.shanyan.quickAuthLoginWithConfigure(this.ios_uiConfigure)
      }
    },
    /* 一键登录 */
    oneKeyLogin () {},
    /* 登录 */
    login () {
      if (!this.agree) {
        Toast('请阅读并同意用户协议')
        return
      }
      let params = {}
      /* 验证码登录 */
      if (this.login_type === 1) {
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
      } else if (this.login_type === 2) {
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
      this.$store
        .dispatch('login', {
          type: this.login_type,
          params
        })
        .then(() => {
          this.$router.replace({
            name: 'home'
          })
        })
    },
    /* 发送验证码 */
    verifCode () {
      verifCode({
        mobile: this.mobile
      }).then((res) => {
        Toast.success('验证码发送成功，请注意查收')
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
.page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 84px;
  flex: 1;
  display: flex;
  overflow: auto;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  background-image: url("../../assets/imgs/login_bg.png");
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
    display: flex;
    line-height: 80px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 36px;
  }
  /deep/ .van-field__control {
    color: #fff;
  }
}
.form-input-phoneNum {
  height: 200px;
  font-size: 52px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  padding: 0;
  margin-top: 80px;
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
  margin-top: 160px;
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.uni-checkbox-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border: 2px solid #fff;
  border-radius: 3px;
  width: 28px;
  height: 28px;
}
.checkbox-icon {
  font-size: 20px;
}
.tf-icon-gou {
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
  margin-bottom: 40px;
}
.agreement-text {
  font-size: 24px;
}
</style>
