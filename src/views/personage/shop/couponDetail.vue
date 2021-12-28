<template>
  <div class="app-body">
    <div class="body-block">
      <div class="order-bar">
        <van-nav-bar
          title="订单详情"
          fixed
          :border="false"
          placeholder
          left-arrow
          @click-left="$router.go(-1)"
        >
          <template #right>
            <a
              :href="`tel: ${orderInfo.customerServiceHotline}`"
              class="nav-serve"
              ><img src="@/assets/img/icon_23.png"
            /></a>
          </template>
        </van-nav-bar>
      </div>
      <div class="order-session">
        <div class="order-header-bg"></div>
        <div class="order-status-session">
          <div class="order-status-name">已完成</div>
          <div class="order-status-tip">
            感谢您的购买
          </div>
        </div>
        <div class="cont-session" style="padding-bottom: 0;">
          <div class="order-goods-info">
            <div class="order-pic-block">
              <img
                class="img-100"
                mode="aspectFill"
                src="@/assets/personage/shop/coupon.png"
              />
            </div>
            <div class="order-info">
              <div class="order-name-price">
                <div class="order-name p-nowrap">
                  {{ goodsInfo.goods_name }}
                </div>
                <div class="order-price">
                  ￥{{ (goodsInfo.s_price || 0) / 100 }}
                </div>
              </div>
              <div class="order-sku-num">
                1张
              </div>
              <div class="order-action-session">
                <div class="order-action-text">
                  不支持退换<i
                    class="van-icon van-icon-question-o"
                    @click.stop="popoverVisible = true"
                  ></i>
                </div>
                <div class="order-buy-num">x1</div>
              </div>
            </div>
          </div>
          <div
            class="coupon-info"
            :class="{ 'coupon-info--expanded': expanded }"
          >
            <div class="coupon-content" @click="expanded = true">
              <div>券状态：{{ couponInfo.c_status_name }}</div>
              <div>券编号：{{ couponInfo.user_coupon_numb }}</div>
              <template v-if="expanded">
                <div>
                  优惠说明：{{ couponInfo.coupon_explain
                  }}<i
                    v-if="shopInfo.shops_address"
                    class="tf-icon tf-icon-dizhi"
                    @click="goLocation"
                  ></i>
                  <!-- <strong
                    >【美好优选】<i class="tf-icon tf-icon-dizhi"></i
                  ></strong> -->
                </div>
                <div>有效期：{{ couponInfo.g_time }}</div>
                <div>领取时间：{{ couponInfo.ctime }}</div>
                <div>使用须知：</div>
                <div
                  v-html="couponInfo.coupon_rule.replace(/\r\n|\n/g, '<br/>')"
                ></div>
              </template>
            </div>
            <i
              class="van-icon van-icon-arrow"
              :class="{ 'van-icon-arrow--expanded': expanded }"
              @click="expanded = !expanded"
            ></i>
          </div>
          <div class="detail-price-list">
            <div class="detail-price-item">
              <div>商品总价</div>
              <div>￥{{ orderInfo.goods_price_total / 100 }}</div>
            </div>
            <div v-if="+orderInfo.happiness_price" class="detail-price-item">
              <div>幸福币抵扣</div>
              <div>-￥{{ orderInfo.happiness_price / 100 }}</div>
            </div>
          </div>
          <div class="order-total">
            <div>
              共 1 件
            </div>
            <div class="order-price-text">合计:</div>
            <div class="order-total-money">
              ￥{{
                (orderInfo.pay_type == 1
                  ? orderInfo.happiness_price
                  : orderInfo.pay_price) / 100
              }}
            </div>
          </div>
        </div>
        <div class="cont-session order-message">
          <div class="order-message-item">
            订单编号：{{ orderInfo.order_numb }}
            <div class="copy-btn" @click="copy">
              复制
            </div>
          </div>
          <div class="order-message-item">下单时间： {{ orderInfo.ctime }}</div>
          <div class="order-message-item">
            支付方式：{{ orderInfo.payment_type_name }}
          </div>
          <div class="order-message-item">
            支付时间：{{ orderInfo.pay_time }}
          </div>
        </div>
      </div>
    </div>
    <explain-popover v-model="popoverVisible"></explain-popover>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/life.js'
import ExplainPopover from '@/views/personage/shop/components/ExplainPopover'
export default {
  components: {
    ExplainPopover
  },
  data () {
    return {
      popoverVisible: false,
      expanded: false,
      goodsInfo: {},
      orderInfo: {}
    }
  },
  computed: {
    shopInfo () {
      return this.orderInfo.shops_user_coupon_info || {}
    },
    couponInfo () {
      return this.shopInfo.shops_user_coupon_data ? this.shopInfo.shops_user_coupon_data : {}
    }
  },
  created () {
    this.order_id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData () {
      getOrderDetail({
        order_project_id: this.order_id,
        order_type: 3
      }).then(res => {
        if (res.success) {
          this.goodsInfo = res.order_goods_specs_list[0]
          this.orderInfo = res.order_project_info
        }
      })
    },
    goLocation () {
      this.$router.push({
        name: 'shopLocation',
        query: {
          name: this.shopInfo.shops_address,
          address: `${this.shopInfo.shops_address_province}${this.shopInfo.shops_address_city}${this.shopInfo.shops_address_area}${this.shopInfo.shops_address}`,
          lon: this.shopInfo.shops_longitude,
          lat: this.shopInfo.shops_latitude
        }
      })
    },
    copy () {
      var clipBoard = api.require('clipBoard')
      clipBoard.set(
        {
          value: this.orderInfo.order_numb
        },
        function (ret, err) {
          if (ret) {
            this.$toast('复制成功')
          } else {
            alert(JSON.stringify(err))
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.app-body {
  width: 100%;
  background-color: #f2f2f4;
  font-size: 28px;
}
.order-bar .van-nav-bar__right {
  .nav-serve {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 10px 0 20px;
    img {
      width: 44px;
      height: 44px;
    }
  }
}
// 头部
.order-session {
  position: relative;
  padding: 0 20px;
}
.order-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background-image: linear-gradient(to right, #f9866b, #eb5841);
}
.order-status-session {
  padding-top: 70px;
  padding-bottom: 40px;
  position: relative;
  z-index: 6;
  color: #fefefe;
  text-align: center;
  .order-status-name {
    margin-bottom: 30px;
    font-size: 38px;
    font-weight: bold;
    line-height: 1;
  }
  .order-status-tip {
    font-size: 28px;
    line-height: 1;
  }
}

.cont-session {
  width: 710px;
  padding: 40px 30px;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
}
// 订单详情
.order-goods-info {
  display: flex;
  justify-content: space-between;
  min-height: 130px;
  margin-bottom: 40px;
  .order-pic-block {
    width: 130px;
    height: 130px;
    border-radius: 4px;
  }
  .order-info {
    width: 500px;
    div {
      line-height: 1;
    }
    > div + div {
      margin-top: 22px;
    }
  }
  .order-sku-num,
  .order-buy-num,
  .order-action-session {
    color: #8f8f94;
    font-size: 24px;
  }
  .order-buy-num {
    text-align: right;
  }
  .order-name-price,
  .order-action-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .order-action-text {
    display: flex;
    align-items: center;
  }
}

// 券
.coupon-info {
  width: 650px;
  min-height: 120px;
  padding: 30px;
  position: relative;
  background: #f7f7f7;
  border-radius: 10px;
  &--expanded {
    height: auto;
  }
  .coupon-content {
    font-size: 24px;
    color: #8f8f94;
    div {
      line-height: 42px;
    }
    li {
      margin-left: 30px;
      line-height: 42px;
      list-style: disc;
    }
    strong {
      font-weight: bold;
      color: #222;
    }
  }
  .van-icon-arrow {
    position: absolute;
    top: 30px;
    right: 30px;
    &::before {
      transform: rotate(90deg) translateZ(0);
      transition: transform 0.3s;
    }
    &--expanded::before {
      transform: rotate(-90deg);
    }
  }
}

// 订单价格信息
.detail-price-list {
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;
  .detail-price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    font-size: 24px;
    color: #222;
  }
}

// 支付合计
.order-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 88px;
  font-size: 24px;
  color: #8f8f94;
  div {
    line-height: 1;
  }
  .order-price-text {
    margin-left: 20px;
  }
  .order-total-money {
    font-size: 34px;
    font-weight: bold;
    color: #222222;
  }
}

// 订单信息
.order-message {
  margin-top: 30px;
  .order-message-item {
    position: relative;
    font-size: 28px;
    color: #8f8f94;
    line-height: 1;
  }
  .order-message-item + .order-message-item {
    margin-top: 40px;
  }
  .copy-btn {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 58px;
    height: 34px;
    padding: 0 8px;
    line-height: 1;
    border: 1px solid #ffa110;
    font-size: 22px;
    color: #ffa110;
  }
}
.tf-icon-dizhi {
  margin-left: 10px;
  font-weight: bold;
  color: #222;
}
.van-icon-question-o {
  margin-left: 12px;
  font-size: 30px;
  color: #aaaaaa;
}
</style>
