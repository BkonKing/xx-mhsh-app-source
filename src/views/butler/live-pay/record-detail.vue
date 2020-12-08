<template>
  <div class="tf-bg">
    <van-nav-bar
      title="缴费详情"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="pay-record-detail">
      <div class="tf-icon"></div>
      <div class="pay-title">水费</div>
      <div class="pay-detail">
        <div class="pay-number">-￥100</div>
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费小区
            </div>
            <div class="pay-info-content">x美好生活家园 5栋1单元1001</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">123456789(*小华)</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              账单月份
            </div>
            <div class="pay-info-content">2020-10</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费属期
            </div>
            <div class="pay-info-content">2020-10-01 ~ 2020-10-31</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费单号
            </div>
            <div class="pay-info-content">54304165401320303</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费时间
            </div>
            <div class="pay-info-content">2020-00-00 00:00:00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'livePayRecordDetail',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.pay-record-detail {
  @flex-column();
  align-items: center;
  padding: 50px 20px 0;
  .tf-icon {
    font-size: 98px;
  }
  .pay-title {
    font-size: 30px;
    margin-top: 9px;
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
    .pay-number {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 158px;
      font-size: 52px;
      font-weight: 500;
      border-bottom: 2px dashed #f0f0f0;
    }
    .pay-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .pay-info-label {
        font-size: 28px;
        color: #949494;
      }
      .pay-info-content {
        font-size: 28px;
      }
    }
  }
}
</style>
