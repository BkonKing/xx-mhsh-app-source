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
    ></coupon-list>
  </div>
</template>

<script>
// /personage/shop/couponManager
import { mapGetters } from 'vuex'
import CouponList from './components/CouponList'

export default {
  name: 'shopCouponManager',
  components: {
    CouponList
  },
  data () {
    return {
      current: '0',
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {},
  activated () {
    if (this.scrollTop) {
      document
        // .getElementById(`taskList${this.current}`)
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  beforeRouteEnter (to, from, next) {
    const current = +to.query.publish || 0
    next(vm => {
      if (current && current !== vm.current) {
        vm.scrollTop = 0
        vm.current = parseInt(current)
        vm.$router.replace({ name: 'PersonageTaskIndex' })
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const el = document
      // .getElementById(`taskList${this.current}`)
      .getElementsByClassName('tf-list-refresh')
    this.scrollTop = (el.length && el[0].scrollTop) || 0
    if (to.name === 'storeIndex') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  },
  methods: {
    jumpPage (key) {
      const routerName = {
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
</style>
