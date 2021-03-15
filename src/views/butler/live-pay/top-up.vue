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
          <div class="pay-number-label">应交金额</div>
          <div class="pay-number">
            {{ payInfo.money }}
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
        <div class="pay-number-label">充值金额</div>
        <van-field v-model="money" class="pay-input" type="number">
          <template v-slot:left-icon>￥</template>
        </van-field>
        <div v-if="payInfo.money >= 0" class="money-primary">
          <div
            v-for="(item, i) in moneyPayList"
            :key="i"
            class="money-tag"
            :class="{ 'money-tag-active': money == item }"
            @click="money = item"
          >
            <span class="tf-text-sm">￥</span>
            <span>{{ item }}</span>
          </div>
        </div>
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
import { getFeeDetails } from '@/api/butler'
import paySuccess from './components/success'
import filters from './filters'
export default {
  name: 'livePayTopUp',
  components: {
    paySuccess
  },
  data () {
    return {
      id: '',
      projectId: '',
      orderId: '',
      isChoicePay: false, // 是否从缴费页面进入
      payInfo: {
        order_status: 2
      },
      money: '', // 充值金额
      successShow: false,
      moneyPayList: [1000, 500, 300, 100] // 充值预选列表
    }
  },
  created () {
    this.orderId = this.$route.query.orderId
    this.id = this.$route.query.id
    this.projectId = this.$route.query.projectId
    this.isChoicePay = this.$route.query.isChoicePay
    this.getFeeDetails()
  },
  methods: {
    // 获取费用详情接口
    getFeeDetails () {
      getFeeDetails({
        order_id: this.orderId
      }).then(({ data }) => {
        this.payInfo = data
      })
    },
    // 支付金额
    payMoney () {
      this.successShow = true
    },
    // 跳转生活缴费列表页
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    },
    // 重定向到生活缴费列表页
    replaceLivePayList () {
      this.$router.replace({
        name: 'livePayRecord'
      })
    }
  },
  filters
}
</script>

<style lang="less" scoped>
.pay-cost-detail {
  @flex-column();
  align-items: center;
  padding: 50px 20px 0;
  .pay-type-icon {
    width: 90px;
    height: 90px;
    margin-bottom: 15px;
  }
  .pay-title {
    margin-bottom: 10px;
    font-size: 30px;
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
      align-items: center;
      padding: 30px 0;
      border-bottom: 2px dashed #f0f0f0;
      .pay-number {
        font-size: 52px;
        font-weight: 500;
        color: #222;
      }
    }

    .pay-number-label {
      margin-right: 46px;
      font-size: 28px;
      color: #000;
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
    padding: 30px 0;
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
.money-primary {
  display: flex;
  justify-content: space-between;
  padding: 40px 0 10px;
  .money-tag {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 147px;
    height: 64px;
    padding-bottom: 12px;
    font-size: 30px;
    color: #eb5841;
    background: rgba(235, 88, 65, 0.1);
    background-clip: padding-box;
    border: 4px solid rgba(235, 88, 65, 0.1);
    border-radius: 4px;
    > span {
      line-height: 1;
    }
  }
  .money-tag-active {
    border: 4px solid #eb5841;
  }
}
/deep/ .van-button--disabled {
  background: #aaa;
  border-color: #aaa;
  opacity: 1;
}
</style>
