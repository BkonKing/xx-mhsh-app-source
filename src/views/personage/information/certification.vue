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
        <van-field class="field" placeholder="储蓄卡">
          <template #label>
            <div class="label">卡号</div>
          </template>
          <template #right-icon>
            <i class="font_family icon-xiangji xiangji"></i>
          </template>
        </van-field>
        <van-field class="field" type="number" placeholder="手机号">
          <template #label>
            <div class="label">手机号</div>
          </template>
        </van-field>
      </div>
      <div class="toCard">
        支持的银行>
      </div>
      <van-button type="primary">主要按钮</van-button>
    </div>
  </div>
</template>

<script>
import { NavBar, Field, Button } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button
  },
  methods: {
    goback() {
      this.$router.go(-1);
      // this.$router.replace('/personage')
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
    }
    .toCard {
      font-size: 22px;
      color: #8f8f94;
      text-decoration: underline;
    }
  }
}
</style>
