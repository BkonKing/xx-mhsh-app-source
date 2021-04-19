<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="账单详情"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container pay-cost-detail">
      <img class="pay-type-icon" :src="payInfo.icon" />
      <div class="pay-title">{{ payInfo.genre_name }}</div>
      <div class="pay-detail">
        <div class="pay-header">
          <div class="pay-number-box">
            <div class="pay-number-label">应交金额</div>
            <div class="pay-number">
              ￥{{ payInfo.money }}
              <span v-if="payInfo.violations_money" class="penal-sum">
                (含违约金{{ payInfo.violations_money }}元)
              </span>
            </div>
          </div>
          <div v-if="payInfo.pay_money && payInfo.qf_money" class="pay-money-info">
            <span>已缴{{payInfo.pay_money}}元</span>
            <span>待缴{{payInfo.qf_money}}元</span>
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
            <div class="pay-info-label"><span>户</span><span>主</span></div>
            <div class="pay-info-content">
              {{ payInfo.realname | privacyName}}
            </div>
          </div>
        </div>
      </div>
      <div class="pay-detail pay-padding">
        <div class="pay-info-box" v-if="['1','2'].includes(payInfo.genre_id) && payInfo.surface">
          <div class="pay-info-label"><span>表</span><span>号</span></div>
          <div class="pay-info-content">{{ payInfo.surface }}</div>
        </div>
        <div class="pay-info-box">
          <div class="pay-info-label"><span>属</span><span>期</span></div>
          <div class="pay-info-content">{{ payInfo.time }}</div>
        </div>
        <div class="pay-info-box" v-if="payInfo.disparity">
          <div class="pay-info-label"><span>使</span><span>用</span></div>
          <div class="pay-info-content">{{ payInfo.disparity }}</div>
        </div>
        <div v-if="payInfo.pic && payInfo.pic.length" class="pay-images">
          <tf-image-list
            :data="payInfo.pic"
            :column="6"
            :gutter="5"
            mode="show"
          ></tf-image-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFeeDetails } from '@/api/butler/livepay'
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
      payInfo: {
        order_status: 2
      }
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
      padding: 30px 0;
      border-bottom: 2px dashed #f0f0f0;
      .pay-number-box {
        display: flex;
        align-items: center;
        .pay-number-label {
          margin-right: 46px;
          font-size: 28px;
        }
        .pay-number {
          font-size: 52px;
          font-weight: 500;
          line-height: 1;
        }
      }
      .penal-sum {
        font-size: 24px;
        color: #8f8f94;
      }
      .pay-money-info {
        margin-top: 8px;
        margin-left: 160px;
        font-size: 24px;
        color: @primary;
        span {
          margin-right: 16px;
        }
      }
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
  .pay-images {
    padding: 38px 0 10px;
    margin-top: 25px;
    border-top: 2px dashed #f0f0f0;
  }
}
</style>
