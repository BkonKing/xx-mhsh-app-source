<template>
  <div class="coupon-list">
    <refreshList ref="list" :list.sync="list" :load="getList">
      <template v-slot="{ item }">
        <coupon-item :data="item" :status="status">
          <template v-if="+status === 1">
            <van-button
              v-if="+item.coupon_type === 0"
              class="btn-click"
              @click.stop="goLife"
              >去使用</van-button
            >
            <div
              v-else
              class="tf-icon tf-icon-erweima"
              @click.stop="openQRCode(item.ewm_data)"
            ></div>
          </template>
          <img
            v-else-if="+status == 2"
            class="invalid-icon"
            src="@/assets/personage/used.png"
          />
          <img
            class="invalid-icon"
            v-else
            src="@/assets/personage/out_date.png"
          />
        </coupon-item>
      </template>
      <template v-slot:nodata>
        <div class="no-data-box">
          <img class="no-data-img" src="@/assets/img/empty_coupon.png" />
          <div class="no-data-text">暂无内容</div>
        </div>
      </template>
    </refreshList>
    <van-popup
      v-model="visible"
      class="coupon-qr-popup"
      safe-area-inset-bottom
      get-container="body"
      :close-on-click-overlay="true"
    >
      <span class="van-icon van-icon-close" @click="visible = false"></span>
      <div class="coupon-qr-popup-header">
        <div class="coupon-qr-popup-title">优惠券</div>
        <div class="coupon-qr-popup-name">{{ QRData.coupon_name }}</div>
        <div class="coupon-qr-popup-time">{{ QRData.g_time2 }}</div>
      </div>
      <div class="coupon-qr-popup-content">
        <div class="coupon-qr-popup-shop-name">{{ QRData.shops_name }}</div>
        <div class="coupon-qr-popup-text">（请出示给工作人员进行核销）</div>
        <img class="coupon-qr-popup-img" :src="QRData.url" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import CouponItem from './CouponItem'
import { getCoupon } from '@/api/life'

export default {
  components: {
    refreshList,
    CouponItem
  },
  props: {
    id: [Number, String],
    status: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      list: [],
      QRData: {},
      visible: false,
      activeIndex: ''
    }
  },
  methods: {
    // 获取我的报事报修
    getList (params) {
      return getCoupon({
        page: params.pages,
        c_type: this.status
      })
    },
    // 刷新单条数据
    updateSingleData () {
      if (this.activeIndex !== '' && this.taskId !== '') {
        reUserTask({
          user_task_id: this.taskId
        }).then(({ data }) => {
          this.$set(this.list, this.activeIndex, data)
        })
      }
    },
    openQRCode (data) {
      this.QRData = data
      this.visible = true
    },
    goLife () {
      this.$router.push({
        name: 'life'
      })
    },
    reload () {
      this.$refs.list.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-list {
  height: 100%;
}
.no-data-box {
  .no-data-img {
    width: 100%;
    height: 500px;
  }
  .no-data-text {
    margin-top: 40px;
    font-size: 26px;
    color: #8f8f94;
    line-height: 1;
  }
}
.btn-ing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 56px;
  background: #f7f7f7;
  border-radius: 28px;
  border: none;
  font-size: 24px;
  color: #8f8f94;
}
.btn-click {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  height: 56px;
  padding: 0 24px;
  background: #ff6555;
  border-radius: 28px;
  border: none;
  font-size: 24px;
  color: #fff;
  .tf-icon-xingfubi1 {
    margin-right: 10px;
  }
}
.invalid-icon {
  width: 107px;
}
.tf-icon-erweima {
  font-size: 40px;
  line-height: 1;
}
</style>

<style lang="less">
.coupon-qr-popup {
  width: 560px;
  // height: 811px;
  background: #ffffff;
  border-radius: 10px;
  overflow: initial;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: -70px;
    font-size: 50px;
    color: #fff;
  }
  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 202px;
    padding-top: 30px;
    background: #ff6555;
    border-radius: 10px 10px 0 0;
  }
  &-title {
    margin-bottom: 30px;
    font-size: 28px;
    color: #ffffff;
    line-height: 1;
  }
  &-name {
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    line-height: 1;
  }
  &-time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 56px;
    background: #ffffff33;
    font-size: 24px;
    color: #ffffff;
    line-height: 1;
  }
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 50px;
  }
  &-shop-name {
    padding: 0 90px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    text-align: center;
  }
  &-text {
    margin-bottom: 20px;
    font-size: 24px;
    color: #8f8f94;
  }
  &-img {
    width: 382px;
    height: 382px;
  }
}
</style>
