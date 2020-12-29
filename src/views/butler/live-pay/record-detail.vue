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
      <img class="tf-icon" :src="payInfo.icon">
      <div class="pay-title">{{payInfo.genre_name}}</div>
      <div class="pay-detail">
        <div class="pay-number">-￥100</div>
        <div class="pay-info-container">
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费小区
            </div>
            <div class="pay-info-content">{{payInfo.house_property_name}}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费户号
            </div>
            <div class="pay-info-content">{{payInfo.account_numb}}({{payInfo.realname}})</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              账单月份
            </div>
            <div class="pay-info-content">{{payInfo.days_time}}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费属期
            </div>
            <div class="pay-info-content">{{payInfo.time}}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费单号
            </div>
            <div class="pay-info-content">{{payInfo.order_numb}}</div>
          </div>
          <div class="pay-info-box">
            <div class="pay-info-label">
              缴费时间
            </div>
            <div class="pay-info-content">{{payInfo.pay_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPayDetails } from '@/api/butler'
import filters from './filters'
export default {
  name: 'livePayRecordDetail',
  data () {
    return {
      id: '',
      payInfo: {
        type: 0,
        unPayNum: 100,
        penalSum: 10,
        community: 'xx美好生活家园  5栋1单元1001',
        buildingNum: '123456789(*小华)',
        biaohao: '987654321000',
        shuqi: '2020-10-01 ~ 2020-10-31',
        shiyong: '150(单位)',
        yuefen: '2020-10',
        danhao: '54304165401320303',
        shijian: '2020-00-00 00:00:00',
        images: [
          'https://test.tosolomo.com/upload/image/20200822/thumb_300_600_20200822135602_56310.png'
        ]
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getPayDetails()
  },
  methods: {
    getPayDetails () {
      getPayDetails({
        order_id: this.id
      }).then(({ data }) => {
        this.payInfo = data
      })
    }
  },
  filters
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
