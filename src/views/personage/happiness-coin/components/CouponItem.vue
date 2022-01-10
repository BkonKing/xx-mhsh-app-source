<template>
  <div class="coupon-item">
    <div
      class="coupon-card"
      :class="[{ 'coupon-card--expanded': expanded }]"
      @click="expanded = !expanded"
    >
      <div class="coupon-money">
        <template v-if="+data.coupon_type === 1">
          <span class="coupon-money-icon">￥</span
          ><span class="coupon-money-number">{{ data.miane }}</span>
        </template>
        <template v-else>
          <span class="coupon-money-number">{{ data.miane }}</span
          ><span class="coupon-money-icon">折</span>
        </template>
      </div>
      <div class="coupon-info">
        <div class="tf-row-space-between">
          <div>
            <div class="coupon-info-2">{{ data.denomination }}</div>
            <div class="coupon-info-3">
              {{ data.term_of_validity }}
            </div>
          </div>
          <div class="left-slot">
            <slot></slot>
          </div>
        </div>
        <div class="coupon-footer">
          <div class="coupon-footer-text">{{ data.goods_type_name }}</div>
          <i
            class="van-icon van-icon-arrow"
            :class="{ 'van-icon-arrow--expanded': expanded }"
          ></i>
        </div>
      </div>
    </div>
    <div class="coupon-panel" :class="{ 'coupon-panel--expanded': expanded }">
      <div class="coupon-content" @click.stop="expanded = true">
        <template>
          <div @click="goIntroduce">
            <span>优惠说明：{{ data.new_goods_type_name1 }}</span
            ><span v-if="data.new_shops_name">
              | 线下店铺<strong
                >【{{ data.new_shops_name }}】<van-icon name="arrow"
              /></strong>
            </span>
          </div>
          <div class="tf-row-vertical-center" v-if="shopsAddress">
            <span class="tf-flex-item van-ellipsis"
              >店铺地址：{{ shopsAddress }}</span
            >
            <i class="tf-icon tf-icon-dizhi" @click="goLocation"></i>
          </div>
          <div v-if="data.new_shops_phone" class="tf-row-vertical-center">
            <span class="tf-flex-item"
              >店铺电话：{{ data.new_shops_phone }}</span
            >
            <i class="van-icon van-icon-phone" @click="makePhoneCall"></i>
          </div>
          <div>有效期：{{ data.term_of_validity }}</div>
          <div>使用须知：</div>
          <ul>
            <li>一个订单只能使用一张优惠券;</li>
            <li>可与其他活动优惠同时享受（提示不可用券的除外）;</li>
            <li>订单申请退款，优惠券不退回;</li>
          </ul>
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
    }
  },
  data () {
    return {
      dateShow: false,
      expanded: false
    }
  },
  computed: {
    shopsAddress () {
      return `${this.data.shops_address_province}${this.data.shops_address_city}${this.data.shops_address_area}${this.data.shops_address}`
    }
  },
  methods: {
    dateSure (obj) {
      this.formData.task_stime = obj.startTime
      this.formData.task_etime = obj.endTime
      if (!obj.startTime && !obj.endTime) {
        this.completeTime = ''
      } else {
        if (obj.startTime && obj.endTime) {
          this.completeTime = obj.startTime + ' ~ ' + obj.endTime
        } else {
          this.completeTime = '截止 ' + obj.endTime
        }
      }
    },
    makePhoneCall () {
      api.call({
        type: 'tel_prompt',
        number: this.data.new_shops_phone
      })
    },
    goIntroduce () {
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
  height: 223px;
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
    &-icon {
      padding-top: 6px;
      font-size: 28px;
      font-weight: bold;
      color: #ff6555;
    }
    &-number {
      font-size: 48px;
      font-weight: bold;
      color: #ff6555;
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
</style>
