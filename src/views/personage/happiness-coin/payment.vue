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
      <!-- <userInfo :avatar="info.avatar" :name="`${nickname}(${info.realname})`" :time="info.mobile"></userInfo> -->
      <userInfo :avatar="info.avatar" :name="info.realname  " :time="info.mobile"></userInfo>
      <div class="payment-box">
        <div class="payment-box__text">{{type | payText}}</div>
        <div class="payment-box__money">
          <span>￥</span>
          <van-field
            class="payment-box__money-number"
            readonly
            clickable
            :value="value"
            @touchstart.native.stop="showKeyboard = true"
          />
          <span v-if="value" class="tf-icon tf-icon-close-circle-fill" @click="value = ''"></span>
        </div>
        <van-field v-model="remarks" placeholder="添加备注(10字以内)" />
      </div>
      <van-button v-if="type === '1'" class="tf-mt-lg" type="primary" size="large" @click="pay">确认支付</van-button>
    </div>
    <tf-dialog v-model="payCodeShow" title="请输入密码">
      <van-password-input
        :value="paypassword"
        :gutter="7"
        :focused="showPasswordboard"
        @focus="showPasswordboard = true"
      />
    </tf-dialog>
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      key="number"
      theme="custom"
      :extra-key="['.']"
      close-button-text="支付"
      @close="pay"
      @blur="showKeyboard = false"
    />
    <van-number-keyboard
      :show="showPasswordboard"
      key="password"
      z-index="9999"
      theme="custom"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="showPasswordboard = false"
      @close="payEnter"
    />
  </div>
</template>

<script>
import {
  NavBar,
  NumberKeyboard,
  Button,
  Field,
  Popup,
  PasswordInput,
  Toast
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfDialog from '@/components/tf-dialog/index'
import {
  paymentStatus,
  collectStatus,
  paymentCredits,
  collectCredits
} from '@/api/personage'
export default {
  components: {
    [NavBar.name]: NavBar,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [PasswordInput.name]: PasswordInput,
    userInfo,
    tfDialog
  },
  data () {
    return {
      type: '1', // 1：付款 2: 收款
      title: '',
      code: '',
      info: {},
      value: '',
      remarks: '',
      showKeyboard: false,
      showPasswordboard: false,
      payCodeShow: false,
      paypassword: ''
    }
  },
  created () {
    this.type = this.$route.query.type
    this.code = this.$route.query.value
    this.title = this.type === '1' ? '付款' : '收款'
    this.type === '1' ? this.paymentStatus() : this.collectStatus()
  },
  methods: {
    // 付款方接收付款码状态
    paymentStatus () {
      paymentStatus({
        code_id: this.info
      }).then(res => {})
    },
    // 收款方接收收款码状态
    collectStatus () {
      collectStatus({
        code_id: this.info
      }).then(res => {})
    },
    pay () {
      if (!this.value) {
        Toast('请输入金额')
        return
      }
      if (this.type === '1') {
        this.payCodeShow = true
        this.showPasswordboard = true
      }
    },
    payEnter () {
      if (this.paypassword.length < 6) {
        Toast('请输入完整密码')
        return
      }
      if (this.type === '1') {
        this.paymentCredits()
      }
    },
    // 付款码支付
    paymentCredits () {
      const params = {
        credits: this.value,
        remarks: this.remarks,
        code_id: this.code,
        paypassword: this.paypassword
      }
      paymentCredits(params).then(res => {
        Toast.success('付款成功')
        this.paymentStatus()
      })
    },
    onInput (key) {
      this.paypassword = (this.paypassword + key).slice(0, 6)
    },
    onDelete () {
      this.paypassword = this.paypassword.slice(0, this.paypassword.length - 1)
    }
  },
  filters: {
    payText (value) {
      const textList = {
        1: '付款',
        2: '收款',
        3: '向您收款'
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
/deep/ .tf-dialog__wrapper-box {
  width: 700px;
  .van-password-input__security {
    margin: 30px 0;
    height: 80px;
  }
}
</style>
