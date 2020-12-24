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
            蔡文姬 <i class="font_family icon-yishiming"></i>
          </div>
          <div class="t3">证件号</div>
          <div class="t4">3*********************0</div>
        </div>
      </div>
    </div>
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
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
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
    }
  }
}
</style>
