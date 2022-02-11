<template>
  <div class="addBankCard">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goBack"
    />
    <div class="content">
      <div class="top">
        <h3>绑定银行卡</h3>
        <div class="t1">请填写您的真实信息</div>
      </div>
      <div class="item-card">
        <van-field
          class="field"
          v-model="personName"
          placeholder="请输入真实姓名"
          @change="setRealname"
        >
          <template #label>
            <div class="label">姓名</div>
          </template>
        </van-field>
        <van-field
          class="field"
          v-model="idCard"
          placeholder="请输入身份证号码"
          maxlength="18"
          onkeyup="value=value.replace(/[\W]/g,'')"
        >
          <template #label>
            <div class="label">身份证</div>
          </template>
        </van-field>
      </div>
      <div class="item-card">
        <van-field
          v-model="bankCardNum"
          ref="cardInput"
          class="field"
          placeholder="请输入储蓄卡卡号"
          maxlength="23"
          @change="getBankCardName"
          @input="formatCardNumber(bankCardNum)"
        >
          <template #label>
            <div class="label">卡号</div>
          </template>
          <template #button>
            <i
              v-if="bankCardNum.length > 0"
              class="tf-icon tf-icon-close-circle-fill close"
              @click="clearBankInfo"
            ></i>
            <i class="tf-icon tf-icon-xiangji" @click="openCamera"></i>
          </template>
        </van-field>
        <van-field v-if="bankCardName" v-model="bankCardName" class="card-sort" disabled />
        <van-field
          v-model="phone"
          type="tel"
          class="field"
          placeholder="请输入手机号码"
          maxlength="11"
        >
          <template #label>
            <div class="label">手机号</div>
          </template>
        </van-field>
      </div>
      <div class="toCard" @click="goBankCardList">
        支持的银行 >
      </div>
      <div class="btnBox">
        <van-button
          class="btn"
          :color="bol ? '#EB5841' : '#ff65554d'"
          :disabled="!bol"
          block
          @click="getIdCard"
          >去支付</van-button
        >
      </div>
    </div>
    <!-- 认证通过 -->
    <van-popup v-model="isShow" round class="popup">
      <div class="t1">{{ message }}</div>
      <div class="red" @click="isShow = false">知道了</div>
    </van-popup>
    <i
      v-if="isShow"
      @click="isShow = false"
      class="tf-icon tf-icon-guanbi1 guanbi"
    ></i>
    <pay-popup
      v-model="payVisible"
      :payMoney="0.01"
      :bankCard="bankCard"
      :otherPayShow="false"
    ></pay-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBankInfo, editRealname } from '@/api/personage'
import { handlePermission } from '@/utils/permission'
import PayPopup from './components/PayPopup'
export default {
  name: 'shopBankCard',
  components: {
    PayPopup
  },
  computed: {
    ...mapGetters(['userInfo']),
    bol () {
      return (
        this.personName &&
        this.idCard &&
        this.bankCardNum &&
        this.bankCardName &&
        this.phone
      )
    },
    bankCard () {
      return this.data
    }
  },
  data () {
    return {
      value: '',
      isShow: false,
      personName: '',
      phone: '',
      bankCardNum: '',
      bankCardName: '',
      idCard: '',
      message: '',
      bankIco: '',
      payVisible: false
    }
  },
  methods: {
    clearBankInfo () {
      this.bankCardName = ''
      this.bankCardNum = ''
      this.$refs.cardInput.focus()
    },
    /* 设置姓名 */
    setRealname () {
      editRealname({
        realname: this.personName
      }).then(res => {
        if (!this.userInfo.idcard) {
          this.$toast.success('姓名设置成功')
        }
      })
    },
    // 打开摄像头
    openCamera () {
      handlePermission({
        name: 'camera'
      }).then(() => {
        const baiduAd = api.require('baiduIdentifyOCR')
        if (api.systemType === 'android') {
          baiduAd.init((ret, err) => {
            if (ret.status) {
              baiduAd.bankCardOCROnline(({ status, result }, err) => {
                if (status) {
                  this.bankCardNum = result.split('\n')[0].split('：')[1]
                  this.getBankCardName()
                }
              })
            }
          })
        } else {
          baiduAd.bankCardOCROnline(({ status, result }, err) => {
            if (status) {
              this.bankCardNum = result.result.bank_card_number
              this.getBankCardName()
            }
          })
        }
      })
    },
    // 保存实名信息到本地
    getIdCard () {
      if (
        this.idCard === '' ||
        this.bankCardNum === '' ||
        this.personName === '' ||
        this.userInfo.mobile === ''
      ) {
        return
      }
      const realNameInfo = {
        bank_card: this.bankCardNum,
        realname: this.personName,
        idcard: this.idCard,
        mobile: this.userInfo.mobile,
        bank_name: this.bankCardName,
        bank_ico: this.bankIco
      }
      api.setPrefs({
        key: 'realNameInfo',
        value: JSON.stringify(realNameInfo)
      })
      // 回退
      this.$router.go(-1)
    },
    // 格式化银行卡号
    formatCardNumber (cardNum) {
      // 获取input的dom对象，这里因为用的是vant ui的input，所以需要这样拿到
      const input = this.$refs.cardInput.$el.getElementsByTagName('input')[0]
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart
      // 字符串中光标之前-的个数
      const lineNumOfCursorLeft = (
        cardNum.slice(0, cursorIndex).match(/ /g) || []
      ).length
      // 去掉所有-的字符串
      const noLine = cardNum.replace(/ /g, '')
      // 去除格式不对的字符并重新插入-的字符串
      const newCardNum = noLine
        .replace(/\D+/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .replace(/ $/, '')
      // 改后字符串中原光标之前-的个数
      const newLineNumOfCursorLeft = (
        newCardNum.slice(0, cursorIndex).match(/ /g) || []
      ).length
      // 光标在改后字符串中应在的位置
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$nextTick(() => {
        this.bankCardNum = newCardNum
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
          input.selectionStart = newCursorIndex
          input.selectionEnd = newCursorIndex
        })
      })
    },
    // 获取银行卡所属银行名称
    getBankCardName () {
      setTimeout(async () => {
        // 进行延时处理，时间单位为千分之一秒
        // 事件处理
        if (this.bankCardNum === '') {
          return
        }
        const res = await getBankInfo({
          bank_card: this.bankCardNum.replace(/\s/g, '')
        })
        this.bankCardName = res.cnm + '   储蓄卡'
        this.bankIco = res.bank_ico
      }, 100)
    },
    // 跳转支持的银行卡列表
    goBankCardList () {
      this.$router.push('/pages/personage/information/support-bankCard-list')
    },
    // 回退
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.personName = this.userInfo.realname
    this.phone =
      this.userInfo.mobile.substr(0, 3) +
      '****' +
      this.userInfo.mobile.substr(7)
    if (this.$route.query.message) {
      console.log('this.$route.query.message', this.$route.query.message)
      this.isShow = true
      this.message = this.$route.query.message
      const realNameInfo = JSON.parse(
        api.getPrefs({ sync: true, key: 'realNameInfo' })
      )
      this.personName = realNameInfo.realname
      console.log('realNameInfo', realNameInfo)
      this.bankCardNum = realNameInfo.bank_card
      this.idCard = realNameInfo.idcard
      this.bankCardName = realNameInfo.bank_name
    }
  },
  beforeRouteLeave (to, from, next) {
    const names = ['payAgreeMent', 'supportBankCardList']
    if (!names.includes(to.name)) {
      this.$destroy()
      this.$store.commit('deleteKeepAlive', from.name)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.addBankCard {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .content {
    padding: 0 50px;
    .top {
      h3 {
        margin-top: 80px;
        margin-bottom: 20px;
        font-size: 40px;
        font-weight: bold;
        color: #000000;
        &::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 32px;
          margin-right: 12px;
          background: #ff6555;
          border-radius: 4px;
        }
      }
      .t1 {
        font-size: 26px;
        color: #222222;
        line-height: 1;
      }
    }
    .item-card {
      margin-top: 80px;
      margin-bottom: 30px;
      position: relative;
      border-radius: 8px;
      background-color: #fff;
      .field {
        display: flex;
        align-items: center;
        width: 650px;
        height: 100px;
        margin-bottom: 30px;
        background: #f7f7f7;
        border-radius: 20px;
        .label {
          font-size: 28px;
          color: #222222;
        }
        .tf-icon-xiangji {
          margin-right: 10px;
          font-size: 40px;
          color: #383838;
        }
      }
      .card-sort {
        margin-bottom: 30px;
        padding: 0 0 0 210px;
        font-size: 24px;
        line-height: 1;
      }
      /deep/ .van-field__control {
        color: black;
      }
      .close {
        font-size: 36px;
        margin-right: 30px;
        color: #bbbbbb;
      }
    }
    .toCard {
      text-align: right;
      font-size: 22px;
      color: #8f8f94;
    }
  }
  .btnBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    left: 0;
    top: 1200px;
    .btn {
      width: 650px;
      height: 88px;
      background: #ff65554d;
      border-radius: 44px;
      border: none;
    }
  }
  .popup {
    width: 560px;
    height: 320px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .gouxuan {
      font-size: 128px;
      color: #eb5841;
    }
    .txt {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 46px;
    }
    .t1 {
      // margin-top: 40px;
      padding: 0 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 46px;
    }
    .red {
      width: 300px;
      height: 60px;
      background: #eb5841;
      border-radius: 4px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 60px;
    }
  }
  .guanbi {
    font-size: 50px;
    position: absolute;
    top: 407px;
    right: 174px;
    color: white;
    z-index: 99999999999999999999999999999;
  }
}
</style>
