<template>
  <div>
    <div v-show="showSwal" class="public-mask pay-mask bottom-fixed">
      <div class="public-dclose" @click="calcel(0)"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="public-header">付款</div>
      <div :class="[downTime ? '' : 'no-time','settlement-price']">
        <div>￥{{payMoney}}</div>
        <div v-if="downTime">(<van-count-down ref="countDown" :auto-start="false" :time="downTime" @finish="finish">
              <template v-slot="timeData">{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
              </template>
            </van-count-down>)</div>
      </div>
      <div class="common-list">
        <div class="common-item-first common-item" @click.stop="selectSwal(0)">
          <div class="common-item-left">
            <div bindtap="checkboxOne" :class="[tapIndex == 0 ? 'cur' : '','cart-checkbox flex-center']">
              <div class="checkbox-session"></div>
            </div><img src="@/assets/img/icon_21.png" />微信支付
          </div>
        </div>
        <div class="common-item" @click.stop="selectSwal(1)">
          <div class="common-item-left">
            <div bindtap="checkboxOne" :class="[tapIndex == 1 ? 'cur' : '','cart-checkbox flex-center']">
              <div class="checkbox-session"></div>
            </div><img src="@/assets/img/icon_22.png" />支付宝支付
          </div>
        </div>
      </div>
      <div class="submit-btn color-fff" @click.stop="sureSwal()">去付款</div>
    </div>
    <div v-show="showSwal" class="mask-bg" @click="calcel(0)"></div>
  </div>
</template>

<script>
import { CountDown, Toast } from 'vant'
export default {
  components: {
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
  },
  name: 'reason-swal',
  props: {
    showSwal: {
      type: Boolean,
      default: false
    },
    payMoney: {
      type: Number,
      default: 0
    },
    downTime: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      tapIndex: 1
    }
  },
  watch: {
    showSwal(val, oldVal) {
      if(val == true){
        this.$nextTick(() => {
          this.start();
        })
      }
    },
  },
  methods: {
    calcel(val) {
      this.$emit('closeSwal',val);
    },
    sureSwal(index) {
      this.$emit('sureSwal',this.tapIndex);
    },
    selectSwal(index) {
      this.tapIndex = index;
    },
    //倒计时开始
    start() {
      this.$refs.countDown.start();
    },
    //倒计时暂停
    pause() {
      this.$refs.countDown.pause();
    },
    //倒计时结束
    finish() {
      console.log(this.endTime-this.newTime);
      Toast('倒计时结束');
    },
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.settlement-price {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 147px;
}
.no-time.settlement-price {
  height: 90px;
}
.settlement-price > div:nth-child(1) {
  font-size: 58px;
  color: #222222;
  font-weight: bold;
  line-height: 84px;
}
.settlement-price > div:nth-child(2) {
  color: #8f8f94;
  line-height: 44px;
}
 .settlement-price .van-count-down {
  display: inline;
  color: #8f8f94;
  font-size: 30px;
}
.pay-mask {
  font-size: 28px;
}
.pay-mask .common-list {
  padding: 0;
}
.pay-mask .common-item {
  height: 120px;
  border-top: 0;
  border-bottom: 1px solid #f0f0f0;
}
.pay-mask .common-item-left img {
  width: 58px;
  height: 58px;
  margin-right: 20px;
}
.pay-mask .submit-btn {
  margin-top: 60px;
}
.cart-checkbox {
  width: 33px;
  padding-left: 1px;
  margin-right: 40px;
  flex-shrink: 0;
  height: 100%;
}
.checkbox-session,.all-checkbox-session {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #96a8bb;
}
.cart-checkbox.cur .checkbox-session,.all-checkbox.cur .all-checkbox-session {
  border: none;
  background: url('../../../assets/img/tick2.png') center center/100% 100%;
}
</style>
