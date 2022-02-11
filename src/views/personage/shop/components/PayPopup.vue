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
                      ref="countDown2"
                      :auto-start="false"
                      :time="downTime2"
                      @finish="handleFinish(2)"
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
import { getMyCard, fuPay } from '@/api/life.js'
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
    otherPayShow: {
      type: Boolean,
      default: true
    },
    downTime: {
      type: Number,
      default: 0
    },
    bankCard: {
      type: Array,
      default: () => []
    }
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
      stepTit: ['付款', '银行卡', '安全验证'],
      step: 1, // 1选中支付方式 2选择银行卡支付方式（银行卡待选择） 3选择银行卡
      selectIndex: -1, // 选中的银行卡index
      cardList: [],
      downTime2: 60000,
      isAgain: false,
      codeVal: '', // 验证码
      callData: {
        pay_type: 1,
        bank_id: '',
        bank_card: '',
        realname: '',
        idcard: '',
        mobile: ''
      },
      fyData: '',
      isRealname: 0, // 0 未实名认证 1 已实名认证
      idCard: '', // 身份证
      cardFour: '', // 银行卡后四位
      userTel: '', // 手机号脱敏
      otherPay: [
        {
          img: require('@/assets/img/icon_21.png'),
          text: '微信支付',
          type: 0
        },
        {
          img: require('@/assets/img/icon_22.png'),
          text: '支付宝支付',
          type: 1
        }
      ]
    }
  },
  created () {
    if (!this.otherPayShow) {
      this.tapIndex = 2
      this.callData.pay_type = 4
    }
    this.getBankCard()
  },
  methods: {
    // 获取银行卡列表和默认使用的银行卡
    async getBankCard () {
      const { success, data, idcard: idCard, realname } = await getMyCard()
      if (success) {
        this.cardList = data
        this.idCard = idCard
        if (realname && idCard) this.isRealname = 1
        if (data && data.length) {
          if (data[0].selected == 1) {
            this.selectIndex = 0
            this.selectBankCard(this.selectIndex)
          }
        }
      }
    },
    // 选择银行卡
    selectBankCard (index) {
      this.selectIndex = index
      this.step = 1
      this.callData.pay_type = 4
      this.callData.bank_id = this.cardList[index].id
        ? this.cardList[index].id
        : ''
      this.callData.bank_card = this.cardList[this.selectIndex].bank_card
      this.callData.realname = this.cardList[this.selectIndex].realname
      this.callData.idcard = this.cardList[this.selectIndex].idcard
      this.callData.mobile = this.cardList[this.selectIndex].mobile
      this.userTel =
        this.callData.mobile.substr(0, 3) +
        '****' +
        this.callData.mobile.substr(7)
    },
    goPay () {
      this.step = 2
    },
    // 新增银行卡
    newCard (res) {
      if (typeof res.idcard === 'undefined' || !res.idcard) {
        res.idcard = this.idCard
      }
      res.bank_name = res.bank_name.replace(/\s*/g, '')
      res.bank_card = res.bank_card.replace(/\s*/g, '')
      res.cardFour = res.bank_card.slice(-4)
      let flag = 0
      for (let i = 0; i < this.cardList.length; i++) {
        if (this.cardList[i].bank_card.slice(-4) == res.cardFour) {
          flag = 1
          break
        }
      }
      if (!flag) {
        this.cardList.push(res)
        this.selectBankCard(this.cardList.length - 1)
      }
      setTimeout(() => {
        api.removePrefs({
          key: 'realNameInfo'
        })
      }, 0)
    },
    // 银行卡支付
    cardPay () {
      this.$emit('sureSwal', this.callData)
      this.resetCountDown()
    },
    // 获取验证码
    sendCode (data) {
      this.step = 3
      this.fyData = data.data
      this.resetCountDown()
    },
    // 再次获取验证码
    codeAgain () {
      this.$emit('sureSwal', this.callData)
      this.isAgain = false
    },
    // 富友确认支付
    sureFuPay () {
      if (!this.codeVal) {
        return
      }
      fuPay({
        pay_id: this.fyData.pay_id,
        fu_order_num: this.fyData.fu_order_num,
        sign_pay: this.fyData.sign_pay,
        bank_id: this.fyData.bank_id,
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
            // this.goLink(res.message)
          }
          // if (res.code != '8143') {
          //   if (res.message.indexOf('短信验证码校验失败') == -1 && res.message.indexOf('验证码验证次数超限') == -1) {
          //     this.goLink(res.message)
          //   }
          // }
        })
    },
    // 获取我的银行卡
    myCard () {
      this.step = 2
    },
    // 返回上一步
    prevStep () {
      if (this.step == 3) {
        this.step = 1
      } else {
        this.step = this.step - 1
      }
    },
    handleClose () {
      this.$emit('close')
    },
    clickPay () {
      if (this.selectIndex == -1 || this.tapIndex < 2) {
        this.handlePay()
      } else {
        this.cardPay()
      }
    },
    handlePay () {
      this.callData.pay_type = this.tapIndex == 0 ? 1 : 2
      if (this.tapIndex == 2) {
        if (this.selectIndex > -1) {
          this.step = 3
        } else {
          this.myCard()
        }
      } else {
        this.$emit('sureSwal', this.callData)
      }
    },
    selectPayType (index) {
      this.tapIndex = index
      if (index < 2) {
        this.callData.pay_type = index == 0 ? 1 : 2
      }
      if (index == 2 && this.selectIndex == -1) {
        this.handlePay()
      }
    },
    CardNext () {
      this.step = 2
      this.tapIndex = 2
    },
    goLink (message) {
      let data = {}
      if (message) {
        data = {
          message: message
        }
      } else {
        data = {}
      }
      if (this.isRealname) {
        this.$router.push({
          path: '/pages/personage/information/addBankCard',
          query: data
        })
      } else {
        this.$router.push({
          path: '/pages/personage/information/certification',
          query: data
        })
      }
    },
    resetCountDown () {
      this.codeVal = ''
      this.downTime2 = 60000
      this.$refs.countDown2.reset()
      this.startCountDown('countDown2')
    },
    // 倒计时开始 - countDown1 付款倒计时 countDown2 验证码倒计时
    startCountDown (refName) {
      this.$refs[refName].start()
    },
    // 倒计时暂停
    pause () {
      this.$refs.countDown.pause()
    },
    // 倒计时结束
    handleFinish (type) {
      if (type == 1) {
        this.$toast('倒计时结束')
      } else if (type == 2) {
        this.isAgain = true
      }
    }
  },
  watch: {
    visible (val) {
      if (val == true) {
        this.$nextTick(() => {
          this.startCountDown('countDown')
        })
      }
      this.$emit('input', val)
    },
    value (val) {
      if (val !== this.visible) {
        this.visible = val
      }
    },
    bankCard (newValue) {
      this.newCard(newValue)
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
