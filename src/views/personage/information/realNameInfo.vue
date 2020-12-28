<template>
  <div class="realNameInfo">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">实名认证</div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="info">
        <div class="left">
          <img src="@/assets/imgs/touxiang.png" alt="" />
        </div>
        <div class="right">
          <div class="t1">姓名</div>
          <div class="t2">
            蔡文姬 <img src="@/assets/imgs/realname.png" alt="" />
          </div>
          <div class="t3">证件号</div>
          <div class="t4">3*********************0</div>
        </div>
      </div>
      <div class="personInfo" @click="toPersonInfo">
        <van-cell is-link center>
          <template #title>
            <div class="title">
              个人信息
            </div>
          </template>
          <template>
            <div class="value">
              {{ isPerfect ? "完善" : "未完善" }}
            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Field, Button, Popup, Cell, CellGroup } from "vant";
import { mapGetters } from "vuex";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Cell.name]: Cell
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isPerfect() {
      return (
        this.userInfo.avatar &&
        this.userInfo.nickname &&
        this.userInfo.realname &&
        this.userInfo.gender &&
        this.userInfo.birthday
      );
    }
  },
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    },
    // 跳转个人信息
    toPersonInfo() {
      this.$router.push("/pages/personage/information/personInfo");
    }
  }
};
</script>

<style lang="less" scoped>
.realNameInfo {
  height: 100%;
  background-color: #f2f2f4;
  /deep/ .van-nav-bar {
    background-color: #f2f2f4 !important;
  }
  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
  .content {
    padding: 58px 20px;
    .info {
      width: 710px;
      height: 268px;
      background: url("~@/assets/imgs/realNameInfo_bg.png");
      background-size: 100% 100%;
      display: flex;
      .left {
        width: 88px;
        height: 100%;
        margin: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 88px;
          height: 88px;
        }
      }
      .right {
        flex: 1;
        color: white;
        .t1 {
          margin-top: 57px;
          font-size: 22px;
          margin-bottom: 10px;
        }
        .t2 {
          font-size: 30px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          img {
            margin-left: 20px;
            width: 108px;
            height: 32px;
          }
        }
        .t3 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .t4 {
          font-size: 32px;
        }
      }
    }
    .personInfo {
      margin-top: 30px;
      border-radius: 10px;
      overflow: hidden;
      .title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 82px;
      }
      .value {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8f8f94;
        line-height: 82px;
      }
    }
  }
}
</style>
