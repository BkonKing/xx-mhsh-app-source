<template>
  <div>
    <div v-show="showSwal" class="public-mask pay-mask bottom-fixed">
      <div class="public-dclose" @click="calcel(0)"><img class="img-100" src="@/assets/img/close.png" /></div>
      <div class="public-header"><span v-if="step > 1" @click="prevStep" class="header-left van-icon van-icon-arrow-left"></span>{{ stepTit[step-1] }}</div>
      <div v-show="step == 1">
        <div :class="[downTime ? '' : 'no-time','settlement-price']">
          <div>￥{{payMoney}}</div>
          <div v-if="downTime">(<van-count-down ref="countDown" :auto-start="false" :time="downTime" @finish="finish(1)">
                <template v-slot="timeData">{{ timeData.minutes<10 ? '0'+timeData.minutes : timeData.minutes }}:{{ timeData.seconds<10 ? '0'+timeData.seconds : timeData.seconds }}
                </template>
              </van-count-down>)</div>
        </div>
        <div class="common-list">
          <template v-if="wxzfbShow">
            <div class="common-item-first common-item" @click.stop="selectSwal(0)">
              <div class="common-item-left">
                <div :class="[tapIndex == 0 ? 'cur' : '','cart-checkbox flex-center']">
                  <div class="checkbox-session"></div>
                </div><img src="@/assets/img/icon_21.png" />微信支付
              </div>
            </div>
            <div class="common-item" @click.stop="selectSwal(1)">
              <div class="common-item-left">
                <div :class="[tapIndex == 1 ? 'cur' : '','cart-checkbox flex-center']">
                  <div class="checkbox-session"></div>
                </div><img src="@/assets/img/icon_22.png" />支付宝支付
              </div>
            </div>
          </template>
          <div v-if="selectIndex == -1" class="common-item" @click.stop="selectSwal(2)">
            <div class="common-item-left">
              <div v-show="wxzfbShow" :class="[tapIndex == 2 ? 'cur' : '','cart-checkbox flex-center']">
                <div class="checkbox-session"></div>
              </div>
              <img src="@/assets/img/icon_27.png" />银行卡支付
            </div>
            <i class="van-icon van-icon-arrow right-next"></i>
          </div>
          <div v-else class="common-item">
            <div class="left-link" @click.stop="selectSwal(2)"></div>
            <div class="right-link" @click.stop="CardNext"></div>
            <div class="common-item-left">
              <div v-show="wxzfbShow" :class="[tapIndex == 2 ? 'cur' : '','cart-checkbox flex-center']">
                <div class="checkbox-session"></div>
              </div>
              <img :src="cardList[selectIndex].bank_ico" />{{ cardList[selectIndex].bank_name }} ({{ cardList[selectIndex].cardFour ? cardList[selectIndex].cardFour : cardList[selectIndex].bank_card }})
            </div>
            <i class="van-icon van-icon-arrow right-next"></i>
          </div>
        </div>
        <div v-if="selectIndex == -1" class="submit-btn color-fff" @click.stop="sureSwal()">去付款</div>
        <div v-else class="submit-btn color-fff" @click.stop="cardPay">去付款</div>
      </div>
      <div v-show="step == 2">
        <div class="common-list">
          <div v-for="(item, index) in cardList" :key="index" :class="[ index == 0 ? 'common-item-first' : '', 'common-item']" @click.stop="selectCard(index)">
            <div class="common-item-left">
              <div :class="[selectIndex == index ? 'cur' : '','cart-checkbox flex-center']">
                <div class="checkbox-session"></div>
              </div><img :src="item.bank_ico" />{{ item.bank_name}} ({{ item.cardFour ? item.cardFour : item.bank_card }})
            </div>
          </div>
          <!-- <div class="common-item" @click.stop="selectSwal(1)">
            <div class="common-item-left">
              <div :class="[tapIndex == 1 ? 'cur' : '','cart-checkbox flex-center']">
                <div class="checkbox-session"></div>
              </div><img src="@/assets/img/icon_22.png" />农业银行 储蓄卡（0505）
            </div>
          </div> -->
        </div>
        <div class="submit-btn color-fff" @click.stop="goLink(0)">使用新银行卡</div>
      </div>
      <div v-show="step == 3">
        <div class="validation-tel">我们已经发送了验证码到你的手机：<br />{{ userTel }}</div>
        <div class="validation-code">
          <div class="flex-center">
            <div class="code-label">验证码</div>
            <input type="number" v-model.trim="codeVal" oninput="if(value.length > 6)value=value.slice(0, 6)" placeholder="请输入6位验证码" />
            <div v-if="!isAgain" class="code-time">
              <van-count-down ref="countDown2" :auto-start="false" :time="downTime2" @finish="finish(2)">
                <template v-slot="timeData">{{ timeData.seconds }}</template>
              </van-count-down>s</div>
            <div v-else @click="codeAgain" class="code-time again-send">
              重新发送
            </div>
          </div>
        </div>
        <div :class="[codeVal && codeVal.length==6 ? '' : 'submit-btn-unable', 'submit-btn color-fff']" @click.stop="sureFuPay()">确认</div>
      </div>
    </div>
    <div v-show="showSwal" class="mask-bg" @click="calcel(0)"></div>
  </div>
</template>

<script>
import { CountDown, Toast } from 'vant'
import { getMyCard, fuPay, getBankOne } from '@/api/life.js'
export default {
  components: {
    [CountDown.name]: CountDown,
    [Toast.name]: Toast
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
    wxzfbShow: {
      type: Boolean,
      default: true
    },
    downTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tapIndex: 1,
      stepTit: ['付款', '银行卡', '安全验证'],
      step: 1, // 1选中支付方式 2选择银行卡支付方式（银行卡待选择） 3选择了银行卡
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
      userTel: '' // 手机号脱敏
    }
  },
  watch: {
    showSwal (val, oldVal) {
      if (val == true) {
        this.$nextTick(() => {
          this.start()
        })
      }
    }
  },
  created () {
    if (!this.wxzfbShow) {
      this.tapIndex = 2
      this.callData.pay_type = 4
    }
    this.myUseCard()
  },
  methods: {
    // 选择银行卡
    selectCard (index) {
      console.log(index)
      this.selectIndex = index
      this.step = 1
      this.callData.pay_type = 4
      this.callData.bank_id = this.cardList[index].id ? this.cardList[index].id : ''
      this.callData.bank_card = this.cardList[this.selectIndex].bank_card
      this.callData.realname = this.cardList[this.selectIndex].realname
      this.callData.idcard = this.cardList[this.selectIndex].idcard
      this.callData.mobile = this.cardList[this.selectIndex].mobile
      this.userTel = this.callData.mobile.substr(0, 3) + '****' + this.callData.mobile.substr(7)
    },
    // 新增银行卡
    newCard (res) {
      console.log(112, res)
      if (typeof res.idcard === 'undefined' || !res.idcard) {
        res.idcard = this.idCard
      }
      res.bank_name = res.bank_name.replace(/\s*/g, '')
      res.bank_card = res.bank_card.replace(/\s*/g, '')
      res.cardFour = res.bank_card.slice(-4)
      this.cardList.push(res)
      this.selectCard(this.cardList.length - 1)
    },
    // 银行卡支付
    cardPay () {
      this.$emit('sureSwal', this.callData)
      this.codeVal = ''
      this.downTime2 = 60000
      this.$refs.countDown2.reset()
      this.start2()
    },
    // 获取验证码
    sendCode (data) {
      this.step = 3
      this.fyData = data.data
      this.codeVal = ''
      this.downTime2 = 60000
      this.$refs.countDown2.reset()
      this.start2()
      console.log(data)
    },
    // 再次获取验证码
    codeAgain () {
      this.$emit('sureSwal', this.callData)
      this.isAgain = false
      // getCodeAgain({
      //   pay_id: this.fyData.pay_id,
      //   fu_order_num: this.fyData.fu_order_num,
      //   bank_id: this.fyData.bank_id
      // }).then(res => {
      //   Toast(res.message)
      //   this.isAgain = false
      //   this.fyData = res.data
      //   this.downTime2 = 60000
      //   this.start2()
      // })
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
      }).then(res => {
        if (res.success) { // 成功
          this.$emit('fyResult', res.success)
        }
      }).catch((res) => {
        if (res.message.indexOf('短信') == -1 && res.message.indexOf('验证码') == -1) {
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
    // 获取默认使用的银行卡
    myUseCard () {
      getMyCard().then(res => {
        if (res.success) {
          this.cardList = res.data
          this.idCard = res.idcard
          if (res.realname && res.idcard) this.isRealname = 1
          // this.step = 2
          if (res.data && res.data.length) {
            if (res.data[0].selected == 1) {
              this.selectIndex = 0
              this.selectCard(this.selectIndex)
            }
          }
        }
      })
    },
    // 获取我的银行卡
    myCard () {
      this.step = 2
      // getMyCard().then(res => {
      //   if (res.success) {
      //     this.cardList = res.data
      //     this.idCard = res.idcard
      //     if (res.realname && res.idcard) this.isRealname = 1
      //     this.step = 2
      //   }
      // })
    },
    // 返回上一步
    prevStep () {
      if (this.step == 3) {
        this.step = 1
      } else {
        this.step = this.step - 1
      }
    },
    // 发送
    // payblock () {},
    calcel (val) {
      this.$emit('closeSwal', val)
    },
    sureSwal (index) {
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
    selectSwal (index) {
      this.tapIndex = index
      console.log(index)
      if (index < 2) {
        this.callData.pay_type = index == 0 ? 1 : 2
      }
      console.log(this.callData.pay_type)
      if (index == 2 && this.selectIndex == -1) {
        this.sureSwal()
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
    // 倒计时开始-付款倒计时
    start () {
      this.$refs.countDown.start()
    },
    // 倒计时开始-验证码倒计时
    start2 () {
      this.$refs.countDown2.start()
    },
    // 倒计时暂停
    pause () {
      this.$refs.countDown.pause()
    },
    // 倒计时结束
    finish (type) {
      console.log(this.endTime - this.newTime)
      if (type == 1) {
        Toast('倒计时结束')
      } else if (type == 2) {
        this.isAgain = true
      }
    }
  }
}
</script>

<style scoped>
@import '../../../styles/life.css';
.header-left {
  position: absolute;
  font-size: 40px;
  width: 112px;
  height: 112px;
  padding-left: 15px;
  text-align: left;
  line-height: 112px;
  top: 0;
  left: -30px;
}
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
  position: relative;
}
.left-link {
  position: absolute;
  left: -30px;
  top: 0;
  bottom: 0;
  width: 180px;
  z-index: 8;
}
.right-link {
  position: absolute;
  top: 0;
  right: -30px;
  bottom: 0;
  width: 570px;
  z-index: 8;
}
.common-item-left {
  height: 100%;
  flex-grow: 1;
}
.pay-mask .common-item-left img {
  width: 58px;
  height: 58px;
  margin-right: 20px;
}
.right-next {
  font-size: 30px;
  color: #8f8f94;
  height: 100%;
  padding: 0 30px;
  margin-right: -30px;
  line-height: 120px;
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
.validation-tel {
  font-size: 30px;
  height: 146px;
  text-align: center;
  line-height: 44px;
}
.validation-code {
  width: 688px;
  border-top: 1PX solid #F0F0F0;
  border-bottom: 1PX solid #F0F0F0;
}
.validation-code > div {
  height: 120px;
}
.code-label {
  font-size: 30px;
  width: 140px;
}
.validation-code input {
  width: 400px;
  font-size: 28px;
}
.code-time {
  width: 140px;
  flex-grow: 1;
  font-size: 34px;
  color: #8F8F94;
  text-align: right;
}
.again-send.code-time {
  color: #222222;
  font-size: 30px;
}
.code-time .van-count-down {
  display: inline;
  color: #8F8F94;
  font-size: 34px;
}
</style>
