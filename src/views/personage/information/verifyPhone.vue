<template>
  <div class="verifyPhone">
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
        <div class="t1">验证银行预留手机号</div>
        <div class="t2">请确认当前手机号</div>
      </div>
      <div class="middle">
        <van-field class="field" v-model="phone" placeholder="请输入手机号">
          <template #label>
            <div class="label">
              手机号
            </div>
          </template>
        </van-field>
        <van-field class="field" v-model="yzm" placeholder="请输入验证码">
          <template #label>
            <div class="label" @click="send">验证码</div>
          </template>
          <template #button>
            <div v-if="yzmTime == 60" class="yzm" @click="send">
              发送验证码
            </div>
            <div v-else>{{ yzmTime }}s</div>
          </template>
        </van-field>
      </div>
      <div class="btnBox">
        <van-button
          class="btn"
          block
          :disabled="!bol"
          :color="bol ? 'red' : 'gray'"
          @click="toBankCard"
          >下一步</van-button
        >
      </div>
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
  uploader
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
    [uploader.name]: uploader
  },
  data() {
    return {
      phone: "",
      yzm: "",
      yzmTime: 60
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    bol() {
      return this.phone && this.yzm;
    }
  },
  methods: {
    // 跳转银行卡
    toBankCard() {
      this.$router.push("/pages/personage/information/bankCard");
    },
    // 回退
    goback() {
      this.$router.go(-1);
    },
    // 发送验证码
    send() {
      this.yzmTime--;
      let time = setInterval(() => {
        this.yzmTime--;
        if (this.yzmTime == 0) {
          this.yzmTime = 60;
          clearInterval(time);
        }
      }, 1000);
    }
  },
  created() {
    this.phone =
      this.userInfo.mobile.substr(0, 3) +
      "****" +
      this.userInfo.mobile.substr(7);
  }
};
</script>

<style lang="less" scoped>
.verifyPhone {
  height: 100%;
  background-color: #f2f2f4;
  /deep/ .van-nav-bar {
    background-color: #f2f2f4;
  }
  .content {
    padding: 0 20px;
    .top {
      margin-top: 110px;
      text-align: center;
      .t1 {
        font-size: 52px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 44px;
      }
      .t2 {
        margin-top: 40px;
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
      overflow: hidden;
      background-color: #fff;
      padding: 0 30px;
      .label {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
      .field:first-child {
        border-bottom: 1px solid #f0f0f0;
      }
      .field {
        padding: 30px 0px;
      }
      .yzm {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
    }
    .btnBox {
      margin-top: 136px;
      padding: 0 60px;
      .btn {
        border-radius: 10px;
      }
    }
  }
}
</style>
