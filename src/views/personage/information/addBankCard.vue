<template>
  <div class="addBankCard">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
    </van-nav-bar>
    <div class="content">
      <div class="top">
        <h3>添加银行卡</h3>
        <div class="t1">请绑定持卡人本人的银行卡</div>
      </div>
      <div class="middle">
        <van-field class="field" v-model="personName" placeholder="姓名">
          <template #label>
            <div class="label">
              持卡人
            </div>
          </template>
          <template #right-icon>
            <i
              class="font_family icon-shuoming right"
              @click="isShow = true"
            ></i>
          </template>
        </van-field>
        <van-field class="field" v-model="value2" placeholder="银行卡号">
          <template #label>
            <div class="label">卡号</div>
          </template>
          <template #right-icon>
            <i
              class="font_family icon-close-circle-fill clear"
              v-if="value2 != ''"
              @click="value2 = ''"
            ></i>
            <i class="font_family icon-xiangji right"></i>
          </template>
        </van-field>
        <van-field class="field" v-model="value3" placeholder="银行卡号">
          <template #label>
            <div class="label2">
              卡类型
            </div>
          </template>
        </van-field>
        <van-field class="field" v-model="phone" placeholder="银行预留手机号">
          <template #label>
            <div class="label2">
              手机号
            </div>
          </template>
        </van-field>
      </div>
      <div
        class="other"
        @click="
          $router.push('/pages/personage/information/support-bankCard-list')
        "
      >
        支持的银行>
      </div>
      <div class="btn1">
        <div class="agree">
          <van-checkbox
            class="checkbox"
            v-model="checked"
            shape="square"
            icon-size="14px"
          ></van-checkbox>
          同意
          <span
            @click="$router.push('/pages/personage/information/pay-agreeMent')"
            >《支付协议》</span
          >
        </div>
        <van-button
          class="btn"
          block
          :color="bol ? 'red' : 'gray'"
          :disabled="!bol"
          @click="toVerifyPhone"
        >
          下一步</van-button
        >
      </div>
    </div>
    <!-- 持卡人说明弹窗 -->
    <van-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '45%' }"
    >
      <div class="shuoming">
        <div class="title">持卡人说明</div>
        <div class="info">
          <div class="t1">
            1.为了资金安全，一个账号，只能添加同一身份下的银行卡。
          </div>
          <div class="t2">2.如需添加其他持卡人的银行卡，需要更换实名。</div>
          <div class="t3">
            3.更换实名后，原持卡人信息将被清空，后续仅能添加持卡人的银行卡。
          </div>
        </div>
      </div>
      <div class="btnBox">
        <van-button block color="#eb5841" class="btn" @click="isShow = false"
          >知道了</van-button
        >
      </div>
    </van-popup>
    <!-- 关闭弹窗按钮 -->
    <div class="close" v-if="isShow" @click="isShow = false">
      <i class="font_family icon-guanbi1 guanbi"></i>
    </div>

    <div class="txt-support">
      本服务由富友支付提供
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Field,
  Button,
  Popup,
  Picker,
  DatetimePicker,
  Toast,
  uploader,
  Checkbox
} from "vant";
import { mapGetters } from "vuex";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    Toast,
    [uploader.name]: uploader,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      isShow: false,
      personName: "",
      value2: "",
      value3: "",
      phone: "",
      checked: true,
      showPhone: false
    };
  },
  computed: {
    bol() {
      return true || this.value1 || this.value2;
    },
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 跳转预留手机号
    toVerifyPhone() {
      this.$router.push("/pages/personage/information/verifyPhone");
    },
    // 回退
    goback() {
      this.$router.go(-1);
    }
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
.addBankCard {
  height: 100%;
  overflow: auto;
  background-color: #f2f2f4;
  /deep/ .van-nav-bar {
    background-color: #f2f2f4 !important;
  }
  .content {
    padding: 0 20px;
    .top {
      text-align: center;
      h3 {
        margin-top: 100px;
        font-size: 52px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 44px;
        margin-bottom: 40px;
      }
      .t1 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 44px;
      }
    }
    .middle {
      margin-top: 81px;
      border-radius: 10px;
      // overflow: hidden;
      background-color: #fff;
      padding: 0 30px;
      .label {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 60px;
      }
      .label2 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 40px;
      }
      .field:nth-child(-n + 3) {
        border-bottom: 1px solid #f0f0f0;
      }
      .field {
        padding: 30px 0px;
      }
      .right {
        font-size: 44px;
        color: #383838;
      }
      .clear {
        margin-right: 68px;
        font-size: 32px;
        color: #aaaaaa;
      }
    }
    .other {
      margin-top: 30px;
      text-align: right;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 300;
      text-decoration: underline;
      color: #8f8f94;
      line-height: 44px;
    }

    .btn1 {
      .agree {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 82px;
        .checkbox {
          margin-right: 10px;
        }
        span {
          color: #609ce5;
        }
      }
      margin-top: 80px;
      padding: 0 60px;
      .btn {
        border-radius: 10px;
      }
    }
  }
  .shuoming {
    padding: 0 52px;
    .title {
      margin: 42px 0;
      text-align: center;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 36px;
    }
    .info {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #8f8f94;
      line-height: 36px;
      .t1,
      .t2 {
        margin-bottom: 48px;
      }
    }
  }
  .btnBox {
    margin-top: 80px;
    padding: 0 30px;
    .btn {
      border-radius: 10px;
    }
  }
  .close {
    position: absolute;
    top: 642px;
    right: 30px;
    z-index: 9999999999999999;
    .guanbi {
      font-size: 50px;
      color: white;
    }
  }

  .txt-support {
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #8f8f94;
    line-height: 44px;
  }
}
</style>
