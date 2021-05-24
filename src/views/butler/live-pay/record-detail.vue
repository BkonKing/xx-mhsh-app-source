<template>
  <div class="tf-bg">
    <van-nav-bar
      :title="`${billName}详情`"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="pay-record-detail">
      <img class="pay-type-icon" :src="payInfo.genre_icon" />
      <div class="pay-title">{{ payInfo.genre_name }}</div>
      <div class="pay-detail">
        <div class="pay-number">
          {{ payInfo.bill_type == 1 ? "+" : "-" }}￥{{ payInfo.money }}
        </div>
        <div class="pay-info-container">
          <div class="pay-info-box" style="align-items: flex-start;">
            <div class="pay-info-label">
              住址信息
            </div>
            <div class="pay-info-content">
              {{payInfo.project_name}} {{ payInfo.house_property_name }}
            </div>
          </div>
          <div class="pay-info-box" v-if="payInfo.account_numb">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">
              {{ payInfo.account_numb }}
            </div>
          </div>
          <div class="pay-info-box" v-if="payInfo.owner_name">
            <div class="pay-info-label">
              <span>户</span>
              <span>主</span>
            </div>
            <div class="pay-info-content">
              {{ payInfo.owner_name | privacyName }}
            </div>
          </div>
          <template v-if="payInfo.bill_type == 2">
            <div class="pay-info-box">
              <div class="pay-info-label">
                账单月份
              </div>
              <div class="pay-info-content">{{ payInfo.days_time }}</div>
            </div>
            <div class="pay-info-box">
              <div class="pay-info-label">
                缴费属期
              </div>
              <div class="pay-info-content">{{ payInfo.setmeal_days }}</div>
            </div>
            <div class="pay-info-box">
              <div class="pay-info-label">
                应缴金额
              </div>
              <div class="pay-info-content">￥{{ payInfo.payable }}</div>
            </div>
            <div class="pay-info-box">
              <div class="pay-info-label">
                实际已缴
              </div>
              <div class="pay-info-content">￥{{ payInfo.paid }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="pay-record-detail">
      <div class="pay-detail">
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">{{ billName }}金额</div>
            <div class="pay-info-content">
              <span
                v-if="payInfo.is_automatic == '1'"
                class="tf-text-sm tf-text-grey"
                >（自动缴费）</span
              >￥{{ payInfo.money }}
            </div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              账户余额
            </div>
            <div class="pay-info-content">￥{{ parseFloat(payInfo.balance) }}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">{{ billName }}单号</div>
            <div class="pay-info-content">{{ payInfo.id_no }}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">{{ billName }}用户</div>
            <div class="pay-info-content">{{ payInfo.realname }} {{payInfo.mobile}}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">{{ billName }}时间</div>
            <div class="pay-info-content">{{ payInfo.pay_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPayLogDetails } from '@/api/butler/livepay'
export default {
  name: 'livePayRecordDetail',
  data () {
    return {
      id: '',
      payInfo: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getPayLogDetails()
  },
  computed: {
    billName () {
      return this.payInfo.bill_type === '1' ? '充值' : '缴费'
    }
  },
  methods: {
    getPayLogDetails () {
      getPayLogDetails({
        pay_log_id: this.id
      }).then(({ data }) => {
        this.payInfo = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pay-record-detail {
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
    margin-top: 9px;
  }
  .pay-info-container {
    padding: 30px 0;
  }
}
.pay-record-detail + .pay-record-detail {
  padding-top: 0;
}
.pay-detail {
  width: 100%;
  padding: 0 30px;
  margin-top: 34px;
  background: #ffffff;
  border-radius: 10px;
  .pay-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 158px;
    font-size: 52px;
    font-weight: 500;
    color: #222;
    border-bottom: 2px dashed #f0f0f0;
  }
  .pay-info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .pay-info-label {
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      width: 112px;
      margin-right: 46px;
      font-size: 28px;
      color: #949494;
    }
    .pay-info-content {
      font-size: 28px;
      color: #222;
      text-align: right;
    }
  }
}
</style>
