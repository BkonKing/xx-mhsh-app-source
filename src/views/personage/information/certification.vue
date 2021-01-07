<template>
  <div class="certification">
    <van-nav-bar
      class="navbar"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    ></van-nav-bar>
    <div class="content">
      <div class="title">
        <div class="t1">实名认证</div>
        <div class="t2">请填写您的真实姓名</div>
      </div>
      <div class="item-card">
        <van-field class="field" v-model="personName" placeholder="真实姓名">
          <template #label>
            <div class="label">姓名</div>
          </template>
        </van-field>
        <van-field class="field" v-model="idCard" placeholder="身份证号码">
          <template #label>
            <div class="label">身份证</div>
          </template>
        </van-field>
      </div>
      <div class="item-card">
        <van-field
          ref="cardInput"
          @input="formatCardNumber(bankCardNum)"
          class="field"
          v-model="bankCardNum"
          placeholder="储蓄卡"
          @change="getBankCardName"
        >
          <template #label>
            <div class="label">卡号</div>
          </template>
          <template #button>
            <i
              v-if="bankCardNum.length > 0"
              class="font_family icon-close-circle-fill close"
              @click="bankCardNum = ''"
            ></i>
          </template>
          <template #right-icon>
            <i class="font_family icon-xiangji xiangji" @click="openCamera"></i>
          </template>
        </van-field>
        <van-field
          v-if="bankCardName"
          v-model="bankCardName"
          class="field card-sort"
        >
          <template #label>
            <div class="label">卡类型</div>
          </template>
        </van-field>
        <van-field
          class="field"
          v-model="phone"
          type="tel"
          placeholder="手机号"
        >
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
        <van-button
          class="btn"
          :color="bol ? 'red' : 'gray'"
          :disabled="!bol"
          block
          @click="getIdCard"
          >实名认证</van-button
        >
      </div>
    </div>
    <!-- 认证通过 -->
    <van-popup v-model="isShow" round class="popup">
      <div v-if="false">
        <i class="font_family icon-gouxuan gouxuan"></i>
        <div class="txt">认证成功</div>
      </div>
      <div v-else>
        <div class="t1">不支持此卡</div>
        <div class="t1">请使用支持的银行储蓄卡</div>
        <div class="red" @click="isShow = false">知道了</div>
      </div>
    </van-popup>
    <i
      v-if="isShow"
      @click="isShow = false"
      class="font_family icon-guanbi1 guanbi"
    ></i>
  </div>
</template>

<script>
import { NavBar, Field, Button, Popup, Toast } from "vant";
import { mapGetters } from "vuex";
import { getBankInfo } from "@/api/personage.js";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  computed: {
    ...mapGetters(["userInfo"]),
    bol() {
      return (
        this.personName &&
        this.idCard &&
        this.bankCardNum &&
        this.bankCardName &&
        this.phone
      );
    }
  },
  data() {
    return {
      value: "",
      isShow: false,
      personName: "",
      phone: "",
      bankCardNum: "",
      bankCardName: "",
      idCard: "",
      message: this.$route.query.message
    };
  },
  methods: {
    // 打开摄像头
    openCamera() {
      const baiduAd = api.require("baiduIdentifyOCR");
      if (api.systemType === "android") {
        baiduAd.init((ret, err) => {
          if (ret.status) {
            baiduAd.bankCardOCROnline(({ status, result }, err) => {
              if (status) {
                this.bankCardNum = result.split("\n")[0].split("：")[1];
              }
            });
          }
        });
      } else {
        baiduAd.bankCardOCROnline(({ status, result }, err) => {
          if (status) {
            this.bankCardNum = result.result.bank_card_number;
          }
        });
      }
    },
    // 保存实名信息到本地
    getIdCard() {
      if (
        this.idCard == "" ||
        this.bankCardNum == "" ||
        this.personName == "" ||
        this.userInfo.mobile == ""
      ) {
        return;
      }
      window.localStorage.setItem(
        "realNameInfo",
        JSON.stringify([
          this.personName,
          this.idCard,
          this.userInfo.mobile,
          this.bankCardNum
        ])
      );
      //回退
      this.$router.go(-1);
    },
    // 格式化银行卡号
    formatCardNumber(cardNum) {
      // 获取input的dom对象，这里因为用的是vant ui的input，所以需要这样拿到
      const input = this.$refs.cardInput.$el.getElementsByTagName("input")[0];
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart;
      // 字符串中光标之前-的个数
      const lineNumOfCursorLeft = (
        cardNum.slice(0, cursorIndex).match(/ /g) || []
      ).length;
      // 去掉所有-的字符串
      const noLine = cardNum.replace(/ /g, "");
      // 去除格式不对的字符并重新插入-的字符串
      const newCardNum = noLine
        .replace(/\D+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .replace(/ $/, "");
      // 改后字符串中原光标之前-的个数
      const newLineNumOfCursorLeft = (
        newCardNum.slice(0, cursorIndex).match(/ /g) || []
      ).length;
      // 光标在改后字符串中应在的位置
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft;
      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$nextTick(() => {
        this.bankCardNum = newCardNum;
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
          input.selectionStart = newCursorIndex;
          input.selectionEnd = newCursorIndex;
        });
      });
    },
    // 获取银行卡所属银行名称
    async getBankCardName() {
      // console.log(1111);
      const res = await getBankInfo({
        bank_card: this.bankCardNum.replace(/\s/g, "")
      });
      this.bankCardName = res.cnm + "   储蓄卡";
      // console.log(res);
    },
    // 跳转支持的银行卡列表
    tosubBankCardList() {
      this.$router.push("/pages/personage/information/support-bankCard-list");
    },
    // 回退
    goback() {
      this.$router.go(-1);
    }
    // 认证
    // submit() {
    //   this.isShow = true;
    // }
  },
  created() {
    this.personName = this.userInfo.realname;
    this.phone =
      this.userInfo.mobile.substr(0, 3) +
      "****" +
      this.userInfo.mobile.substr(7);
  }
};
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
        position: absolute;
        top: 50%;
        right: 60px;
        transform: translateY(-50%);
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
    bottom: 20px;
  }
  .popup {
    width: 460px;
    height: 315px;
    text-align: center;
    padding-top: 40px;
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
      &:first-child {
        margin-top: 40px;
      }
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
      margin: 40px auto;
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
