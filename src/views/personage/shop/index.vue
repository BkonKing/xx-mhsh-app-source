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
        <img
          src="@/assets/personage/shop/scan.png"
          class="scan-img"
          @click="jumpPage('scanCode')"
        />
      </template>
    </van-nav-bar>
    <div class="tf-body-container">
      <div class="shop-time">
        <template v-if="infoData.business_hours"
          >营业时间 {{ infoData.business_hours }}</template
        >
      </div>
      <div class="shop-header">
        <div class="shop-header-item">
          <div class="shop-header-view">
            {{ infoData.jt_lqz_num }}
          </div>
          <div class="shop-header-info">领取中优惠券</div>
          <van-button
            v-if="haveCreate"
            class="shop-header-button"
            @click="jumpPage('create')"
            >创建</van-button
          >
          <img
            class="shop-header-image"
            src="@/assets/personage/shop/point-bg.png"
          />
        </div>
        <div class="shop-header-item">
          <div class="shop-header-VerticalLine" />
          <div class="shop-header-view">
            {{ infoData.credits }}
          </div>
          <div class="shop-header-info">幸福币</div>
          <!-- <van-button class="shop-header-button">提现</van-button> -->
          <img
            class="shop-header-image"
            src="@/assets/personage/shop/point-bg.png"
          />
        </div>
      </div>
      <div class="shop-tool">
        <div class="shop-tool-title">常用工具</div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item @click="jumpPage('couponManger')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-1.png"
              alt=""
            />
            <div class="shop-tool-text">优惠券</div>
          </van-grid-item>
          <van-grid-item @click="jumpPage('couponUseRecord')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-2.png"
              alt=""
            />
            <div class="shop-tool-text">券使用</div>
          </van-grid-item>
          <van-grid-item @click="jumpPage('credits')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-3.png"
              alt=""
            />
            <div class="shop-tool-text">幸福币</div>
          </van-grid-item>
          <van-grid-item @click="jumpPage('creditsRecord')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-4.png"
              alt=""
            />
            <div class="shop-tool-text">币明细</div>
          </van-grid-item>
          <van-grid-item @click="jumpPage('shopInformation')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-5.png"
              alt=""
            />
            <div class="shop-tool-text">店铺资料</div>
          </van-grid-item>
          <van-grid-item @click="jumpPage('scanCode')">
            <img
              class="shop-tool-icon"
              src="@/assets/personage/shop/tool-6.png"
              alt=""
            />
            <div class="shop-tool-text">扫一扫</div>
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
import { mapGetters } from 'vuex'
import StatisticsInfo from './components/StatisticsInfo'
import { getShopInfo } from '@/api/personage/shop'

export default {
  name: 'shopIndex',
  components: { StatisticsInfo },
  data () {
    return {
      infoData: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    title () {
      return this.infoData.shops_name
    },
    haveCreate () {
      return +this.infoData.is_coupon
    },
    haveCashOut () {
      return +this.infoData.is_cashout
    },
    info () {
      return [
        {
          num: this.infoData.jt_hx_num,
          yNum: this.infoData.zt_hx_num,
          title: '核销优惠券',
          border: true
        },
        {
          num: this.infoData.jt_lq_num,
          yNum: this.infoData.zt_lq_num,
          title: '领取优惠券',
          border: true
        },
        {
          num: this.infoData.jt_lqz_num,
          yNum: this.infoData.zt_lqz_num,
          title: '领取中优惠券',
          border: false
        },
        {
          num: this.infoData.jthd_credits,
          yNum: this.infoData.zthd_credits,
          title: '获得幸福币',
          border: true
        },
        {
          num: this.infoData.jtsy_credits,
          yNum: this.infoData.ztsy_credits,
          title: '使用幸福币',
          border: true
        },
        {
          num: this.infoData.credits,
          yNum: this.infoData.zt_credits,
          title: '幸福币',
          border: false
        }
      ]
    }
  },
  created () {
    this.getShopInfo()
  },
  methods: {
    getShopInfo () {
      getShopInfo({
        shops_id: 7
      }).then(({ data }) => {
        this.infoData = data
      })
    },
    jumpPage (key) {
      const routerName = {
        create: 'shopCreateCoupon',
        couponManger: 'shopCouponManager',
        couponUseRecord: 'shopCouponUseRecord',
        credits: 'happinessCoinIndex',
        creditsRecord: 'happinessCoinRecord',
        shopInformation: 'shopInformation',
        scanCode: 'scanCodeIndex'
      }
      this.$router.push({
        name: routerName[key],
        query: {
          shopId: this.infoData.shops_id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1;
}
.scan-img {
  width: 44px;
  height: 44px;
}
.shop-time {
  position: absolute;
  width: 100%;
  height: 174px;
  padding-top: 10px;
  background: #fff;
  font-size: 24px;
  color: #8f8f94;
  text-align: center;
  line-height: 1;
}
.shop-header {
  position: relative;
  display: flex;
  width: 710px;
  min-height: 220px;
  padding-top: 62px;
  padding-bottom: 62px;
  margin-top: 62px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #febf00;
  z-index: 2;
  .shop-header-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 355px;
    .shop-header-view {
      min-height: 56px;
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
    margin-bottom: 35px;
    font-size: 24px;
    color: #222222;
  }
  &-icon {
    width: 56px;
    height: 56px;
  }
  &-text {
    padding-bottom: 6px;
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
