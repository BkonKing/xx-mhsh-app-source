<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="title"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-time-circle"></span>
      </template>
    </van-nav-bar>
    <div class="tf-main-container">
      <!-- <userInfo :avatar="info.avatar" :name="`${nickname}(${info.realname})`" :time="info.mobile"></userInfo> -->
      <userInfo
        :avatar="info.avatar"
        :name="info.realname"
        :time="info.mobile"
      ></userInfo>
      <div class="payment-box">
        <div class="payment-box__text">{{ type | payText }}</div>
        <div class="payment-box__money">
          <span class="tf-icon tf-icon-xingfubi1"></span>
          <van-field
            class="payment-box__money-number"
            readonly
            clickable
            :value="value"
            @touchstart.native.stop="touchstart"
          />
          <span
            v-if="value && type !== '3'"
            class="tf-icon tf-icon-close-circle-fill"
            @click="value = ''"
          ></span>
        </div>
        <van-field
          v-model="remarks"
          :disabled="type === '3'"
          maxlength="10"
          placeholder="添加备注(10字以内)"
        />
      </div>
      <van-button class="tf-mt-lg" type="primary" size="large" @click="pay">{{
        type !== "2" ? "确认支付" : "确认"
      }}</van-button>
    </div>
    <tf-dialog
      v-model="payCodeShow"
      title="请输入密码"
      @closed="paypassword = ''"
      top="30%"
      getContainer
    >
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
      safe-area-inset-bottom
      get-container="body"
      key="number"
      theme="custom"
      :extra-key="['']"
      :close-button-text="type !== '2' ? '支付' : '确定'"
      @close="pay"
      @blur="showKeyboard = false"
    />
    <van-number-keyboard
      :show="showPasswordboard"
      safe-area-inset-bottom
      get-container="body"
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
  Toast,
  Dialog
} from 'vant'
import userInfo from '@/components/user-info/index.vue'
import tfDialog from '@/components/tf-dialog/index'
import { paymentCredits, collectCredits, skCredits } from '@/api/personage'
import { mapGetters } from 'vuex'
export default {
  name: 'happinessCoinPayment',
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      type: '1', // 1：付款 2: 收款 3:确认付款
      title: '',
      codeId: '',
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
    const {
      type,
      value,
      avatar,
      realname,
      mobile,
      credits,
      remarks
    } = this.$route.query
    this.type = type
    this.codeId = value
    this.info = { avatar, realname, mobile }
    this.title = this.type !== '2' ? '付款' : '收款'
    if (this.type === '3') {
      this.value = credits
      this.remarks = remarks
    }
  },
  activated () {
    this.paypassword = ''
  },
  methods: {
    // 完成
    pay () {
      if (parseInt(this.value) <= 0) {
        Toast('请输入金额')
        return
      }
      if (!this.userInfo.is_setpaypassword) {
        this.setPaymentPassword('您还未设置支付密码！')
        return
      }
      if (this.type !== '2') {
        this.payCodeShow = true
        this.showPasswordboard = true
      } else {
        this.skCredits()
      }
    },
    // 输入完密码
    payEnter () {
      if (this.paypassword.length < 6) {
        Toast('请输入完整密码')
        return
      }
      if (this.type === '1') {
        this.collectCredits()
      } else if (this.type === '3') {
        this.paymentCredits()
      }
    },
    // 付款码支付
    paymentCredits () {
      const params = {
        credits: this.value,
        code_id: this.codeId,
        remarks: this.remarks,
        paypassword: this.paypassword
      }
      paymentCredits(params)
        .then(res => {
          Dialog.alert({
            title: '付款成功'
          }).then(() => {
            this.$router.go(-1)
          })
        })
        .catch(({ message }) => {
          this.setPaymentPassword(message)
        })
    },
    // 收款码支付
    collectCredits () {
      const params = {
        credits: this.value,
        remarks: this.remarks,
        code_id: this.codeId,
        paypassword: this.paypassword
      }
      collectCredits(params)
        .then(res => {
          Dialog.alert({
            title: '付款成功'
          }).then(() => {
            this.$router.go(-1)
          })
        })
        .catch(({ message }) => {
          this.setPaymentPassword(message)
        })
    },
    // 收款方提交收款金额
    skCredits () {
      skCredits({
        credits: this.value,
        remarks: this.remarks,
        code_id: this.codeId
      }).then(res => {
        Dialog.alert({
          title: '请等待对方确认付款'
        }).then(() => {
          this.$router.go(-1)
        })
      })
    },
    // 设置支付密码
    setPaymentPassword (message) {
      if (message === '您还未设置支付密码！') {
        Dialog.confirm({
          title: '您还未设置支付密码，是否前往设置'
        })
          .then(() => {
            this.payCodeShow = false
            this.$nextTick(() => {
              this.$router.push(
                '/pages/personage/information/payment-code?status=0'
              )
            })
          })
          .catch(() => {
            this.showPasswordboard = true
          })
      } else {
        Toast(message)
      }
    },
    touchstart () {
      if (this.type !== '3') {
        this.showKeyboard = true
      }
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
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'informationPaymentCode') {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.tf-main-container {
  padding: 30px 20px 0;
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
    .tf-icon-xingfubi1 {
      color: @red-dark;
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
/deep/ .van-key {
  height: 120px;
  font-size: 36px;
}
/deep/ .van-key--large {
  height: 100%;
}
/deep/ .van-popup--center {
  top: 35%;
}
</style>
