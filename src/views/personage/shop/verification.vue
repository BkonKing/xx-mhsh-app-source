<template>
  <div class="shade">
    <div class="coupon-confirm-box">
      <div class="dialog-header">
        <div class="dialog-title">优惠券信息</div>
        <span class="tf-icon tf-icon-guanbi1" @click="$router.go(-1)"></span>
      </div>
      <div class="coupon-container">
        <div class="coupon-info-box">
          <div class="coupon-content">
            <div class="coupon-number">
              <template v-if="infoData.coupon_type == 1"
                ><span>￥</span>{{ infoData.denomination }}</template
              >
              <template v-else>{{ infoData.denomination }}<span>折</span></template>
            </div>
            <div>
              <div class="coupon-text">{{ infoData.coupon_name }}</div>
              <div class="coupon-text">{{ infoData.coupon_explain }}</div>
            </div>
          </div>
          <div class="coupon-info-footer">
            {{ infoData.g_time2 }}
          </div>
        </div>
        <div class="coupon-rows">
          <div class="coupon-row">
            <div class="coupon-label">所属店铺：</div>
            <div class="coupon-value">{{ infoData.shops_name }}</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">券编号：</div>
            <div class="coupon-value">{{ infoData.user_coupon_numb }}</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">领取时间：</div>
            <div class="coupon-value">{{ infoData.ptime }}</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">领取人：</div>
            <div class="coupon-value">{{ infoData.user_mobile }}</div>
          </div>
        </div>
      </div>
      <van-button
        v-preventReClick
        class="dialog-btn"
        :class="{ 'dialog-btn-grey': !isCanUse }"
        @click="confirm"
        >{{ btnText }}</van-button
      >
    </div>
  </div>
</template>

<script>
// /personage/shop/verification
import { mapGetters } from 'vuex'
import { getCouponScan, verificationCoupon } from '@/api/personage/shop'
export default {
  data () {
    return {
      infoData: {},
      codeInfo: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isCanUse () {
      return +this.infoData.is_ok
    },
    btnText () {
      // const status = {
      //   1: '优惠券不属于本店铺',
      //   2: '优惠券已过期',
      //   3: '优惠券已使用',
      //   4: '优惠券未到使用时间'
      // }
      return this.isCanUse ? '核销优惠券' : this.infoData.error_text
    }
  },
  created () {
    this.codeInfo = this.$route.query.codeInfo
    this.getCouponScan()
  },
  methods: {
    async getCouponScan () {
      const { data } = await getCouponScan({
        code_info: this.codeInfo
      })
      this.infoData = data
    },
    confirm () {
      if (this.isCanUse) {
        this.verificationCoupon()
      }
    },
    async verificationCoupon () {
      const { success } = await verificationCoupon({
        shops_user_coupon_id: this.infoData.shops_user_coupon_id
      })
      if (success) {
        this.$toast('核销成功')
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      } else {
        this.$toast('核销失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1;
}
.shade {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #1b1b1b99;
}

.coupon-confirm-box {
  @flex-column();
  align-items: center;
  width: 560px;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
}

.dialog-header {
  width: 100%;
  position: relative;
  .dialog-title {
    font-size: 28px;
    color: #000000;
    text-align: center;
  }
  .tf-icon-guanbi1 {
    position: absolute;
    top: -110px;
    right: -30px;
    font-size: 50px;
    color: #fff;
  }
}

.coupon-container {
  width: 100%;
  position: relative;
  margin-top: 40px;
  .coupon-info-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #ff6555 0%, #ff8d81 100%);
    border-radius: 10px;
    .coupon-content {
      display: flex;
      align-items: center;
      flex: 1;
      .coupon-number {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 170px;
        font-size: 40px;
        color: #ffffff;
        span {
          margin-bottom: 2px;
          font-size: 24px;
        }
      }
      .coupon-text {
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        + .coupon-text {
          margin-top: 20px;
        }
      }
    }
    .coupon-info-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 56px;
      background: #ffffff33;
      border-radius: 0px 0px 10px 10px;
      font-size: 24px;
      color: #ffffff;
    }
  }
}

.coupon-rows {
  padding: 10px 0 20px;
}
.coupon-row {
  display: flex;
  margin-top: 26px;
  .coupon-label {
    width: 150px;
    font-size: 26px;
    color: #8f8f94;
    line-height: 34px;
  }
  .coupon-value {
    flex: 1;
    font-size: 26px;
    color: #222222;
    line-height: 34px;
  }
}

.dialog-btn {
  width: 100%;
  height: 80px;
  margin-top: 30px;
  background: #ff6555;
  border-radius: 10px;
  border: none;
  font-size: 26px;
  color: #fff;
}

.dialog-btn-grey {
  background: #f7f7f7;
  color: #bbbbbb;
}
</style>
