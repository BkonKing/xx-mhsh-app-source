<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="购买优惠券"
      placeholder
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="goBack"
    />
    <div class="tf-body-container" id="buy-coupon-list">
      <refreshList
        class="refresh-box"
        :list.sync="orderList"
        :load="getOrderList"
      >
        <template v-slot="{ item }">
          <coupon-order-card :data="item"></coupon-order-card>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import CouponOrderCard from './components/CouponOrderCard'
import { getOrderList } from '@/api/life'

export default {
  name: 'noticeIndex',
  components: {
    CouponOrderCard,
    refreshList
  },
  data () {
    return {
      orderList: [],
      scrollTop: 0
    }
  },
  activated () {
    if (this.scrollTop) {
      document
        .getElementById('buy-coupon-list')
        .getElementsByClassName(
          'tf-list-refresh'
        )[0].scrollTop = this.scrollTop
    }
  },
  methods: {
    getOrderList ({ pages }) {
      return getOrderList({
        page: pages,
        order_type: 3
      }).then(({ data }) => {
        return {
          data: data.order_project_list
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'butler') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    } else {
      const el = document
        .getElementById('buy-coupon-list')
        .getElementsByClassName('tf-list-refresh')
      this.scrollTop = (el[0] && el[0].scrollTop) || 0
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 30px 20px;
  .refresh-box {
    width: 710px;
    padding: 0;
  }
}
</style>
