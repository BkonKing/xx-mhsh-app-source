<template>
  <div class="get-coupon-list">
    <div v-for="(shop, index) in data" :key="index">
      <div v-if="shop.shops_name" class="shop-name">
        <img class="shop-img" src="@/assets/personage/shop.png" alt="" />{{
          shop.shops_name
        }}
      </div>
      <template v-for="(coupon, i) in shop.list">
        <coupon-item :data="coupon" :key="i">
          <van-button v-if="!+coupon.is_complete" class="btn-ing"
            >已领取</van-button
          >
          <van-button
            v-if="+coupon.is_complete"
            class="btn-click"
            @click.stop="handleReceive(coupon)"
            ><i v-if="coupon.pay_type === '1'" class="tf-icon tf-icon-xingfubi1"></i
            >{{ coupon | btnText }}</van-button
          >
        </coupon-item>
      </template>
    </div>
    <pay-swal
      ref="payblock"
      :show-swal="showPaySwal"
      :pay-money="payAmount"
      @sureSwal="surePaySwal"
      @closeSwal="closePaySwal"
      @fyResult="fyResult"
    ></pay-swal>
    <van-popup
      v-model="showPayCredit"
      closeable
      position="bottom"
      safe-area-inset-bottom
      class="credit-popup"
    >
      <div class="credit-title">付款</div>
      <div class="credit-content">
        <i class="tf-icon tf-icon-xingfubi1"></i>{{activeCoupon.pay_money}}
      </div>
      <van-button class="credit-confirm-btn" @click="receiveCoupon">确定付款</van-button>
    </van-popup>
  </div>
</template>

<script>
import paySwal from '@/views/life/components/pay-swal'
import CouponItem from './CouponItem'
import { payOrderUp } from '@/api/life'
import { getCouponReceiveList, receiveCoupon } from '@/api/personage/shop'

export default {
  components: { CouponItem, paySwal },
  data () {
    return {
      showPayCredit: false,
      showPaySwal: false, // 支付方式弹窗
      activeCoupon: {},
      orderId: '',
      payAmount: 0, // 支付金额
      payOrderInfo: {},
      data: []
    }
  },
  filters: {
    btnText (coupon) {
      if (+coupon.coupon_mode === 1) {
        return '免费领'
      } else if (+coupon.pay_type === 2) {
        return `￥${coupon.pay_money}抢券`
      } else if (+coupon.pay_type === 1) {
        return `${coupon.pay_money}抢券`
      }
    }
  },
  created () {
    this.getCouponReceiveList()
  },
  methods: {
    async getCouponReceiveList () {
      const { data } = await getCouponReceiveList()
      this.data = data
    },
    handleReceive (coupon) {
      this.activeCoupon = coupon
      if (+coupon.pay_type === 1) {
        this.showPayCredit = true
        return
      }
      this.receiveCoupon()
    },
    async receiveCoupon () {
      const { order_id: orderId } = await receiveCoupon({
        shops_coupon_id: this.activeCoupon.shops_coupon_id
      })
      // 付费支付
      if (+this.activeCoupon.pay_type === 2) {
        this.orderId = orderId
        this.payAmount = this.activeCoupon.pay_money
        this.showPaySwal = true
        return
      }
      this.receiveSuccess()
    },
    receiveSuccess () {
      const { coupon_type: couponType, miane, pay_type: payType } = this.activeCoupon
      if (+payType === 1) {
        this.showPayCredit = false
        return
      }
      const content = +couponType === 1 ? `用${miane}元` : `享${miane}折`
      this.$toast(`恭喜，抢到了！\n 下单可${content}`)
    },
    // 支付
    surePaySwal (callData) {
      payOrderUp({
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
          if (res.success) {
            if (res.data) {
              this.payOrderInfo = res.data
              if (callData.pay_type == 1) {
                this.showPaySwal = false
                this.wxPayUp()
              } else if (callData.pay_type == 2) {
                this.showPaySwal = false
                this.aliPayUp()
              } else if (callData.pay_type == 4) {
                this.$refs.payblock.sendCode(res)
              }
            }
          }
        })
        .catch(res => {
          if (callData.pay_type == 4) {
            if (callData.idcard) {
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
      const aliPayPlus = api.require('aliPayPlus')
      aliPayPlus.payOrder({ orderInfo: this.payOrderInfo }, (ret, err) => {
        if (ret.code == 9000) {
          // 支付成功
          this.fyResult()
        } else {
          this.cancelPay()
        }
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
          if (ret.status) {
            this.fyResult()
          } else {
            this.cancelPay()
          }
        }
      )
    },
    // 支付成功回调
    fyResult () {
      this.showPaySwal = false
    },
    // 关闭支付选择弹窗
    closePaySwal (data) {
      this.showPaySwal = data === 1
    }
  }
}
</script>

<style lang="less" scoped>
.get-coupon-list {
  padding: 0 20px 30px;
  .shop-name {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
  }
  .shop-img {
    width: 32px;
    height: 30px;
    margin-right: 20px;
  }
}
/deep/ .coupon-item {
  margin-bottom: 30px;
}
.btn-ing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 56px;
  background: #f7f7f7;
  border-radius: 28px;
  border: none;
  font-size: 24px;
  color: #8f8f94;
}
.btn-click {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  height: 56px;
  padding: 0 24px;
  background: #ff6555;
  border-radius: 28px;
  border: none;
  font-size: 24px;
  color: #fff;
  .tf-icon-xingfubi1 {
    margin-right: 10px;
  }
}
.credit-popup {
  height: 330px;
  .credit-title {
    padding: 30px;
    font-size: 32px;
    color: #000;
    text-align: center;
  }
  /deep/ .van-icon-cross {
    top: 30px;
    right: 30px;
    font-size: 34px;
  }
  .credit-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .credit-confirm-btn {
    width: 410px;
    height: 80px;
    margin: 50px 170px 30px;
    background: #ff6555;
    border-radius: 40px;
    border: none;
    font-size: 28px;
    color: #ffffff;
  }
}
</style>
