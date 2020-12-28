<template>
  <div class="support-bankCard-list">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">
          支持的银行卡列表
        </div>
      </template>
    </van-nav-bar>
    <div class="txt">
      储蓄卡
    </div>
    <div class="content">
      <div class="item" v-for="(item, index) in 10" :key="index">
        <img src="@/assets/img/gsyh.png" alt="" />
        <div class="txt">中国工商银行</div>
      </div>
      <div class="item"></div>
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
  methods: {
    // 回退
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.support-bankCard-list {
  height: 100%;
  background-color: #f2f2f4;

  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
  .txt {
    height: 90px;
    text-align: center;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 90px;
  }
  .content {
    height: 100%;
    background-color: #fff;
    padding: 0 30px;

    .item {
      display: flex;
      align-items: center;
      height: 128px;
      border-bottom: 1px solid #f0f0f0;
      img {
        width: 72px;
        height: 72px;
        margin-right: 26px;
      }
      .txt {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
    }
  }
}
</style>
