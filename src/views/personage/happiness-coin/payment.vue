<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <userInfo :avatar="avatar" :name="`${nickname}(${realname})`" :time="mobile"></userInfo>
      <div class="payment-box">
        <div class="payment-box__text">{{status | payText}}</div>
        <div class="payment-box__money">
          <span>￥</span>
          <van-field
            class="payment-box__money-number"
            readonly
            clickable
            :value="value"
            @touchstart.native.stop="showKeyboard = true"
          />
          <span v-if="value" class="tf-icon tf-icon-close-circle-fill"></span>
        </div>
        <van-field v-model="text" placeholder="添加备注(10字以内)" />
      </div>
      <van-button class="tf-mt-lg" type="primary" size="large">确认支付</van-button>
    </div>
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      theme="custom"
       :extra-key="['.']"
      close-button-text="支付"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { NavBar, NumberKeyboard, Button, Field } from 'vant'
import userInfo from '@/components/user-info/index.vue'
export default {
  components: {
    [NavBar.name]: NavBar,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    [Field.name]: Field,
    userInfo
  },
  data () {
    return {
      title: '',
      status: 1,
      value: '',
      text: '',
      showKeyboard: false
    }
  },
  methods: {},
  filters: {
    payText (value) {
      const textList = {
        1: '收款',
        2: '向您收款',
        3: '付款'
      }
      return textList[value]
    }
  }
}
</script>

<style lang='less' scoped>
.tf-main-container {
  padding: 118px 20px 0;
}
.payment-box {
  background: #fff;
  border-radius: 10px;
  padding: 30px 30px 20px;
  margin-top: 30px;
  &__text {
    font-size: 28px;
    margin-bottom: 20px;
  }
  &__money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    span {
      font-size: 52px;
    }
    &-number {
      font-size: 72px;
    }
    .tf-icon-close-circle-fill {
      font-size: 44px;
      color: #aaaaaa;
    }
  }
}
</style>
