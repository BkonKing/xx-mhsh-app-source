<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-saoyisao" @click="goSetting"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="shop-time">营业时间 9:00-21:00</div>
      <div class="shop-header">
        <div class="shop-header-item">
          <div class="shop-header-view">
            8
          </div>
          <div class="shop-header-info">领取中优惠券</div>
          <van-button class="shop-header-button" @click="goCreateCoupon">创建</van-button>
          <img
            class="shop-header-image"
            src="@/assets/personage/shop/point-bg.png"
          />
        </div>
        <div class="shop-header-item">
          <div class="shop-header-VerticalLine" />
          <div class="shop-header-view">
            10100
          </div>
          <div class="shop-header-info">幸福币</div>
          <van-button class="shop-header-button">提现</van-button>
          <img
            class="shop-header-image"
            src="@/assets/personage/shop/point-bg.png"
          />
        </div>
      </div>
      <div class="shop-tool">
        <div class="shop-tool-title">常用工具</div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item @click="goShopCouponManager">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-1.png"
              alt=""
            />
            <div class="shop-tool-text">优惠券</div>
          </van-grid-item>
          <van-grid-item @click="goShopInfo">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-5.png"
              alt=""
            />
            <div class="shop-tool-text">店铺资料</div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="statistics-box">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item, index) in info" :key="index">
            <statistics-info
              :title="item.title"
              :num="item.num"
              :y-num="item.yNum"
              :border="item.border"
            ></statistics-info>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsInfo from './components/StatisticsInfo'
export default {
  name: 'shopIndex',
  components: { StatisticsInfo },
  data () {
    return {}
  },
  computed: {
    title () {
      return '店铺店铺名称'
    },
    info () {
      return [
        {
          num: '1',
          yNum: '1',
          title: '核销优惠券',
          border: true
        },
        {
          num: '1',
          yNum: '1',
          title: '领取优惠券',
          border: true
        },
        {
          num: '1',
          yNum: '1',
          title: '领取中优惠券',
          border: false
        },
        {
          num: '1',
          yNum: '1',
          title: '获得幸福币',
          border: true
        },
        {
          num: '1',
          yNum: '1',
          title: '使用幸福币',
          border: true
        },
        {
          num: '1',
          yNum: '1',
          title: '幸福币',
          border: false
        }
      ]
    }
  },
  methods: {
    goCreateCoupon () {
      this.$router.push({
        name: 'shopCreateCoupon'
      })
    },
    goShopCouponManager () {
      this.$router.push({
        name: 'shopCouponManager'
      })
    },
    goShopInfo () {
      this.$router.push({
        name: 'shopInformation'
      })
    },
    goSetting () {}
  }
}
</script>

<style lang="less" scoped>
.shop-time {
  position: absolute;
  width: 100%;
  height: 172px;
  background: #fff;
  font-size: 24px;
  color: #8f8f94;
  text-align: center;
}
.shop-header {
  position: relative;
  display: flex;
  align-items: center;
  width: 710px;
  height: 265px;
  margin-top: 62px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #febf00;
  z-index: 2;
  .shop-header-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 355px;
    height: 265px;
    .shop-header-view {
      font-size: 56px;
      font-weight: bold;
      color: #ffffff;
    }
    .shop-header-button {
      width: 120px;
      height: 48px;
      margin-top: 30px;
      border-radius: 24px;
      border: none;
      background-color: #ff6555;
      font-size: 24px;
      color: #ffffff;
    }
    .shop-header-info {
      margin-top: 30px;
      font-size: 24px;
      color: #ffffff;
    }
    .shop-header-image {
      position: absolute;
      top: 10px;
      width: 134px;
      height: 134px;
      z-index: 2;
    }
  }
  .shop-header-VerticalLine {
    position: absolute;
    top: 88px;
    left: 355px;
    width: 1px;
    height: 44px;
    z-index: 2;
    background-color: #ffffff;
  }
}

.shop-tool {
  width: 710px;
  padding: 30px 20px;
  margin-top: 30px;
  margin-left: 20px;
  background: #ffffff;
  border-radius: 10px;
  &-title {
    font-size: 24px;
    color: #222222;
  }
  &-icon {
    width: 56px;
    height: 56px;
  }
  &-text {
    margin-top: 20px;
    font-size: 24px;
    line-height: 1;
    color: #222222;
  }
}
.statistics-box {
  width: 710px;
  padding: 30px 20px;
  margin-top: 30px;
  margin-left: 20px;
  background: #ffffff;
  border-radius: 10px;
}
</style>
