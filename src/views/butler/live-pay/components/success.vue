<template>
  <!-- 支付成功 -->
  <van-overlay
    :show="value"
    duration="0.5"
    z-index="9999"
    class-name="pay-success"
  >
    <span class="tf-icon tf-icon-guanbi1" @click="$emit('confirm')"></span>
    <img class="success-img" src="@/assets/imgs/success.png" alt="" />
    <div class="tf-text-lg">支付成功</div>
    <div class="success-money">
      ￥<span class="success-mony-number">{{ payAmount }}</span>
    </div>
    <div class="success-link" @click="$emit('look')">查看详情</div>
    <van-button class="success-btn" @click="$emit('confirm')">确定</van-button>
  </van-overlay>
</template>

<script>
export default {
  name: 'paySuccess',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payAmount: {
      type: [Number, String],
      default: ''
    }
  }
}
</script>

<style lang="less">
.pay-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .tf-icon-guanbi1 {
    position: absolute;
    top: 80px;
    left: 32px;
    font-size: 50px;
    line-height: 1;
    color: #383838;
  }
  .success-img {
    width: 220px;
    height: 220px;
    margin-top: 258px;
  }
  .tf-text-lg {
    margin-top: 40px;
  }
  .success-money {
    margin-top: 100px;
    font-size: 48px;
    font-weight: 600;
    .success-mony-number {
      font-size: 72px;
    }
  }
  .success-link {
    margin-top: 20px;
    font-size: 24px;
    color: #8f8f94;
  }
  .success-btn {
    width: 420px;
    border-color: #383838;
    border-radius: 10px;
    position: absolute;
    bottom: 80px;
    font-size: 30px;
    color: #000;
  }
}
</style>
