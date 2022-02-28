<template>
  <van-popup
    v-model="visible"
    closeable
    position="bottom"
    class="pay-popup"
    @close="handleClose"
  >
    <div class="pay-mask">
      <div v-show="step == 1" class="pay-step-item">
        <div class="pay-header">
          <div class="pay-number">￥{{ payMoney }}</div>
        </div>
        <div class="bankcard-list">
          <van-radio-group v-model="selectIndex">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in cardList"
                :key="index"
                class="bankcard-item"
                clickable
                @click="selectIndex = index"
              >
                <template #title
                  ><img class="bankcard-icon" :src="item.bank_ico" />
                  <span class="bankcard-name"
                    >{{ item.bank_name }} ({{
                      item.cardFour ? item.cardFour : item.bank_card
                    }})</span
                  ></template
                >
                <template #right-icon>
                  <van-radio
                    @click.stop="selectBankCard(index)"
                    :name="index"
                    checked-color="#eb5841"
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button class="submit-btn" type="primary" @click="goPay"
          >去付款</van-button
        >
      </div>
      <div v-show="step == 2">
        <div class="pay-header-2">
          <van-icon name="arrow-left" />
          <div class="pay-title">安全验证</div>
        </div>
        <div class="pay-content">
          <div class="validation-tel">
            我们已经发送了验证码到你的手机：
            <div style="text-align:center">{{ userTel }}</div>
          </div>
          <div class="validation-code">
            <div class="code-label">验证码</div>
            <div class="code-input-container">
              <van-field
                v-model.trim="codeVal"
                type="number"
                maxlength="6"
                placeholder="请输入6位验证码"
              >
                <template #button>
                  <div v-if="!isAgain" class="code-time">
                    <van-count-down
                      ref="countDown"
                      :auto-start="false"
                      :time="downTime2"
                      @finish="handleFinish"
                    >
                      <template v-slot="timeData">{{
                        timeData.seconds
                      }}</template> </van-count-down
                    >s
                  </div>
                  <div v-else @click="codeAgain" class="code-time again-send">
                    重新发送
                  </div>
                </template>
              </van-field>
            </div>
          </div>
          <van-button
            class="submit-btn"
            type="primary"
            :disabled="phoneCodeDisabled"
            @click.stop="sureFuPay"
            >确认</van-button
          >
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { fuPay } from '@/api/life.js'
export default {
  name: 'PayPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payMoney: {
      type: Number,
      default: 0
    },
    bankCard: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    createPayOrderApi: Function
  },
  computed: {
    phoneCodeDisabled () {
      return !(this.codeVal && this.codeVal.length == 6)
    }
  },
  data () {
    return {
      visible: this.value,
      tapIndex: 1,
      step: 1, // 1选中支付方式 2选择银行卡支付方式（银行卡待选择） 3选择银行卡
      selectIndex: -1, // 选中的银行卡index
      cardList: [],
      downTime2: 60000,
      isAgain: false,
      codeVal: '', // 验证码
      payData: {},
      idCard: '', // 身份证
      cardFour: '', // 银行卡后四位
      userTel: '' // 手机号脱敏
    }
  },
  methods: {
    setBankCard (data) {
      const { idcard } = data
      this.cardList = [data]
      this.idCard = idcard
      this.selectIndex = 0
      this.step = 1
    },
    goPay () {
      this.step = 2
      this.createOrder()
    },
    async createOrder () {
      const { success, data } = await this.createPayOrderApi()
      if (success) {
        this.payData = data
        this.sendCode()
      }
    },
    sendCode () {
      this.codeVal = ''
      this.downTime2 = 60000
      this.$refs.countDown.reset()
      this.$refs.countDown.start()
    },
    // 再次获取验证码
    codeAgain () {
      this.isAgain = false
      this.createOrder()
    },
    // 富友确认支付
    sureFuPay () {
      if (!this.codeVal) {
        return
      }
      fuPay({
        ...this.payData,
        vercd: this.codeVal
      })
        .then(res => {
          if (res.success) {
            // 成功
            this.$emit('fyResult', res.success)
          }
        })
        .catch(res => {
          if (
            res.message.indexOf('短信') == -1 &&
            res.message.indexOf('验证码') == -1
          ) {
            this.step = 1
          }
        })
    },
    // 倒计时结束
    handleFinish () {
      this.isAgain = true
    },
    handleClose () {
      this.$emit('close')
    }
  },
  watch: {
    visible (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (val !== this.visible) {
        this.visible = val
      }
      if (val) {
        this.setBankCard(this.data)
      }
    }
  },
  filters: {
    formatTime (value) {
      return value < 10 ? `0${value}` : value
    }
  }
}
</script>

<style lang="less" scoped>
.pay-popup {
  border-radius: 10px 10px 0px 0px;
  /deep/ .van-icon-cross {
    font-size: 40px;
  }
}
.pay-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  background: #f7f7f7;
  border-radius: 10px 10px 0px 0px;
  .pay-number {
    font-size: 40px;
    font-weight: bold;
    color: #222222;
  }
}
.bankcard-list {
  .bankcard-item {
    display: flex;
    padding: 0 30px;
    margin-top: 60px;
  }
  .bankcard-icon {
    width: 46px;
    height: 46px;
    margin-right: 30px;
  }
  .bankcard-name {
    font-size: 28px;
    line-height: 1;
    color: #222222;
  }
  /deep/ .van-cell__title {
    display: flex;
    align-items: center;
  }
}
.pay-step-item {
}
.pay-header-2 {
  display: flex;
  padding: 30px 0;
  justify-content: center;
  /deep/ .van-icon-arrow-left {
    position: absolute;
    left: 0;
    font-size: 40px;
  }
  .pay-title {
    font-size: 32px;
    color: #222222;
  }
}
.pay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .validation-tel {
    font-size: 26px;
    color: #8f8f94;
  }
  .validation-code {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    margin-top: 30px;
    .code-label {
      font-size: 28px;
      font-weight: bold;
      color: #222222;
    }
    .code-input-container {
      display: flex;
      flex: 1;
      height: 80px;
      margin-left: 20px;
      border-radius: 40px;
      /deep/ .van-cell {
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 40px;
        background: #f7f7f7;
      }
    }
    /deep/ .van-cell__value {
      display: flex;
      align-items: center;
      .van-field__body {
        width: 100%;
      }
    }
    .code-time {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100px;
    }
  }
}
.submit-btn {
  width: 710px;
  height: 88px;
  margin: 60px 20px 30px;
  border-radius: 44px;
  /deep/ .van-button__text {
    line-height: 1;
  }
}
</style>
