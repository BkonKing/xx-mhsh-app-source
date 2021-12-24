<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="优惠券管理"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <img
          class="nav-icon"
          src="@/assets/personage/shop/record.png"
          alt=""
          @click="jumpPage('couponUseRecord')"
        />
        <img
          class="nav-icon"
          src="@/assets/personage/shop/scan.png"
          alt=""
          @click="jumpPage('scanCode')"
        />
      </template>
    </van-nav-bar>
    <van-tabs v-model="current" @change="tabsChange">
      <van-tab title="全部" name="0"></van-tab>
      <van-tab title="领取中" name="1"></van-tab>
      <van-tab title="未发布" name="2"></van-tab>
      <van-tab title="已结束" name="3"></van-tab>
    </van-tabs>
    <coupon-list
      ref="list"
      class="tf-body-container tf-column"
      :status="current"
      :id="userInfo.shops_id"
      :isCoupon="+shopInfo.is_coupon === 1"
    ></coupon-list>
    <div v-if="+shopInfo.is_coupon" class="fixed-btn-palceholder">
      <van-button class="fixed-btn" @click="jumpPage('create')">创建优惠券</van-button>
    </div>
  </div>
</template>

<script>
// /personage/shop/couponManager
import { mapGetters } from 'vuex'
import CouponList from './components/CouponList'
import { getShopInfo } from '@/api/personage/shop'

export default {
  name: 'shopCouponManager',
  components: {
    CouponList
  },
  data () {
    return {
      shopInfo: {},
      current: '0',
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.getShopInfo()
  },
  activated () {
    if (this.scrollTop) {
      const el = this.$refs.list.$el.getElementsByClassName('tf-list-refresh')
      el.length && (el[0].scrollTop = this.scrollTop)
    }
  },
  beforeRouteLeave (to, from, next) {
    const lastPageName = ['shopCouponUseRecord', 'scanCodeIndex']
    const el = document.getElementsByClassName('tf-list-refresh')
    this.scrollTop = (el.length && el[0].scrollTop) || 0
    if (!lastPageName.includes(to.name)) {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  },
  methods: {
    getShopInfo () {
      getShopInfo({
        shops_id: this.userInfo.shops_id
      }).then(({ data }) => {
        this.shopInfo = data
      })
    },
    jumpPage (key) {
      const routerName = {
        create: 'shopCreateCoupon',
        couponUseRecord: 'shopCouponUseRecord',
        scanCode: 'scanCodeIndex'
      }
      this.$router.push({
        name: routerName[key]
      })
    },
    // tab页改变，为最新标签时刷新最新列表
    tabsChange () {
      this.$nextTick(() => {
        this.$refs.list && this.$refs.list.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tf-bg {
  @flex-column();
  background: #f7f7f7;
}
.nav-icon {
  width: 44px;
  height: 44px;
}
.nav-icon + .nav-icon {
  margin-left: 40px;
}
.tf-body-container {
  /deep/ .van-tabs__wrap {
    height: 88px;
  }
}
/deep/ .tf-list-refresh {
  padding: 30px 20px;
}
// tabs
/deep/ .van-tabs {
  .van-tab__text {
    color: #000000cc;
  }
  .van-tab--active .van-tab__text {
    font-size: 32px;
    font-weight: 600;
    color: #000000;
  }
  .van-tabs__line {
    width: 56px !important;
    height: 6px;
    left: -2px;
    background: #ff6555;
    border-radius: 3px;
  }
  .van-tabs__content {
    flex: 1;
    max-height: calc(100% - 98px);
    .van-tab__pane {
      height: 100%;
    }
  }
}

// 无数据
/deep/ .no-data-box {
  margin-top: 327px;
  .no-data-img {
    width: 204px;
    height: 240px;
  }
  .no-data-text {
    margin-top: 40px;
    font-size: 26px;
    color: #8f8f94;
    line-height: 1;
  }
}

.fixed-btn-palceholder {
  width: 100%;
  height: 136px;
  .fixed-btn {
    width: 710px;
    height: 80px;
    margin: 28px 20px;
    background: #FF5240;
    border: none;
    border-radius: 44px;
    /deep/ .van-button__text {
      color: #fff;
      line-height: 1;
    }
  }
}
</style>
