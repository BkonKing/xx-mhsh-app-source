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
      <img class="pay-type-icon" :src="payInfo.icon">
      <div class="pay-title">{{ payInfo.genre_name }}</div>
      <div class="pay-detail">
        <div class="pay-header">
          <div class="pay-number-box">
            <div class="pay-number-label">应交金额</div>
            <div class="pay-number">￥{{ payInfo.money }}</div>
          </div>
          <div v-if="payInfo.violations_money" class="penal-sum">
            (含违约金{{ payInfo.violations_money }}元)
          </div>
        </div>
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费小区
            </div>
            <div class="pay-info-content">{{ payInfo.house_property_name }}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">{{ payInfo.account_numb || '-' }}</div>
          </div>
        </div>
      </div>
      <div class="pay-detail pay-padding">
        <div class="pay-info-box" v-if="payInfo.surface">
          <div class="pay-info-label">
            表号
          </div>
          <div class="pay-info-content">{{ payInfo.surface }}</div>
        </div>
        <div class="pay-info-box">
          <div class="pay-info-label">
            属期
          </div>
          <div class="pay-info-content">{{ payInfo.time }}</div>
        </div>
        <div class="pay-info-box" v-if="payInfo.disparity">
          <div class="pay-info-label">
            使用
          </div>
          <div class="pay-info-content">{{ payInfo.disparity }}</div>
        </div>
        <tf-image-list
          v-if="payInfo.pic && payInfo.pic.length"
          class="pay-images"
          :data="payInfo.pic"
          :column="5"
          mode="show"
        ></tf-image-list>
      </div>
    </div>
    <div v-if="payInfo.order_status != 2" class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="goPay"
        >缴费</van-button
      >
    </div>
  </div>
</template>

<script>
import { getFeeDetails } from '@/api/butler'
import filters from './filters'
import tfImageList from '@/components/tf-image-list'
export default {
  name: 'livePayCostDetail',
  components: {
    tfImageList
  },
  data () {
    return {
      id: '',
      projectId: '',
      orderId: '',
      isChoicePay: false, // 是否从缴费页面进入
      payInfo: {}
    }
  },
  created () {
    this.orderId = this.$route.query.orderId
    this.id = this.$route.query.id
    this.projectId = this.$route.query.projectId
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
    // 跳转缴费页面
    goPay () {
      if (this.isChoicePay) {
        this.$router.go(-1)
        return
      }
      this.$router.replace({
        name: 'livePayPay',
        query: {
          projectId: this.projectId,
          id: this.id
        }
      })
    },
    // 跳转生活缴费列表页
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 看是否从详情页返回
      vm.isChoicePay = from.name === 'livePayPay'
    })
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
    font-size: 30px;
  }
  .pay-info-container {
    padding: 30px 0;
  }
  .pay-detail {
    width: 100%;
    padding: 0 30px;
    margin-top: 34px;
    background: #ffffff;
    border-radius: 10px;
    .pay-header {
      padding: 30px 0;
      border-bottom: 2px dashed #f0f0f0;
      .pay-number-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pay-number-label {
          font-size: 28px;
        }
        .pay-number {
          font-size: 52px;
          font-weight: 500;
        }
      }
      .penal-sum {
        display: flex;
        justify-content: flex-end;
        font-size: 24px;
        color: #8f8f94;
      }
    }

    .pay-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .pay-info-label {
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
  .pay-images {
    padding: 30px 0 10px;
    margin-top: 25px;
    border-top: 2px dashed #f0f0f0;
  }
}
</style>
