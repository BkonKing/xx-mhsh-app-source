<template>
  <div class="bankCard">
    <van-nav-bar
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="goback"
    >
      <template #title>
        <div class="title">
          银行卡
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="item" v-for="(item, index) in 10" :key="index">
        <div class="top">
          <img src="@/assets/img/zgyh.png" alt="" />
          <div class="right">
            <div class="t1">中国银行</div>
            <div class="t2">储蓄卡</div>
          </div>
        </div>
        <div class="bottom">
          ****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;
          0505
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
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
.bankCard {
  height: 100%;
  overflow: auto;
  .title {
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 44px;
  }
  .content {
    padding: 20px;

    .item {
      width: 710px;
      height: 232px;
      background: url(~@/assets/imgs/zgyhdb.png);
      background-size: 100% 100%;
      margin-bottom: 30px;
      .top {
        display: flex;
        align-items: center;
        padding: 30px 30px 0;
        img {
          width: 66px;
          height: 66px;
          margin-right: 22px;
        }
        .right {
          .t1 {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 38px;
          }
          .t2 {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 38px;
            opacity: 0.6;
          }
        }
      }
      .bottom {
        margin-top: 50px;
        margin-left: 116px;

        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 38px;
      }
    }
  }
}
</style>
