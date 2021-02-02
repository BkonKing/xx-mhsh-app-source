<template>
  <div class="tf-bg">
    <div class="theme-container"></div>
    <van-nav-bar
      title="确认订单"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-main-container">
      <div class="order-box">
        <div class="order-film-name">{{ info.film_name }}</div>
        <div class="order-cinema-name">{{ info.cinema_name }}</div>
        <div class="order-info">
          <div class="order-info-box">
            <div class="order-info-label">日期：</div>
            <div class="order-info-value">{{ info.date }} {{ info.week }}</div>
          </div>
          <div class="order-info-box">
            <div class="order-info-label">时间：</div>
            <div class="order-info-value">{{ info.time }}</div>
          </div>
          <div class="order-info-box">
            <div class="order-info-label">厅号：</div>
            <div class="order-info-value van-ellipsis">
              {{ info.hall_name }}
            </div>
          </div>
          <div class="order-info-box">
            <div class="order-info-label">语言：</div>
            <div class="order-info-value">{{ info.copy_language }}</div>
          </div>
          <div class="order-info-box" style="width: 100%;">
            <div class="order-info-label">座位：</div>
            <div class="order-info-value">{{ info.seat_name }}</div>
          </div>
        </div>
      </div>
      <van-cell-group class="discounts-box">
        <van-cell
          v-if="info.coupon"
          class="cell-border"
          title="优惠券"
          value="内容"
          center
          is-link
        />
        <van-cell
          class="cell-border"
          :title="`幸福币(${info.credits}币)`"
          center
          title-class="auto-width"
        >
          <template v-if="info.credits != '0'">
            <div class="tf-text" @click="useCredits = !useCredits">
              使用{{ info.credits }}幸福币抵扣<span class="tf-text-primary"
                >￥{{ parseInt(info.credits) / 10 }}</span
              >
            </div>
            <van-checkbox v-model="useCredits" shape="square"></van-checkbox>
          </template>
          <div class="tf-text-grey" v-else>攒幸福币可以用来抵扣哦！</div>
        </van-cell>
        <van-cell title="" center>
          <div class="tf-text-grey">
            共 {{ info.ticket_count }} 张
            <span class="tf-ml-base"
              >合计:<span class="cell-text-emphasis"
                >￥{{ payAmount }}</span
              ></span
            >
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="discounts-box">
        <van-cell title="手机号" :value="info.mobile" center />
        <van-cell
          class="cell-border"
          title="手机号仅用于生成订单，取票码不再以短信发送"
          center
        >
        </van-cell>
        <van-cell
          title="不支持退票及改签"
          center
          @click="agreement = !agreement"
        >
          我同意<van-checkbox v-model="agreement" shape="square"></van-checkbox>
        </van-cell>
      </van-cell-group>
      <van-button v-preventReClick type="primary" size="large" @click="pay"
        >￥{{ payAmount }} 确定支付</van-button
      >
    </div>
    <pay-swal
      ref="payblock"
      :show-swal="showPaySwal"
      :pay-money="payAmount"
      @closeSwal="closePaySwal"
      @sureSwal="surePaySwal"
      @fyResult="fyResult"
    ></pay-swal>
    <van-overlay :show="successShow" z-index="9999" class-name="pay-success">
      <span class="tf-icon tf-icon-guanbi1" @click="$router.go(-2)"></span>
      <img class="success-img" src="@/assets/imgs/success.png" alt="" />
      <div class="tf-text">支付成功</div>
      <div class="success-money">
        ￥<span class="success-mony-number">{{ payAmount }}</span>
      </div>
      <router-link class="success-link" :to="`/life/movie/ticket?id=${orderId}`"
        >查看详情</router-link
      >
      <van-button class="success-btn" @click="$router.go(-2)">确定</van-button>
    </van-overlay>
  </div>
</template>

<script>
import paySwal from './../components/pay-swal'
import { mapGetters } from 'vuex'
import {
  getConfirmOrder,
  getUserCoupon,
  calculatePrice,
  payOrder,
  payCredits
} from '@/api/movie'
export default {
  name: 'movieConfirmOrder',
  data () {
    return {
      orderId: '',
      agreement: false,
      useCredits: false, // 是否用幸福币抵用
      showPaySwal: false, // 支付方式弹窗
      info: {},
      payAmount: 0, // 支付金额
      payOrderInfo: {}, // 支付信息
      idcard: '', // 身份证
      successShow: false
    }
  },
  components: {
    paySwal
  },
  computed: {
    ...mapGetters(['userInfo'])
    // payAmount () {
    //   let num = parseFloat(this.info.source_price)
    //   if (this.useCredits) {
    //     num = num - parseInt(this.info.credits) / 10
    //   }
    //   return num
    // }
  },
  created () {
    this.orderId = this.$route.query.orderId
    this.getConfirmOrder()
    this.getUserCoupon()
  },
  activated () {
    let bankCardInfo = api.getPrefs({ sync: true, key: 'realNameInfo' }) || ''
    if (bankCardInfo) {
      if (typeof bankCardInfo.idcard === 'undefined' || !bankCardInfo.idcard) {
        this.idcard = bankCardInfo.idCard
      }
      bankCardInfo = JSON.parse(bankCardInfo)
      this.$refs.payblock.newCard(bankCardInfo)
    }
  },
  methods: {
    // 获取订单详情
    getConfirmOrder () {
      getConfirmOrder({
        order_id: this.orderId
      }).then(({ data }) => {
        this.info = data
        // 首次买票默认没勾选；购买过一次后，默认勾选
        this.agreement = data.ischeck
        this.payAmount = parseFloat(data.price)
      })
    },
    // 获取用户优惠券
    getUserCoupon () {
      getUserCoupon({
        uid: this.userInfo.id
      }).then(({ data }) => {
        console.log(data)
      })
    },
    // 计算支付金额
    calculatePrice () {
      calculatePrice({
        order_id: this.orderId,
        credits: this.info.credits,
        coupon_id: this.info.credits,
        type: this.useCredits ? 1 : 0
      }).then(({ data }) => {
        this.payAmount = parseFloat(data.price)
      })
    },
    // 发起支付
    pay () {
      if (this.agreement) {
        // 支付金额为0则调用幸福币支付
        if (this.payAmount == 0) {
          this.payCredits()
        } else {
          this.showPaySwal = true
        }
      } else {
        this.$toast('请同意不支持退票及改签')
      }
    },
    // 支付
    surePaySwal (callData) {
      payOrder({
        order_id: this.orderId,
        pay_type: callData.pay_type,
        pay_price: this.payAmount,
        bank_id: callData.bank_id,
        bank_card: callData.bank_card,
        realname: callData.realname,
        idcard: callData.idcard,
        mobile: callData.mobile
      })
        .then(res => {
          const { data, order_info } = res
          this.payOrderInfo = data
          if (callData.pay_type == 1) {
            this.showPaySwal = false
            this.wxPayUp()
          } else if (callData.pay_type == 2) {
            this.showPaySwal = false
            this.aliPayUp()
          } else if (callData.pay_type == 4) {
            this.$refs.payblock.sendCode(res)
          }
        })
        .catch(res => {
          if (callData.pay_type == 4) {
            if (this.idcard) {
              this.$router.push({
                path: '/pages/personage/information/addBankCard',
                query: {
                  message: res.message
                }
              })
            } else {
              this.$router.push({
                path: '/pages/personage/information/certification',
                query: {
                  message: res.message
                }
              })
            }
          }
        })
    },
    // 支付宝支付
    aliPayUp () {
      var aliPayPlus = api.require('aliPayPlus')
      aliPayPlus.payOrder({ orderInfo: this.payOrderInfo }, (ret, err) => {
        this.fyResult()
      })
    },
    // 微信支付
    wxPayUp () {
      const wxPayPlus = api.require('wxPayPlus')
      wxPayPlus.payOrder(
        {
          apiKey: this.payOrderInfo.appid,
          mchId: this.payOrderInfo.partnerid,
          orderId: this.payOrderInfo.prepayid,
          nonceStr: this.payOrderInfo.noncestr,
          timeStamp: this.payOrderInfo.timestamp,
          package: this.payOrderInfo.package,
          sign: this.payOrderInfo.paySign
        },
        (ret, err) => {
          this.fyResult()
        }
      )
    },
    // 幸福币支付
    payCredits () {
      payCredits({
        order_id: this.orderId,
        credits: this.info.credits
      }).then(({ data }) => {
        this.fyResult()
      })
    },
    // 支付成功回调
    fyResult () {
      this.showPaySwal = false
      this.successShow = true
      // this.getData()
    },
    // 关闭支付选择弹窗
    closePaySwal (data) {
      this.showPaySwal = data === 1
    }
  },
  watch: {
    useCredits () {
      this.calculatePrice()
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['movieSeat']
    if (names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.theme-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 260px;
  background-image: linear-gradient(to right, @red, @red-dark);
}
/deep/ .van-nav-bar {
  background: initial;
  .van-icon,
  .van-nav-bar__title {
    color: #fff;
  }
}
.tf-main-container {
  padding: 0 20px;
}
.pay-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .tf-icon-guanbi1 {
    position: absolute;
    top: 80px;
    left: 32px;
    font-size: 50px;
    line-height: 1;
    color: #383838;
  }
  .success-img {
    width: 220px;
    height: 220px;
    margin-top: 258px;
  }
  .tf-text {
    margin-top: 40px;
  }
  .success-money {
    margin-top: 100px;
    font-size: 48px;
    font-weight: 600;
    .success-mony-number {
      font-size: 72px;
    }
  }
  .success-link {
    margin-top: 40px;
    font-size: 24px;
    color: #8f8f94;
  }
  .success-btn {
    width: 420px;
    border-color: #383838;
    border-radius: 10px;
    position: absolute;
    bottom: 80px;
    font-size: 30px;
    color: #000;
  }
}
.order-box {
  position: relative;
  z-index: 1;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  .order-film-name {
    font-size: 38px;
  }
  .order-cinema-name {
    margin-top: 10px;
    padding-bottom: 34px;
    font-size: 30px;
    border-bottom: 2px solid #f0f0f0;
  }
  .order-info {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    .order-info-box {
      width: 50%;
      margin-bottom: 10px;
      font-size: 24px;
      .order-info-label {
        line-height: 40px;
        color: #8f8f94;
      }
      .order-info-value {
        line-height: 40px;
        font-size: 28px;
      }
    }
  }
}
.discounts-box {
  margin-top: 30px;
  border-radius: 10px;
  .auto-width {
    flex: initial;
  }
  .cell-border {
    border-bottom: 2px solid #f0f0f0;
  }
  .cell-text-emphasis {
    font-size: 34px;
    color: #222;
  }
  /deep/ .van-cell {
    // align-items: center;
    width: initial;
    height: 100px;
    padding: 10px 0;
    margin: 0 30px;
    background: initial;
    .van-cell__title {
      font-size: 28px;
      color: #8f8f94;
    }
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      color: #222222;
    }
  }
}
/deep/ .van-button--large {
  margin-top: 60px;
  border-radius: 44px;
}
/deep/ .van-checkbox {
  margin-left: 20px;
}
</style>
