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
        <van-field class="field" placeholder="真实姓名">
          <template #label>
            <div class="label">姓名</div>
          </template>
        </van-field>
        <van-field class="field" placeholder="身份证号码">
          <template #label>
            <div class="label">身份证</div>
          </template>
        </van-field>
      </div>
      <div class="item-card">
        <van-field class="field" v-model="value" placeholder="储蓄卡">
          <template #label>
            <div class="label">卡号</div>
          </template>
          <template #button>
            <i
              v-if="value.length > 0"
              class="font_family icon-close-circle-fill close"
              @click="value = ''"
            ></i>
          </template>
          <template #right-icon>
            <i class="font_family icon-xiangji xiangji"></i>
          </template>
        </van-field>
        <van-field class="field card-sort" v-if="false">
          <template #label>
            <div class="label">卡类型</div>
          </template>
        </van-field>
        <van-field class="field" type="tel" placeholder="手机号">
          <template #label>
            <div class="label">手机号</div>
          </template>
        </van-field>
      </div>
      <div class="toCard">
        支持的银行>
      </div>
      <div class="btnBox">
        <van-button class="btn" @click="submit" color="#aaaaaa" block
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
        <div class="t1">请使用支持的银行卡</div>
        <div class="red">知道了</div>
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
import { NavBar, Field, Button, Popup } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data() {
    return {
      value: "",
      isShow: false
    };
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    },
    // 认证
    submit() {
      this.isShow = true;
    }
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
        right: 120px;
        transform: translateY(-50%);
      }
    }
    .toCard {
      font-size: 22px;
      color: #8f8f94;
      text-decoration: underline;
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
