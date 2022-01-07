<template>
  <div class="card-box" @click="goCouponDetail(data)">
    <div class="card-header">
      <div>
        <span>订单编号：</span>
        <span>{{ data.order_numb }}</span>
      </div>
      <div>{{ data.order_status_name }}</div>
    </div>
    <div class="card-content">
      <img class="card-img" src="@/assets/personage/shop/coupon.png" alt="" />
      <div class="coupon-info">
        <div class="card-name">
          {{ data.order_goods_specs_list[0].goods_name }}
        </div>
        <div class="card-text">1张</div>
        <div class="card-text tf-row-vertical-center">
          <span>不支持退货</span
          ><i
            class="van-icon van-icon-question-o"
            @click.stop="popoverVisible = true"
          ></i>
        </div>
      </div>
      <div class="card-content-right">
        <div class="card-money">
          ￥{{
            data.pay_type == 1
              ? data.happiness_price / 100
              : data.pay_price / 100
          }}
        </div>
        <div class="card-text">×1</div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-text">共 {{ data.goods_num }} 件</div>
      <div class="card-text">
        合计：<span class="card-user-money"
          >￥{{
            data.pay_type == 1
              ? data.happiness_price / 100
              : data.pay_price / 100
          }}</span
        >
      </div>
    </div>
    <explain-popover v-model="popoverVisible"></explain-popover>
  </div>
</template>

<script>
import ExplainPopover from '@/views/personage/shop/components/ExplainPopover'
export default {
  name: 'CouponOrderCard',
  components: {
    ExplainPopover
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      popoverVisible: false
    }
  },
  methods: {
    goCouponDetail ({ id }) {
      this.$router.push({
        name: 'shopCouponDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-box {
  width: 710px;
  min-height: 372px;
  padding: 0 30px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    border-bottom: 1px solid #f0f0f0;
    div,
    span {
      font-size: 24px;
      line-height: 1;
      color: #222222;
    }
  }
  .card-content {
    display: flex;
    padding: 30px 0 40px;
    .card-img {
      width: 130px;
      height: 130px;
      margin-right: 22px;
    }
    .coupon-info {
      flex: 1;
      margin-right: 20px;
      .card-name {
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 1;
        + .card-text {
          margin-bottom: 24px;
        }
      }
      .van-icon-question-o {
        margin-left: 12px;
        font-size: 30px;
        color: #aaaaaa;
      }
    }
    .card-content-right {
      min-width: 150px;
      text-align: right;
      .card-money {
        margin-bottom: 72px;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
      }
    }
  }
  .card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 88px;
    border-top: 1px solid #f0f0f0;
    .card-text + .card-text {
      margin-left: 30px;
    }
    .card-user-money {
      font-size: 34px;
      font-weight: bold;
      color: #222;
    }
  }
  .card-text {
    font-size: 24px;
    color: #8f8f94;
    line-height: 1;
  }
}
</style>
