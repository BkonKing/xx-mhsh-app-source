<template>
  <div class="tf-body">
    <van-nav-bar
      title="提现"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goBack"
    />
    <div class="tf-body-container">
      <div class="form-card" style="padding-top: 0;padding-bottom: 0;">
        <div class="cell-item" @click="goBankCard">
          <div class="item-left">到账银行卡</div>
          <div class="item-cont p-30">
            <div v-if="formData.bank_id">
              <div class="bank-name">
                {{ formData.bank_name }}({{ formData.realname }})
              </div>
              <div class="bank-card">{{ formData.bank_card }}</div>
            </div>
            <template v-else>{{bankCards.length ? '请选择银行卡' : '请先绑定银行卡'}}</template>
          </div>
          <div v-if="bankCards.length !== 1" class="item-arrow">
            <i class="van-icon van-icon-arrow"></i>
          </div>
        </div>
        <div class="cell-item" style="border-bottom: 0;">
          <div class="item-left">
            提现账户
          </div>
          <div class="item-cont">
            幸福币（{{ settingData.user_credits }}币）
          </div>
        </div>
      </div>
      <div class="form-card">
        <div class="form-title">
          提现幸福币<span class="tf-icon tf-icon-xingfubi1"></span>
        </div>
        <div
          class="form-field"
          :class="{ 'form-field-placeholder': !formData.credits }"
          @click="showKeyboard = true"
        >
          {{ formData.credits || creditScope }}
        </div>
        <div v-if="false" class="form-alert red-text">
          <van-icon name="warning" color="#ff6555" />单笔可提现{{
            creditScope
          }}幸福币
        </div>
        <div v-if="+serviceFee" class="form-service">
          <div>
            <span class="grey-text">提现人民币</span
            ><span class="red-text large-text">￥{{ rmb }}</span
            ><span class="red-text">（实际到账￥{{ actualMoney }}）</span>
          </div>
          <div>
            <span class="grey-text">服务费</span
            ><span>{{ serviceFee * 100 }}%</span
            ><span>（本次收取￥{{ charge }}）</span>
          </div>
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
      v-model="formData.credits"
      :show="showKeyboard"
      safe-area-inset-bottom
      get-container="body"
      key="number"
      theme="custom"
      :extra-key="['']"
      close-button-text="提现"
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
      :extra-key="['']"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="showPasswordBoard = false"
      @close="payEnter"
    />
    <van-popup
      v-model="successVisible"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="success-header">
        <van-icon class="close-icon" name="cross" @click="goBack" />
        <div class="success-title">提现</div>
      </div>
      <div class="success-content">
        <van-icon class="success-icon" name="checked" />
        <div class="success-text-1">提交成功！</div>
        <div class="success-text-2">请耐心等待工作人员处理</div>
        <van-button class="success-confirm-btn" @click="goBack"
          >确定</van-button
        >
      </div>
    </van-popup>
    <tf-select-popup
      v-model="selectBankVisible"
      title="到账银行卡"
      :selected="formData.bank_id"
      :data="bankCards"
      @confirm="setBank"
    >
      <template v-slot:label="slotProps">
        <div class="tf-flex-column">
          <div class="bank-name">{{ slotProps.record.bank_name }}</div>
          <div class="bank-card">{{ slotProps.record.full_bank_card }}</div>
        </div>
      </template>
    </tf-select-popup>
  </div>
</template>

<script>
import NP from 'number-precision'
import { mapGetters } from 'vuex'
import TfSelectPopup from '@/components/tf-select-popup'
import { getBankList } from '@/api/personage'
import { getAgentSetting, applyCash } from '@/api/personage/shop'

export default {
  name: 'shopWithdraw',
  components: {
    TfSelectPopup
  },
  data () {
    return {
      shopId: '',
      formData: {
        bank_id: '',
        bank_name: '',
        bank_card: '',
        credits: ''
      },
      bankCards: [],
      realname: '',
      settingData: {},
      payCodeShow: false,
      payPassword: '',
      showKeyboard: false,
      showPasswordBoard: false,
      successVisible: false,
      selectBankVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    creditScope () {
      return `${this.settingData.min_credits || 0}~${this.settingData
        .max_credits || 0}`
    },
    serviceFee () {
      return +this.settingData.service_fee
    },
    rmb () {
      return this.formData.credits / 10
    },
    charge () {
      if (!this.rmb) {
        return 0
      }
      const num = NP.times(this.rmb, this.serviceFee)
      return num.toFixed(2)
    },
    actualMoney () {
      return NP.minus(this.rmb, this.charge)
    }
  },
  created () {
    this.shopId = this.$route.query.shopId
    this.getBankList()
    this.getAgentSetting()
  },
  activated () {
    this.getBankList()
  },
  beforeRouteLeave (to, from, next) {
    const names = ['shopBankCard']
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  },
  methods: {
    async getBankList () {
      const { data, realname } = await getBankList()
      this.bankCards = data || []
      this.realname = realname
      if (data && data.length > 0) {
        this.setBank(data[0])
      }
    },
    async getAgentSetting () {
      const { data } = await getAgentSetting()
      this.settingData = data
    },
    setBank (data) {
      this.formData.bank_id = data.id
      this.formData.realname = this.realname
      this.formData.bank_name = data.bank_name
      this.formData.bank_card = data.full_bank_card
    },
    goBankCard () {
      if (this.bankCards.length === 0) {
        this.$router.push({
          name: 'shopBankCard'
        })
      } else if (this.bankCards.length > 1) {
        this.selectBankVisible = true
      }
    },
    handlePay () {
      const credits = parseInt(this.formData.credits)
      if (credits <= 0) {
        this.$toast('请输入提现幸福币')
        this.$nextTick(() => {
          this.showKeyboard = true
        })
        return
      }
      if (
        !(
          credits >= this.settingData.min_credits &&
          credits <= this.settingData.max_credits
        )
      ) {
        this.$toast('请输入区间幸福币')
        this.$nextTick(() => {
          this.showKeyboard = true
        })
        return
      }
      if (!this.userInfo.is_setpaypassword) {
        this.setPaymentPassword()
        this.$nextTick(() => {
          this.showKeyboard = true
        })
        return
      }
      this.payPassword = ''
      this.payCodeShow = true
      this.showPasswordBoard = true
    },
    // 输入完密码
    async payEnter () {
      if (this.payPassword.length < 6) {
        this.$toast('请输入完整密码')
      } else {
        const { success } = await applyCash({
          paypassword: this.payPassword,
          ...this.formData
        }).catch(({ code }) => {
          if (+code === 206) {
            this.$toast.clear()
            this.wrongPassword()
          }
        })
        if (success) {
          this.successVisible = true
        }
      }
    },
    // 设置支付密码
    setPaymentPassword () {
      this.$dialog
        .confirm({
          className: 'v2-dialog',
          title: '未设置支付密码',
          confirmButtonText: '去设置',
          cancelButtonText: '取消'
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
    // 密码错误
    wrongPassword () {
      this.payCodeShow = false
      this.$dialog
        .confirm({
          className: 'v2-dialog',
          title: '支付密码错误，请重试',
          confirmButtonText: '重试',
          cancelButtonText: '忘记密码'
        })
        .then(() => {
          this.payCodeShow = true
          this.payPassword = ''
          this.showPasswordBoard = true
        })
        .catch(() => {
          this.$router.push({
            name: 'informationForgetPaymentCode',
            query: {
              type: 1
            }
          })
        })
    },
    alertAttestation () {
      this.$dialog
        .confirm({
          className: 'v2-dialog',
          title: '完成商家认证后才能申请提现',
          message:
            '若是认证处于审核中，请您耐心等待审核处理。审核未通过可进行修改再次提交审核。',
          confirmButtonText: '去认证',
          cancelButtonText: '知道了'
        })
        .then(() => {
          this.$router.push({
            name: 'shopInformation',
            query: {
              shopId: this.shopId,
              type: 1
            }
          })
        })
        .catch(() => {
          this.goBack()
        })
    },
    onInput (key) {
      this.payPassword = (this.payPassword + key).slice(0, 6)
    },
    onDelete () {
      this.payPassword = this.payPassword.slice(0, this.payPassword.length - 1)
    },
    goBack () {
      this.$router.go(-1)
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
.bank-name {
  margin-top: -2px;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  color: #222222;
}
.bank-card {
  font-size: 24px;
  color: #8f8f94;
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
.grey-text {
  display: inline-block;
  width: 160px;
  font-size: 24px;
  color: #8f8f94;
}
.red-text {
  color: #ff6555;
}
.large-text {
  font-size: 32px;
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
  .van-key:not(.van-key--blue) {
    font-size: 36px;
    font-weight: bold;
    color: #222222;
  }
}
/deep/ .van-key__wrapper {
  padding: 12px;
}
.pay-code-popup {
  top: 35%;
  border-radius: 10px;
}
.success-header {
  display: flex;
  align-items: center;
  position: relative;
  height: 88px;
  .close-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 40px;
  }
  .success-title {
    max-width: 60%;
    margin: 0 auto;
    color: #222;
    font-size: 34px;
    text-align: center;
  }
}
.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 80px;
  .success-icon {
    font-size: 200px;
    color: #55b862;
  }
  .success-text-1 {
    margin-top: 40px;
    font-size: 40px;
    font-weight: bold;
  }
  .success-text-2 {
    margin-top: 30px;
    font-size: 28px;
  }
  .success-confirm-btn {
    width: 590px;
    height: 88px;
    margin-top: 100px;
    background: #ff6555;
    border: none;
    border-radius: 44px !important;
    color: #fff;
  }
}
</style>

<style lang="less">
.v2-dialog {
  .van-dialog__footer {
    .van-dialog__cancel {
      height: 88px;
      background: #f7f7f7;
      border-color: #f7f7f7;
      border-radius: 10px;
    }
    .van-dialog__confirm {
      height: 88px;
      border-radius: 10px;
    }
  }
}
</style>
