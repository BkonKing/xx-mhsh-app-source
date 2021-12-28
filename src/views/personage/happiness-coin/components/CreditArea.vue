<template>
  <div class="sale-area">
    <div
      class="commodity-box"
      v-for="(item, i) in data"
      :key="i"
      @click="goCoinCommodity(item)"
    >
      <img class="commodity-image" :src="item.thumb" />
      <div class="commodity-content">
        <div class="commodity-name van-ellipsis">{{ item.goods_name }}</div>
        <div class="commodity-price">
          <div class="commodity-current-price">
            <span>￥</span>{{ item.s_price }}
          </div>
          <div class="commodity-original-price">￥{{ item.y_price }}</div>
        </div>
        <div class="commodity-coin">
          <span class="tf-icon tf-icon-xingfubi1"></span
          >{{ item.credits }}<span class="commodity-coin-text">可兑换</span>
        </div>
      </div>
    </div>
    <!-- <div class="sale-box">
      <div class="purchase-history" @click="goBuyRecord">购买记录</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CreditArea',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 购买详情
    goBuyRecord () {
      this.$router.push({ name: 'happinessCoinBuyRecord' })
    },
    // 幸福币专区商品详情
    goCoinCommodity (item) {
      this.$router.push(`/store/goods-detail?id=${item.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.sale-area {
  @flex();
  padding-left: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.commodity-box {
  width: 345px;
  margin-right: 20px;
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 10px;
}
.commodity-image {
  width: 345px;
  height: 345px;
  background: #f4f4f4;
  border-radius: 10px;
}
.commodity-content {
  padding: 30px 20px 26px;
}
.commodity-name {
  width: 100%;
  font-size: 28px;
  line-height: 1;
}
.commodity-price {
  display: flex;
  align-items: center;
  margin-top: 30px;
  .commodity-current-price {
    margin-right: 10px;
    font-size: 32px;
    font-weight: bold;
    color: #222;
    line-height: 1;
    span {
      font-size: 24px;
    }
  }
  .commodity-original-price {
    font-size: 26px;
    color: #8f8f94;
    line-height: 1;
    text-decoration: line-through;
  }
}
.commodity-coin {
  margin-top: 18px;
  font-size: 32px;
  font-weight: bold;
  color: #FF6555;
  line-height: 1;
  .tf-icon {
    margin-right: 4px;
  }
  &-text {
    margin-left: 6px;
  }
  span {
    font-size: 24px;
  }
}
.sale-box {
  margin-top: 80px;
  @relative();
}
.purchase-history {
  position: absolute;
  top: 0;
  right: 30px;
  font-size: 24px;
  color: @gray-7;
  line-height: 44px;
}
</style>
