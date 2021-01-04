<template>
  <div class="page">
    <i
      v-if="status"
      class="van-icon van-icon-arrow-left van-nav-bar__arrow"
      @click="$router.go(-1)"
    ></i>
    <img class="logo" src="@/assets/imgs/login_logo.png" />
    <img class="logo-text" src="@/assets/imgs/login_logo_text.png" />
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
            <van-count-down
              v-if="codeStatus"
              :time="countDownTime"
              @finish="countFinish"
            >
              <template #default="timeData">
                <span class="tf-text-white">{{ timeData.seconds }}s</span>
              </template>
            </van-count-down>
            <van-button
              v-else
              class="query-btn"
              :loading="codeLoading"
              @click="verifCode"
              >获取</van-button
            >
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
    <van-button
      v-preventReClick
      :loading="loginLoading"
      class="login-btn"
      @click="login"
      >登 录</van-button
    >
    <span
      v-if="login_type === 1"
      class="login-method__text"
      @click="login_type = 2"
      >密码登录</span
    >
    <span
      v-else-if="login_type === 2"
      class="login-method__text"
      @click="login_type = 1"
      >验证码登录</span
    >
    <div class="agreement" @click="changeRememberPasswrod">
      <div class="uni-checkbox-input">
        <span
          class="tf-icon checkbox-icon"
          :class="{ 'tf-icon-gou': agree }"
        ></span>
      </div>
      <span class="agreement-text" style="color: #fff;">
        登录即表示您同意
        <router-link
          style="color: #fff;text-decoration: underline;"
          to="/agreement"
          >《美好生活家园用户协议》</router-link
        >
      </span>
    </div>
  </div>
</template>

<script>
import { NavBar, Field, Button, Toast, Dialog, CountDown } from "vant";
import { verifCode } from "@/api/user";
import { validEmpty } from "@/utils/util";
import { hasPermission, reqPermission } from "@/utils/permission";
import { setStatisticsData } from "@/utils/analysis.js";
export default {
  components: {
    Field,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      mobile: undefined,
      yzm: undefined,
      pwd: undefined,
      login_type: 1, // 1:验证码登录 2：密码登陆
      agree: true, // 同意协议
      showPassword: false,
      codeLoading: false,
      codeStatus: false,
      countDownTime: 60000,
      status: 0,
      loginLoading: false
    };
  },
  created() {
    this.status = this.$route.query.status;
  },
  mounted() {
    const perms = hasPermission("location");
    if (!perms[0].granted) {
      Dialog.confirm({
        title: "提示",
        message: "没有开启定位，可能会影响部分功能哦，是否前往开启权限？",
        confirmButtonText: "去开启"
      })
        .then(res => {
          reqPermission("location", ({ list }) => {
            if (!list[0].granted) {
            }
          });
        })
        .catch(() => {});
    }
  },
  methods: {
    // 定位未开启提醒
    warnLoacation() {
      Toast("没有开启定位，可能会影响部分功能哦！");
    },
    changeRememberPasswrod() {
      this.agree = !this.agree;
    },
    changePassword() {
      this.showPassword = !this.showPassword;
    },
    /* 登录 */
    login() {
      if (!this.agree) {
        Toast("请阅读并同意用户协议");
        return;
      }
      let params = {};
      /* 验证码登录 */
      if (this.login_type === 1) {
        if (
          validEmpty(this.mobile, "请输入手机号码") ||
          validEmpty(this.yzm, "请输入验证码")
        ) {
          return;
        }
        params = {
          mobile: this.mobile,
          yzm: this.yzm
        };
      } else if (this.login_type === 2) {
        /* 密码登录 */
        if (
          validEmpty(this.mobile, "请输入手机号码") ||
          validEmpty(this.pwd, "请输入密码")
        ) {
          return;
        }
        params = {
          mobile: this.mobile,
          pwd: this.pwd
        };
      }
      this.loginLoading = true;
      this.$store
        .dispatch("login", {
          type: this.login_type,
          params
        })
        .then(data => {
          this.loginLoading = false;
          const share_params = this.$store.state.share_params || "";
          if (share_params) {
            this.$store.commit("setShare_params", "");
            if (share_params.page_type == 1) {
              this.$router.replace({
                path: "/store/goods-detail",
                query: {
                  id: share_params.id,
                  f_id: share_params.f_id
                }
              });
            } else if (share_params.page_type == 2) {
              this.$router.replace({
                path: "/pages/neighbours/details",
                query: {
                  articleType: share_params.articleType,
                  id: share_params.id
                }
              });
            }
          } else {
            this.$router.replace({
              name: "home"
            });
          }
          if (data.first_register == 1) {
            this.mtjEvent({
              eventId: 2
            });
          }
          this.mtjEvent({
            eventId: 1
          });
          // 登入新增
          setStatisticsData(4, { mobile: this.mobile });
        })
        .catch(() => {
          this.loginLoading = false;
        });
    },
    /* 发送验证码 */
    verifCode() {
      this.codeLoading = true;
      verifCode({
        mobile: this.mobile
      })
        .then(res => {
          Toast.success("验证码发送成功，请注意查收");
          this.codeLoading = false;
          this.codeStatus = true;
        })
        .catch(err => {
          if (!err) {
            Toast.fail("获取失败，请重试");
          }
          this.codeLoading = false;
        });
    },
    /* 倒计时结束 */
    countFinish() {
      this.countDownTime = 60000;
      this.codeStatus = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setShare_params", "");
    next();
  }
};
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
  .van-nav-bar__arrow {
    position: fixed;
    left: 20px;
    top: 52px;
    color: #fff;
  }
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
.login-btn {
  width: 560px;
  height: 88px;
  line-height: 88px;
  background-image: linear-gradient(to right, @red, @red-dark);
  border-radius: 10px;
  border-width: 0;
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
