<template>
  <div class="coupon-item">
    <div
      class="coupon-card"
      :class="[
        { 'coupon-card-un': +status !== 1 },
        { 'coupon-card--expanded': expanded }
      ]"
    >
      <div class="coupon-money">
        <template v-if="+data.type === 1">
          <span class="coupon-money-icon">￥</span
          ><span class="coupon-money-number">{{
            isPenny ? +data[priceKey] / 100 : data[priceKey]
          }}</span>
        </template>
        <template v-else>
          <span class="coupon-money-number">{{ data[discountKey] }}</span
          ><span class="coupon-money-icon">折</span>
        </template>
        <div v-if="data.i_img" class="coupon-icon-bg">
          <img :src="data.i_img" />
        </div>
      </div>
      <div class="coupon-info">
        <div class="tf-row-space-between">
          <div>
            <div class="coupon-info-2">
              <span v-if="+data.coupon_type === 1" class="shop-tag"
                >线下店铺</span
              >{{ data[couponNameKey] }}
            </div>
            <div class="coupon-info-3">
              {{ data.term_of_validity || data.g_time2 }}
            </div>
          </div>
          <div class="left-slot">
            <slot></slot>
          </div>
        </div>
        <div class="coupon-footer" @click.stop="expanded = !expanded">
          <div class="coupon-footer-text">
            {{
              +data.coupon_type && data.coupon_explain2
                ? data.coupon_explain2
                : data.coupon_explain
            }}
          </div>
          <i
            class="van-icon van-icon-arrow"
            :class="{ 'van-icon-arrow--expanded': expanded }"
          ></i>
        </div>
      </div>
    </div>
    <div class="coupon-panel" :class="{ 'coupon-panel--expanded': expanded }">
      <div class="coupon-content" @click.stop="expanded = true">
        <div>券编号：{{ data.coupon_code }}</div>
        <template>
          <div>
            <span v-if="data.new_shops_id"
              >优惠说明：{{ data.new_coupon_explain2 }} |
              {{ data.new_coupon_explain1 }}</span
            ><span v-if="data.new_shops_name" @click="goShopIntroduce">
              | 线下店铺<strong
                >【{{ data.new_shops_name }}】<van-icon name="arrow"
              /></strong>
            </span>
            <span v-else>优惠说明：{{ data.coupon_explain }}</span>
          </div>
          <div class="tf-row-vertical-center" v-if="shopsAddress">
            <span class="tf-flex-item van-ellipsis"
              >店铺地址：{{ shopsAddress }}</span
            ><i class="tf-icon tf-icon-dizhi" @click="goLocation"></i>
          </div>
          <div v-if="data.new_shops_phone" class="tf-row-vertical-center">
            <span class="tf-flex-item"
              >店铺电话：{{ data.new_shops_phone }}</span
            ><i class="van-icon van-icon-phone" @click="makePhoneCall"></i>
          </div>
          <div>有效期：{{ data.g_time2 }}</div>
          <div>领取时间：{{ data.ctime }}</div>
          <div>使用须知：</div>
          <div v-html="data.coupon_rule.replace(/\r\n|\n/g, '<br/>')"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: [Number, String],
      default: ''
    },
    priceKey: {
      type: String,
      default: 'reduce_price'
    },
    discountKey: {
      type: String,
      default: 'discount_num'
    },
    couponNameKey: {
      type: String,
      default: 'coupon_name'
    },
    isPenny: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    shopsAddress () {
      return `${this.data.shops_address_province}${this.data.shops_address_city}${this.data.shops_address_area}${this.data.shops_address}`
    }
  },
  filters: {
    statusText (status) {
      const text = {
        1: '未使用',
        2: '已使用',
        3: '已过期'
      }
      return text[status]
    }
  },
  methods: {
    makePhoneCall () {
      api.call({
        type: 'tel_prompt',
        number: this.data.new_shops_phone
      })
    },
    goShopIntroduce () {
      this.$router.push({
        name: 'shopIntroduce',
        query: {
          shopId: this.data.new_shops_id
        }
      })
    },
    goLocation () {
      this.$router.push({
        name: 'shopLocation',
        query: {
          name: this.data.shops_address,
          address: this.shopsAddress,
          lon: this.data.shops_longitude,
          lat: this.data.shops_latitude
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
.coupon-card {
  display: flex;
  align-items: center;
  width: 710px;
  min-height: 223px;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  &--expanded {
    border-radius: 10px 10px 0px 0px;
  }
  &::after {
    content: "";
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    background: linear-gradient(225deg, #ff6555 0%, #ffffff 50%);
    opacity: 0.1;
    border-radius: 0px 10px 0px 0px;
  }
  .coupon-money {
    display: flex;
    justify-content: center;
    min-width: 170px;
    position: relative;
    font-size: 40px;
    font-weight: bold;
    color: #222222;
    .coupon-icon-bg {
      position: absolute;
      width: 120px;
      height: 56px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-icon {
      padding-top: 6px;
      font-size: 28px;
      font-weight: 600;
      color: #ff6555;
      z-index: 1;
    }
    &-number {
      font-size: 48px;
      font-weight: 600;
      color: #ff6555;
      z-index: 1;
    }
    // span + span {
    //   margin-left: 6px;
    // }
  }
  .coupon-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 50px 24px 0 12px;
    .left-slot {
      position: relative;
      z-index: 1;
    }
    &-2 {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 28px;
      font-weight: bold;
      color: #222222;
      list-style: 1;
    }
    &-3 {
      display: flex;
      font-size: 24px;
      color: #8f8f94;
    }
  }
  .coupon-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
    padding: 14px 0;
    margin-top: 40px;
    border-top: 1px dashed #dddddd;
    z-index: 1;
    .coupon-footer-text {
      flex: 1;
      width: 0;
      font-size: 24px;
      color: #8f8f94;
      line-height: 36px;
      @text-ellipsis();
    }
  }
  .van-icon-arrow {
    margin-right: 10px;
    font-size: 24px;
    &::before {
      transform: rotate(90deg) translateZ(0);
      transition: transform 0.3s;
    }
    &--expanded::before {
      transform: rotate(-90deg);
    }
  }
  .coupon-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 132px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 0px 10px 0px;
    font-size: 24px;
    color: #ffffff;
  }
  .coupon-tag-ing {
    background: linear-gradient(90deg, #febf00 0%, #ffdc72 100%);
  }
  .coupon-tag-un {
    background: linear-gradient(90deg, #ff6555 0%, #ff8d81 100%);
  }
  .coupon-tag-end {
    background: linear-gradient(90deg, #c5ccd0 0%, #e6eaed 100%);
  }
}
.coupon-card-un {
  &::after {
    width: 0;
  }
  .coupon-money-icon,
  .coupon-money-number {
    color: #8f8f94;
  }
}
.coupon-panel {
  width: 100%;
  height: 0;
  position: relative;
  background: #fff;
  background-image: linear-gradient(180deg, #efefef 0%, #ffffff 100%);
  background-size: 100% 40px;
  background-repeat: no-repeat;
  border-radius: 0px 0px 10px 10px;
  transition: height 0.3s linear;
  overflow: hidden;
  &--expanded {
    height: auto;
  }
  .tf-icon-dizhi {
    padding: 16px 20px;
    font-weight: bold;
    color: #222;
  }
  .coupon-content {
    padding: 30px;
    font-size: 24px;
    color: #8f8f94;
    .tf-row-vertical-center {
      width: 100%;
      height: 56px;
      padding-left: 26px;
      margin-top: 20px;
      margin-bottom: 20px;
      background: #f7f7f7;
      border-radius: 28px;
      span {
        line-height: initial;
      }
    }
    div {
      line-height: 42px;
    }
    li {
      margin-left: 30px;
      line-height: 42px;
      list-style: disc;
    }
    strong {
      display: inline-flex;
      font-weight: bold;
      color: #222;
      .van-icon-arrow {
        font-weight: bold;
        color: #000;
      }
    }
    .van-icon-phone {
      padding: 16px 20px;
      font-weight: bold;
      color: #222;
      transform: rotateY(180deg);
    }
  }
}
.shop-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  margin-right: 10px;
  background: #ff65551a;
  border-radius: 4px;
  font-size: 24px;
  color: #ff6555;
  line-height: 1;
}
.coupon-card-un .shop-tag {
  background: #f7f7f7;
  color: #8f8f94;
}
</style>
