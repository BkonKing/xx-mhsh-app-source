<template>
  <div class="certification">
    <van-nav-bar class="navbar"
                 :fixed="true"
                 :border="false"
                 placeholder
                 left-arrow
                 @click-left="goback"></van-nav-bar>
    <div class="content">
      <div class="title">
        <div class="t1">使用新银行卡支付</div>
        <div class="t2">请填写您的真实信息</div>
      </div>
      <div class="item-card">
        <van-field class="field"
                   v-model="personName"
                   placeholder="真实姓名"
                   @change="setRealname">
          <template #label>
            <div class="label">姓名</div>
          </template>
        </van-field>
        <van-field class="field"
                   v-model="idCard"
                   placeholder="身份证号码"
                   maxlength="18"
                   onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
          <template #label>
            <div class="label">身份证</div>
          </template>
        </van-field>
      </div>
      <div class="item-card">
        <van-field ref="cardInput"
                   @input="formatCardNumber(bankCardNum)"
                   class="field"
                   v-model="bankCardNum"
                   placeholder="储蓄卡"
                   maxlength="23"
                   @change="getBankCardName">
          <template #label>
            <div class="label kahao">卡号</div>
          </template>
          <template #button>
            <i v-if="bankCardNum.length > 0"
               class="font_family icon-close-circle-fill close"
               @click="bankCardNum = ''"></i>
            <i class="font_family icon-xiangji xiangji"
               @click="openCamera"></i>
          </template>
          <!-- <template #right-icon>
            <i class="font_family icon-xiangji xiangji"
               @click="openCamera"></i>
          </template> -->
        </van-field>
        <van-field v-if="bankCardName"
                   v-model="bankCardName"
                   class="field card-sort">
          <template #label>
            <div class="label">卡类型</div>
          </template>
        </van-field>
        <van-field class="field"
                   v-model="phone"
                   type="tel"
                   placeholder="手机号">
          <template #label>
            <div class="label">手机号</div>
          </template>
        </van-field>
      </div>
      <div class="toCard">
        <span @click="tosubBankCardList">
          支持的银行>
        </span>
      </div>
      <div class="btnBox">
        <van-button class="btn"
                    :color="bol ? '#EB5841' : 'gray'"
                    :disabled="!bol"
                    block
                    @click="getIdCard">去支付</van-button>
      </div>
    </div>
    <!-- 认证通过 -->
    <van-popup v-model="isShow"
               round
               class="popup">
      <!-- <div v-if="showTc">
        <i class="font_family icon-gouxuan gouxuan"></i>
        <div class="txt">认证成功</div>
      </div> -->
      <!-- <div v-else> -->
      <div class="t1">{{ message }}</div>
      <div class="red"
           @click="isShow = false">知道了</div>
      <!-- </div> -->
    </van-popup>
    <i v-if="isShow"
       @click="isShow = false"
       class="font_family icon-guanbi1 guanbi"></i>
  </div>
</template>

<script>
import { NavBar, Field, Button, Popup, Toast } from 'vant'
import { mapGetters } from 'vuex'
import { getBankInfo, editRealname } from '@/api/personage.js'
export default {
  name: 'certification',
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast
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
      bankIco: ''
    }
  },
  methods: {
    /* 设置姓名 */
    setRealname () {
      editRealname({
        realname: this.personName
      }).then(res => {
        if (!this.userInfo.idcard) {
          Toast.success('姓名设置成功')
        }
      })
    },
    // 打开摄像头
    openCamera () {
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
    },
    // 保存实名信息到本地
    getIdCard () {
      const idCardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      if (!idCardReg.test(this.idCard) || this.bankCardNum.replace(/\s/g, '').length > 19) {
        Toast.fail('请输入正确的银行卡或者身份证号')
        return
      }
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
    async getBankCardName () {
      const res = await getBankInfo({
        bank_card: this.bankCardNum.replace(/\s/g, '')
      })
      this.bankCardName = res.cnm + '   储蓄卡'
      this.bankIco = res.bank_ico
    },
    // 跳转支持的银行卡列表
    tosubBankCardList () {
      this.$router.push('/pages/personage/information/support-bankCard-list')
    },
    // 回退
    goback () {
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
.certification {
  height: 100%;
  background-color: #f2f2f4;
  /deep/ .van-nav-bar {
    background-color: #f2f2f4 !important;
  }
  .content {
    padding: 20px;
    .title {
      height: 300px;
      text-align: center;
      .t1 {
        font-size: 48px;
        margin-top: 90px;
        margin-bottom: 40px;
      }
      .t2 {
        font-size: 26px;
      }
    }
    .item-card {
      margin-bottom: 30px;
      border-radius: 8px;
      padding: 0 20px;
      background-color: #fff;
      position: relative;
      .field {
        padding-top: 20px;
        padding-bottom: 20px;
        &:nth-child(1) {
          border-bottom: 1px solid #f0f0f0;
        }
        .label {
          font-size: 28px;
          color: #222222;
        }
        .kahao {
          line-height: 55px;
        }
        .xiangji {
          font-size: 40px;
          color: #383838;
        }
      }
      .card-sort {
        border-bottom: 1px solid #f0f0f0;
      }
      .close {
        font-size: 32px;
        margin-right: 10px;
        // position: absolute;
        // top: 50%;
        // left: 200px;
        // transform: translateY(-50%);
      }
    }
    .toCard {
      text-align: right;
      span {
        font-size: 22px;
        color: #8f8f94;
        text-decoration: underline;
      }
    }
  }
  .btnBox {
    width: 100%;
    position: fixed;
    padding: 0 20px;
    left: 0;
    top: 1200px;
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
      // margin: 50px auto;
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
