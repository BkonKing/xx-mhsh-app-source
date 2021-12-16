<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="优惠券"
      :fixed="true"
      :border="false"
      left-arrow
      placeholder
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span
          class="tf-icon tf-icon-shijian"
          @click="goCouponPurchaseRecords"
        ></span>
      </template>
    </van-nav-bar>
    <van-tabs v-model="current" @change="tabsChange">
      <van-tab title="未使用" name="1"></van-tab>
      <van-tab title="已使用" name="2"></van-tab>
      <van-tab title="已过期" name="3"></van-tab>
    </van-tabs>
    <coupon-list
      ref="list"
      class="tf-body-container tf-column"
      :status="current"
      :id="userInfo.shops_id"
    ></coupon-list>
  </div>
</template>

<script>
// /personage/shop/couponManager
import { mapGetters } from 'vuex'
import CouponList from './components/CouponList'

export default {
  components: {
    CouponList
  },
  data () {
    return {
      current: '1'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {},
  methods: {
    // tab页改变，为最新标签时刷新最新列表
    tabsChange () {
      this.$nextTick(() => {
        this.$refs.list && this.$refs.list.reload()
      })
    },
    goCouponPurchaseRecords () {
      this.$router.push({
        name: 'shopCouponPurchaseRecord'
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
.tf-body-container {
  /deep/ .van-tabs__wrap {
    height: 88px;
    .van-tabs__line {
      width: 56px !important;
    }
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
    width: 40px !important;
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
</style>
