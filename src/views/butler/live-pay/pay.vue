<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="生活缴费"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <van-notice-bar
        class="swiper-nav"
        left-icon="warning"
        mode="link"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
        >还需缴费￥300（本月￥200，往月￥100)</van-notice-bar
      >
      <div class="month-bill">
        <div class="month-text">十一月</div>
        <div class="unpay-number">待缴费￥88.3</div>
        <ul class="pay-list-container">
          <li class="pay-list-item">
            <van-checkbox
              class="pay-checkbox"
              checked-color="#EB5841"
              v-model="checked"
            ></van-checkbox>
            <div class="pay-info">
              <div class="pay-info-left">
                <span class="pay-type-icon tf-icon"></span>
                <span class="pay-title">水费</span>
              </div>
              <div class="pay-info-right">
                <div class="pay-number">￥200</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay-footer">
      <van-checkbox
        class="pay-checkbox"
        checked-color="#EB5841"
        v-model="checked"
        >全选</van-checkbox
      >
      <div>
        <span class="pay-sum">合计：<span class="tf-text-primary">￥100</span></span>
        <van-button class="btn">缴费(1项)</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, NoticeBar, Checkbox, Button } from 'vant'
export default {
  name: 'livePayPay',
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.swiper-nav {
  height: 66px;
  margin: 40px 20px 0;
  border-radius: 10px;
  /deep/ .van-notice-bar__left-icon {
    margin-right: 10px;
  }
  /deep/ .van-notice-bar__content {
    color: #eb5841;
  }
  .notice-swipe {
    height: 66px;
    /deep/ .van-swipe-item {
      line-height: 66px;
    }
  }
  /deep/ .van-icon-arrow {
    font-size: 24px !important;
    margin-right: 10px;
    &::before {
      font-family: tficonfont;
      content: "\e85d";
    }
  }
}
.month-bill {
  padding: 0 30px;
  margin-top: 30px;
  .month-text {
    font-size: 28px;
  }
  .unpay-number {
    font-size: 24px;
    color: #8f8f94;
    margin-top: 6px;
  }
  .pay-list-container {
    width: 100%;
    margin-top: 30px;
    .pay-list-item {
      display: flex;
      .pay-checkbox {
        width: 80px;
        display: flex;
        justify-content: center;
      }
    }
    .pay-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      height: 140px;
      padding: 30px;
      background: #ffffff;
      border-radius: 10px;
      .pay-info-left {
        display: flex;
        align-items: center;
        .pay-type-icon {
          font-size: 66px;
          line-height: 1;
        }
        .pay-title {
          font-size: 30px;
          margin-left: 27px;
        }
      }
      .pay-info-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .pay-number {
          font-size: 34px;
          font-weight: 600;
          color: #eb5841;
        }
      }
    }
    .pay-list-item + .pay-list-item {
      border-top: 1px solid #f0f0f0;
    }
  }
}
.pay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 0 20px 0 30px;
  background: #ffffff;
  .pay-sum {
    font-size: 24px;
    color: #8F8F94;
    .tf-text-primary {
      font-size: 34px;
      margin-right: 30px;
    }
  }
  .btn {
    width: 200px;
    height: 88px;
    background: linear-gradient(-90deg, #eb5841, #f9866b);
    border-radius: 10px;
    color: #fff;
    border: none;
  }
}
/deep/ .pay-checkbox {
  .van-checkbox__icon {
    height: 32px;
    line-height: 32px;
    .van-icon {
      width: 32px;
      height: 32px;
      font-size: 26px;
    }
  }
  .van-checkbox__label {
    font-size: 24px;
    color: #8f8f94;
  }
}
</style>
