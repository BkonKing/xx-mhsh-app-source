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
      <div class="tf-icon"></div>
      <div class="pay-title">水费</div>
      <div class="pay-detail">
        <div class="pay-header">
          <div class="pay-number-box">
            <div class="pay-number-label">应交金额</div>
            <div class="pay-number">100.00</div>
          </div>
          <div class="penal-sum">(含违约金10.00元)</div>
        </div>
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
        </div>
      </div>
      <div class="pay-detail pay-padding">
        <div class="pay-info-box">
          <div class="pay-info-label">
            表号
          </div>
          <div class="pay-info-content">987654321000</div>
        </div>
        <div class="pay-info-box">
          <div class="pay-info-label">
            属期
          </div>
          <div class="pay-info-content">2020-10-01 ~ 2020-10-31</div>
        </div>
        <div class="pay-info-box">
          <div class="pay-info-label">
            使用
          </div>
          <div class="pay-info-content">150(单位)</div>
        </div>
        <tf-image-list
          v-if="images.length"
          class="pay-images"
          :data="images"
          :column="5"
          mode="show"
        ></tf-image-list>
      </div>
    </div>
    <div class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="goPay"
        >缴费</van-button
      >
    </div>
  </div>
</template>

<script>
import { NavBar, Button } from 'vant'
import tfImageList from '@/components/tf-image-list'
export default {
  name: 'livePayCostDetail',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    tfImageList
  },
  data () {
    return {
      images: [
        'https://test.tosolomo.com/upload/image/20200822/thumb_300_600_20200822135602_56310.png'
      ]
    }
  },
  methods: {
    // 跳转生活缴费列表页
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pay-cost-detail {
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
