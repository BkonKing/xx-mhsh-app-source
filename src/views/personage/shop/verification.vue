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
            <div class="coupon-number"><span>￥</span>10</div>
            <div>
              <div class="coupon-text">满100减10</div>
              <div class="coupon-text">全场商品</div>
            </div>
          </div>
          <div class="coupon-info-footer">
            2021.11.01 00:00 ~ 2021.11.01 00:00
          </div>
        </div>
        <div class="coupon-rows">
          <div class="coupon-row">
            <div class="coupon-label">所属店铺：</div>
            <div class="coupon-value">所属店铺</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">券编号：</div>
            <div class="coupon-value">所属店铺</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">领取时间：</div>
            <div class="coupon-value">所属店铺</div>
          </div>
          <div class="coupon-row">
            <div class="coupon-label">领取人：</div>
            <div class="coupon-value">所属店铺</div>
          </div>
        </div>
      </div>
      <van-button
        class="dialog-btn"
        :class="{ 'dialog-btn-grey': !isCanUse }"
        @click="confirm"
        >{{btnText}}</van-button
      >
    </div>
  </div>
</template>

<script>
// /personage/shop/verification
import { confirmServer, serverClose } from '@/api/butler'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      info: {},
      code_id: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isCanUse () {
      return [3, 4].includes(+this.info.code_type)
    },
    btnText () {
      const status = {
        1: '优惠券不属于本店铺',
        2: '优惠券已过期',
        3: '优惠券已使用',
        4: '优惠券未到使用时间'
      }
      return this.isCanUse ? '核销优惠券' : status[1]
    }
  },
  created () {
    const { info, code_id: codeId } = this.$route.query
    this.info = JSON.parse(info)
    this.codeId = codeId
    this.codeId = this.info.code_id
  },
  methods: {
    confirm () {
      if (this.isCanUse) {
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
  margin-top: 30px;
  .coupon-label {
    width: 150px;
    font-size: 26px;
    color: #8f8f94;
  }
  .coupon-value {
    font-size: 26px;
    color: #222222;
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
