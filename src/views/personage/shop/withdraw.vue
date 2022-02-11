<template>
  <div class="tf-body">
    <van-nav-bar
      title="提现"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="tf-body-container">
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item" @click="goBankCard">
          <div class="item-left">到账银行卡</div>
          <div class="item-cont p-30">
            {{ formData.project_name || "请先绑定银行卡" }}
          </div>
          <div class="item-arrow">
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
        <div class="cell-item" style="border-bottom: 0;">
          <div class="item-left">
            提现账户
          </div>
          <div class="item-cont">
            123123
          </div>
        </div>
      </div>
      <div class="form-card">
        <div class="form-title">
          提现幸福币<span class="tf-icon tf-icon-xingfubi1"></span>
        </div>
        <div
          class="form-field"
          :class="{ 'form-field-placeholder': !creditNumber }"
          @click="showKeyboard = true"
        >
          {{ creditNumber || "100~10000" }}
        </div>
        <div v-if="false" class="form-alert red-text">
          <van-icon name="warning" color="#ff6555" />单笔可提现100~10000幸福币
        </div>
        <div class="form-service">
          <div>
            <span class="tf-mr-lg">提现人民币</span
            ><span class="red-text">￥1000</span
            ><span class="red-text">（实际到账￥950）</span>
          </div>
          <div><span class="tf-mr-lg">服务费</span><span>5%</span></div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="payCodeShow"
      safe-area-inset-bottom
      get-container="body"
      class="pay-code-popup"
      :close-on-click-overlay="false"
      @click-overlay="payPassword = ''"
    >
      <div class="tf-dialog">
        <div class="tf-dialog-header">
          <div class="tf-dialog-header-title">请输入支付密码</div>
          <span
            class="tf-icon tf-icon-guanbi"
            @click="payCodeShow = false"
          ></span>
        </div>
        <div class="tf-dialog-content">
          <van-password-input
            :value="payPassword"
            :gutter="7"
            :focused="showPasswordBoard"
            @focus="showPasswordBoard = true"
          />
        </div>
      </div>
    </van-popup>
    <van-number-keyboard
      v-model="creditNumber"
      :show="showKeyboard"
      safe-area-inset-bottom
      get-container="body"
      key="number"
      theme="custom"
      :extra-key="['']"
      :close-button-text="type !== '2' ? '提现' : '确定'"
      @close="handlePay"
      @blur="showKeyboard = false"
    />
    <van-number-keyboard
      :show="showPasswordBoard"
      safe-area-inset-bottom
      get-container="body"
      key="password"
      z-index="9999"
      theme="custom"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="showPasswordBoard = false"
      @close="payEnter"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'shopWithdraw',
  data () {
    return {
      formData: {},
      payCodeShow: false,
      payPassword: '',
      showKeyboard: false,
      showPasswordBoard: false,
      type: '1',
      creditNumber: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
  },
  methods: {
    goBankCard () {
      this.$router.push({
        name: 'shopBankCard'
      })
    },
    handlePay () {
      if (parseInt(this.value) <= 0) {
        this.$toast('请输入提现幸福币')
        return
      }
      if (!this.userInfo.is_setpaypassword) {
        this.setPaymentPassword()
        return
      }
      if (this.type !== '2') {
        this.payCodeShow = true
        this.showPasswordBoard = true
      } else {
        this.skCredits()
      }
    },
    // 设置支付密码
    setPaymentPassword () {
      this.$dialog
        .confirm({
          title: '您还未设置支付密码！'
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
          this.showPasswordBoard = true
        })
    },
    // 输入完密码
    payEnter () {
      if (this.payPassword.length < 6) {
        this.$toast('请输入完整密码')
        return
      }
      if (this.type === '1') {
        this.collectCredits()
      } else if (this.type === '3') {
        this.paymentCredits()
      }
    },
    onInput (key) {
      this.payPassword = (this.payPassword + key).slice(0, 6)
    },
    onDelete () {
      this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1)
    }
  }
}
</script>

<style src="./style/form.less" lang="less" scoped></style>

<style lang="less" scoped>
.tf-body {
  background: linear-gradient(0deg, #ffffff 0%, #f7f7f7 100%);
}
/deep/ .van-nav-bar {
  background: #f7f7f7;
}
.form-title {
  font-size: 28px;
  color: #222222;
  .tf-icon-xingfubi1 {
    margin-left: 10px;
    color: #febf00;
  }
}
.form-field {
  padding: 20px 0;
  margin-top: 20px;
  border-bottom: 1px solid #eeeeee;
  line-height: 1;
  font-size: 56px;
  font-weight: bold;
  color: #222222;
  &.form-field-placeholder {
    color: #ddd;
  }
}
.form-service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 650px;
  min-height: 82px;
  padding: 30px;
  margin-top: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  font-size: 24px;
  color: #222222;
  .tf-mr-lg {
    margin-right: 40px;
  }
  div + div {
    margin-top: 30px;
  }
}
.form-alert {
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  line-height: 1;
  font-size: 24px;
  color: #ff6555;
  /deep/ .van-icon-warning {
    margin-right: 10px;
  }
}
.red-text {
  color: #ff6555;
}
.tf-dialog {
  width: 560px;
  height: 314px;
  background: #ffffff;
  border-radius: 10px;
  .tf-dialog-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 106px;
    background: #f7f7f7;
    .tf-dialog-header-title {
      font-size: 28px;
      font-weight: bold;
      color: #333333;
    }
    .tf-icon-guanbi {
      position: absolute;
      top: 30px;
      right: 30px;
      line-height: 1;
      font-size: 30px;
    }
  }
  .tf-dialog-content {
    padding: 60px 10px;
    border-radius: 10px;
    /deep/ .van-password-input__item {
      border-radius: 10px;
      i {
        background: #f2f2f4;
        &::before {
          content: "*";
          font-size: 32px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
}
/deep/ .van-number-keyboard__body {
  padding: 30px 18px;
}
/deep/ .van-key__wrapper {
  padding: 12px;
}
.pay-code-popup {
  top: 35%;
  border-radius: 10px;
}
</style>
