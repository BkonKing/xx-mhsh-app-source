<template>
  <div class="tf-bg" ref="container">
    <van-nav-bar
      ref="navBar"
      title="幸福币"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      right-text="明细"
      @click-left="$router.go(-1)"
      @click-right="goCoinRecord"
    ></van-nav-bar>
    <div class="page-bg">
      <div class="sign-box">
        <div class="coin-box">
          <div class="tf-icon tf-icon-xingfubi1 coin-icon">
            <span class="coin-number">{{ credits }}</span>
          </div>
          <div class="coin-freeze">
            <span>可用{{ ky_credits }}</span>
            <span v-if="+sd_credits">不可用{{ sd_credits }}</span>
          </div>
          <van-button
            v-preventReClick
            :loading="signLoading"
            class="sign-tag"
            :class="{ 'sign-tag--complete': signinToday !== 0 }"
            @click="handleSignIn"
            ><img
              class="sign-img"
              src="@/assets/personage/qiandao.png"
              alt=""
            />{{ signinToday === 1 ? "已签到" : "签到" }}</van-button
          >
        </div>
      </div>
      <div class="scan-box">
        <div class="function-box" @click="goScanCode(1)">
          <img
            class="function-box__icon"
            src="@/assets/personage/credits_saoyisao.png"
          />
          <div class="function-box__text">扫一扫</div>
        </div>
        <div class="function-box" @click="goScanCode(2)">
          <img
            class="function-box__icon"
            src="@/assets/personage/credits_shoukuan.png"
          />
          <div class="function-box__text">付款码</div>
        </div>
        <div class="function-box" @click="goScanCode(3)">
          <img
            class="function-box__icon"
            src="@/assets/personage/credits_fukuan.png"
          />
          <div class="function-box__text">收款码</div>
        </div>
      </div>
    </div>
    <div v-if="isShowBanner" class="banner-container" @click="openCouponCentre">
      <img class="coupon-banner" :src="shopBannerInfo.banner" alt="" />
      <span class="banner-text" v-html="bannerText"></span>
    </div>
    <div v-if="taskData && taskData.length" class="credit-task-box">
      <task-list
        :data="taskData"
        :signinToday="signinToday"
        :userType="userType"
        :entranceStatus="entranceStatus"
        :show-unfinished="true"
        @signIn="handleSignIn"
      ></task-list>
    </div>
    <van-tabs v-model="tabActive" class="credit-tabs" sticky :offset-top="`${offsetTop}px`" :lazy-render="false" id="tabs">
      <van-tab title="兑换专区">
        <credit-area :data="creditsGoods"></credit-area>
      </van-tab>
      <van-tab title="领券中心"><get-coupon-list @getSuccess="init"></get-coupon-list></van-tab>
      <van-tab
        v-if="taskData && taskData.length"
        title="任务中心"
        class="task-tab"
      >
        <task-list
          :data="taskData"
          :signinToday="signinToday"
          :userType="userType"
          :entranceStatus="entranceStatus"
          @signIn="handleSignIn"
        ></task-list>
      </van-tab>
    </van-tabs>
    <tf-calendar v-model="showCalendar"></tf-calendar>
    <sign-rule-dialog v-model="signRuledialog"></sign-rule-dialog>
    <sign-alert
      v-model="signAlertVisible"
      :message="signMessage"
      :credits="signOwnerCredits"
    ></sign-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tfCalendar from '@/components/tf-calendar'
import SignAlert from '@/views/home/components/SignAlert'
import { handlePermission } from '@/utils/permission'
import SignRule from './components/SignRuleV2'
import TaskList from './components/TaskList'
import CreditArea from './components/CreditArea'
import GetCouponList from './components/GetCouponList'
import { getCreditsGoodsList } from '@/api/home'
import { signin, getCreditsAccount } from '@/api/personage'
import { getShopCouponBanner } from '@/api/personage/shop'
export default {
  name: 'happinessCoinIndex',
  components: {
    tfCalendar,
    SignAlert,
    TaskList,
    CreditArea,
    GetCouponList,
    [SignRule.name]: SignRule
  },
  data () {
    return {
      showCalendar: false, // 签到日历是否隐藏
      signinToday: 1, // 今日是否签到
      credits: 0, // 当前幸福币
      taskData: [], // 任务列表  task_type： 1: 签到 2：认证成功 3：首次开门 7:朋友到访、购房奖励
      creditsGoods: [], // 幸福币商品列表
      signLoading: false, // 签到按钮loading
      entranceStatus: true, // 是否有门禁
      signRuledialog: false,
      sd_credits: '', // 锁定幸福币
      ky_credits: '', // 可用幸福币
      signAlertVisible: false, // 游客认证提醒弹窗
      signMessage: '', // 签到成功提醒
      signOwnerCredits: '', // 业主签到幸福币
      tabActive: 0,
      offsetTop: 0,
      shopBannerInfo: {},
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['userType', 'userInfo']), // 1业主、2业主成员、3租户、4租户成员
    shopId () {
      return this.userInfo.shops_id
    },
    isShowBanner () {
      return +this.shopBannerInfo.z_money
    },
    bannerText () {
      const bannerText = this.shopBannerInfo.banner_text
      if (!bannerText) {
        return ''
      }
      const text = bannerText.split('$money$')
      if (text.length < 2) {
        return bannerText
      }
      const text0 = text[0]
      const text1 = text[1]
      return `${text0}<span class="shop-coupon-banner-number">${this.shopBannerInfo.z_money}</span>${text1}`
    }
  },
  created () {
    this.init()
    this.getCreditsGoodsList()
  },
  mounted () {
    // 安卓下部分需要添加顶部安全距离
    if (process.env.VUE_APP_IS_APP === '1') {
      this.offsetTop = api.safeArea.top + this.$refs.navBar.height
    }
  },
  activated () {
    if (this.scrollTop) {
      const el = this.$refs.container
      el.scrollTop = this.scrollTop
    }
  },
  beforeRouteLeave (to, from, next) {
    const el = this.$refs.container
    this.scrollTop = el.scrollTop || 0
    if (to.name !== 'goodsDetail') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  },
  methods: {
    init () {
      this.getCreditsAccount()
      this.getShopCouponBanner()
    },
    // 获取幸福币信息
    getCreditsAccount () {
      getCreditsAccount().then(({ data }) => {
        this.signinToday = data.signin_status
        this.taskData = data.task_list
        this.credits = data.credits
        this.entranceStatus = !!+data.mj_status
        this.ky_credits = data.ky_credits
        this.sd_credits = data.sd_credits
      })
    },
    async getShopCouponBanner () {
      const { data } = await getShopCouponBanner({
        shops_id: this.shopId
      })
      this.shopBannerInfo = data || {}
    },
    // 签到事件
    handleSignIn () {
      if (this.signinToday === 1) {
        // 已签到，则打开签到日历
        this.showCalendar = true
      } else if (this.signinToday === 2) {
        // 不可签到，打开签到规则弹窗
        this.signRuledialog = true
      } else {
        this.signin()
      }
    },
    // 签到请求
    signin () {
      handlePermission({
        name: 'location',
        title: '定位服务未开启',
        message: '为了提供更好服务，需要您开启定位'
      }).then(() => {
        this.signLoading = true
        signin()
          .then(res => {
            this.signLoading = false
            if (+res.open_box) {
              this.signMessage = res.message
              this.signOwnerCredits = res.owner_credits
              this.signAlertVisible = true
            } else {
              this.$toast({
                message: res.message
              })
            }
            this.getCreditsAccount()
            this.mtjEvent({
              eventId: 4
            })
          })
          .catch(() => {
            this.signLoading = false
          })
      })
    },
    // 幸福币明细
    goCoinRecord () {
      this.$router.push({ name: 'happinessCoinRecord' })
    },
    // 扫一扫
    goScanCode (current) {
      this.$router.push({
        name: 'scanCodeIndex',
        query: {
          current
        }
      })
    },
    // 获取幸福币专区
    getCreditsGoodsList () {
      getCreditsGoodsList().then(res => {
        this.creditsGoods = res.data
      })
    },
    // 菜单悬挂顶部，tab切换到“领券中心”
    openCouponCentre () {
      this.tabActive = 1
      this.$refs.container.scrollTop = document.getElementById('tabs').offsetTop - this.$refs.navBar.height - api.safeArea.top
    }
  }
}
</script>

<style lang="less" scoped>
@gold-color: #ca864e;
.tf-bg {
  background: #f7f7f7;
}
/deep/ .van-nav-bar {
  background: #f7f7f7;
  .van-nav-bar__text {
    font-size: 32px;
  }
}
.page-bg {
  margin: 30px 20px 0;
}
.sign-box {
  position: relative;
  z-index: 2;
  width: 710px;
  height: 336px;
  background: url("~@/assets/personage/credits_header.png") no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
}
.coin-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  .coin-icon {
    font-size: 56px;
    line-height: 1;
    color: #fff;
  }
  .coin-number {
    margin-left: 26px;
    font-size: 56px;
    line-height: 1;
    font-weight: 500;
    color: #fff;
  }
  .coin-freeze {
    display: flex;
    align-items: center;
    margin-top: 34px;
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    span {
      line-height: 1;
    }
    span + span {
      margin-left: 26px;
    }
  }
  .sign-tag {
    width: 200px;
    height: 80px;
    margin-top: 34px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    background: linear-gradient(90deg, #ef9237 0%, #ec5850 99%);
    border: none;
    border-radius: 40px;
    /deep/ .van-button__text {
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
  .sign-img {
    width: 28px;
    height: 28px;
    margin-right: 16px;
  }
  .sign-tag--complete {
    opacity: 0.2;
  }
}
.scan-box {
  display: flex;
  justify-content: space-around;
  padding: 100px 30px 60px;
  margin-top: -40px;
  background: #fff;
  .function-box {
    padding: 0 46px;
  }
  .function-box__text {
    font-size: 26px;
    color: #7a7a7e;
    text-align: center;
  }
  .function-box__icon {
    width: 88px;
    height: 88px;
    border-radius: 50%;
  }
}
.banner-container {
  width: 710px;
  height: 140px;
  margin: 30px 20px 0;
  position: relative;
  .coupon-banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .banner-text {
    position: absolute;
    top: 42px;
    left: 86px;
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
    background: linear-gradient(0deg, #ffe28c 0.2685546875%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.credit-task-box {
  flex: 1;
  margin: 30px 20px 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.credit-tabs {
  margin: 30px 0 0;
  /deep/ .van-tabs__wrap {
    height: 110px;
    .van-tabs__nav {
      background: linear-gradient(0deg, #f7f7f7 0%, #ffffff 100%);
      border-radius: 20px 20px 0px 0px;
    }
    .van-tab {
      width: 180px;
      flex: initial;
      justify-content: flex-start;
      padding: 50px 20px 30px;
      span {
        line-height: 1.1;
      }
    }
    .van-tabs__line {
      width: 55px !important;
      height: 8px;
      left: -40px;
      background: #ff6555;
      border-radius: 4px;
    }
    .van-tab--active .van-tab__text {
      font-size: 32px;
      font-weight: bold;
    }
  }
  /deep/ .van-tabs__content {
    margin-top: 50px;
  }
}
.task-tab {
  padding: 0 20px 30px;
}
</style>

<style>
.shop-coupon-banner-number {
  font-size: 56px;
  line-height: 1;
}
</style>
