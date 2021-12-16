<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="优惠券"
      fixed
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="tf-body-container">
      <template v-if="ableNum">
        <div class="coupon-num">
          可用优惠券<span>（{{ ableNum }}张）</span>
        </div>
        <div class="coupon-list">
          <coupon-item
            v-for="item in ableList"
            :key="item.coupon_id"
            :data="item"
            :status="1"
            :isPenny="true"
            priceKey="coupon_pay"
            discountKey="discount_num"
            couponNameKey="coupon_text"
            @click.native="handleClick(item)"
          >
            <div
              v-if="item.user_coupon_id === user_coupon_id"
              class="is-select-tag"
            ><i class="van-icon van-icon-success"></i></div>
          </coupon-item>
        </div>
      </template>
      <template v-if="unableNum">
        <div class="coupon-num">
          不可用优惠券<span>（{{ unableNum }}张）</span>
        </div>
        <div class="coupon-list">
          <coupon-item
            v-for="item in unableList"
            :key="item.coupon_id"
            :data="item"
            :status="2"
            :isPenny="true"
            priceKey="coupon_pay"
            discountKey="discount_num"
            couponNameKey="coupon_text"
          ></coupon-item>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CouponItem from './components/CouponItem'
import { getSelectCoupon } from '@/api/life'
import eventBus from '@/utils/eventbus'
export default {
  components: {
    CouponItem
  },
  data () {
    return {
      ableList: [],
      ableNum: 0,
      unableList: [],
      unableNum: 0
    }
  },
  created () {
    this.prevPage = this.$route.query.prev_page
    this.user_coupon_id = this.$route.query.user_coupon_id
    this.total()
  },
  methods: {
    /**
     * 计算商品数量/价格
     */
    total: function (e) {
      const key = +this.prevPage === 1 ? 'cart2' : 'cart'
      let cartArr = api.getPrefs({ sync: true, key }) || []
      if (cartArr && cartArr.length > 0) {
        cartArr = JSON.parse(cartArr)
      }
      const cartList = []
      if (cartArr && cartArr.length > 0) {
        for (var j in cartArr) {
          if (cartArr[j].is_checked) {
            cartList.push(cartArr[j])
          }
        }
        this.carts = cartList
      } else {
        return
      }
      this.getData()
    },
    getData () {
      getSelectCoupon({
        user_coupon_id: this.user_coupon_id,
        giftbag: JSON.stringify(this.carts)
      }).then(res => {
        if (res.success) {
          this.ableList = res.data.available
          this.ableNum = res.data.available_num
          this.unableList = res.data.disable
          this.unableNum = res.data.disable_num
        }
      })
    },
    handleClick (data) {
      // 传递一个map，chooseCoupon是key，id是value
      var obj = {
        user_coupon_id: data.user_coupon_id,
        coupon_text: data.coupon_text
      }
      eventBus.$emit('chooseCoupon', JSON.stringify(obj))
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.tf-body-container {
  padding: 0 20px;
}
.coupon-list {
  /deep/ .coupon-item {
    + .coupon-item {
      margin-top: 30px;
    }
  }
}
.coupon-num {
  padding: 40px 0 40px 30px;
  position: relative;
  font-size: 28px;
  font-weight: bold;
  color: #222;
  line-height: 1;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 6px;
    height: 28px;
    background: #ff6555;
    border-radius: 3px;
  }
  span {
    color: #8f8f94;
    font-weight: normal;
    line-height: 1;
  }
}
.is-select-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #ff6555;
  border-radius: 50%;
  .van-icon-success {
    font-size: 24px;
    color: #fff;
  }
}
</style>
