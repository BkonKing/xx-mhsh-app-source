<template>
  <div class="get-coupon-list">
    <coupon-item :data="data"></coupon-item>
    <coupon-item></coupon-item>
    <coupon-item></coupon-item>
    <coupon-item></coupon-item>
  </div>
</template>

<script>
import CouponItem from './CouponItem'
export default {
  components: { CouponItem },
  data () {
    return {
      data: {
        status: 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.get-coupon-list {
  padding: 0 20px 30px;
}
/deep/ .coupon-item {
  + .coupon-item {
    margin-top: 30px;
  }
}
</style>
