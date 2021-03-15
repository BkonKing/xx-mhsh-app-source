<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="生活缴费"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <span class="tf-icon tf-icon-shijian" @click="goLivePayList"></span>
      </template>
    </van-nav-bar>
    <div class="tf-body-container pay-cost-detail">
      <img class="pay-type-icon" :src="payInfo.icon" />
      <div class="pay-title">{{ payInfo.genre_name }}</div>
      <div class="pay-detail">
        <div class="pay-header">
          <div class="pay-header-left">
            <div class="pay-number-label">应交金额</div>
            <div class="pay-number">
              {{ payInfo.money }}
            </div>
          </div>
          <div class="pay-header-right" @click="goBill">
            查看账单 <span class="tf-icon tf-icon-right"></span>
          </div>
        </div>
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">
              住址信息
            </div>
            <div class="pay-info-content">
              {{ payInfo.house_property_name }}
            </div>
          </div>
          <div class="pay-info-box" v-if="payInfo.account_numb">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">
              {{ payInfo.account_numb || "-" }}
            </div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label"><span>户</span><span>名</span></div>
            <div class="pay-info-content">
              {{ payInfo.realname || "-" }}
            </div>
          </div>
        </div>
        <div class="pay-info-box" v-if="false">
          <div class="pay-info-label">
            缴费单位
          </div>
          <div class="pay-info-content"></div>
        </div>
      </div>
      <div class="pay-detail pay-padding">
        <div class="pay-number-label">缴费金额</div>
        <van-field
          v-model="money"
          class="pay-input"
          type="number"
          :autofocus="true"
        >
          <template v-slot:left-icon>￥</template>
        </van-field>
      </div>
    </div>
    <div class="tf-padding">
      <van-button
        v-preventReClick
        size="large"
        type="danger"
        :disabled="!money"
        @click="payMoney"
        >立即缴费</van-button
      >
    </div>
    <pay-success
      v-model="successShow"
      :payAmount="money"
      @confirm="$router.go(-1)"
      @look="replaceLivePayList"
    ></pay-success>
  </div>
</template>

<script>
import { getFeeDetails } from "@/api/butler";
import paySuccess from "./components/success";
import filters from "./filters";
export default {
  name: "livePayCostDetail",
  components: {
    paySuccess
  },
  data() {
    return {
      id: "",
      projectId: "",
      orderId: "",
      isChoicePay: false, // 是否从缴费页面进入
      payInfo: {
        order_status: 2
      },
      money: "", //
      successShow: false
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.id = this.$route.query.id;
    this.projectId = this.$route.query.projectId;
    this.isChoicePay = this.$route.query.isChoicePay;
    this.getFeeDetails();
  },
  methods: {
    // 获取费用详情接口
    getFeeDetails() {
      getFeeDetails({
        order_id: this.orderId
      }).then(({ data }) => {
        this.payInfo = data;
      });
    },
    // 跳转账单页面
    goBill() {
      this.$router.push({
        name: "livePayPayBill",
        query: {
          projectId: this.projectId,
          id: this.id
        }
      });
    },
    // 跳转缴费页面
    payMoney() {
      // 金额做判断：1.大于0；2.>=应缴金额
      if (parseFloat(this.money) <= 0) {
        this.$dialog({
          title: "金额必须大于零"
        });
      } else if (parseFloat(this.money) < parseFloat(this.payInfo.money)) {
        this.$dialog({
          title: "缴费金额必须大于等于欠费金额"
        });
      } else {
      }
    },
    // 跳转生活缴费列表页
    goLivePayList() {
      this.$router.push({
        name: "livePayRecord"
      });
    },
    // 重定向到生活缴费列表页
    replaceLivePayList() {
      this.$router.replace({
        name: "livePayRecord"
      });
    }
  },
  filters
};
</script>

<style lang="less" scoped>
.pay-cost-detail {
  @flex-column();
  align-items: center;
  padding: 40px 20px 0;
  .pay-type-icon {
    width: 90px;
    height: 100px;
    margin-bottom: 15px;
  }
  .pay-title {
    margin-bottom: 10px;
    font-size: 30px;
    color: #222;
  }
  .pay-info-container {
    padding: 30px 0;
  }
  .pay-detail {
    width: 100%;
    padding: 0 30px;
    margin-top: 30px;
    background: #ffffff;
    border-radius: 10px;
    .pay-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 0;
      border-bottom: 2px dashed #f0f0f0;
      .pay-header-left {
        display: flex;
        align-items: center;
      }
      .pay-header-right {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #8f8f94;
        .tf-icon-right {
          margin-left: 10px;
        }
      }
      .pay-number {
        font-size: 52px;
        font-weight: 500;
        color: #eb5841;
      }
    }

    .pay-number-label {
      margin-right: 46px;
      font-size: 28px;
      color: #000;
      line-height: 1;
    }

    .pay-info-box {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .pay-info-label {
        display: flex;
        justify-content: space-between;
        width: 112px;
        margin-right: 46px;
        font-size: 28px;
        color: #949494;
      }
      .pay-info-content {
        font-size: 28px;
      }
    }
  }
  .pay-padding {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .pay-input {
    padding: 22px 0 16px;
    font-size: 72px;
    line-height: 1;
    border-bottom: 2px solid #f0f0f0;
    /deep/ .van-field__left-icon {
      display: flex;
      align-items: flex-end;
      margin-right: 16px;
      transform: translateY(-6px);
      font-size: 34px;
      font-weight: 600;
      color: #222;
    }
    /deep/ .van-field__control {
      line-height: 72px;
    }
  }
}
/deep/ .van-button--disabled {
  background: #aaa;
  border-color: #aaa;
  opacity: 1;
}
</style>
