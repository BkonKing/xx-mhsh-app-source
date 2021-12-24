<template>
  <div class="coupon-list">
    <refreshList ref="list" :list.sync="list" :load="getList" row-key="id">
      <template v-slot="{ item, index }">
        <!-- <coupon-item :data="item"></coupon-item> -->
        <coupon-item
          :data="item"
          :isCoupon="isCoupon"
          @publish="openPublish(item, index)"
          @delete="openDelete(item, index)"
          @finish="openFinish(item, index)"
          @revise="goCreateCoupon(item, index, '1')"
          @look="goCreateCoupon(item, index, '2')"
          @copy="goCreateCoupon(item, index, '3')"
        ></coupon-item>
      </template>
      <template v-slot:nodata>
        <div class="no-data-box">
          <img class="no-data-img" src="@/assets/neighbours/notask.png" />
          <div class="no-data-text">暂无内容</div>
        </div>
      </template>
    </refreshList>
    <date-picker
      v-model="dateVisible"
      ref="date-picker"
      title="发布优惠券"
      :show-calendar="release_type === '2'"
      :auto-close="false"
      @dateSure="publish"
    >
      <van-field class="date-radio" name="radio" label="发布时间：">
        <template #input>
          <van-radio-group
            v-model="release_type"
            direction="horizontal"
            checked-color="#FF6555"
          >
            <van-radio name="1">立即发布</van-radio>
            <van-radio name="2">定时发布</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </date-picker>
    <tf-dialog-v3
      v-model="deleteVisible"
      content="确定删除优惠券吗？"
      confirmButtonText="删除"
      @confirm="deleteCoupon"
    ></tf-dialog-v3>
    <tf-dialog-v3
      v-model="finishVisible"
      title="确定结束优惠券吗？"
      content="结束后将停止领取该券，但已被领取的优惠券可继续使用"
      confirmButtonText="结束"
      @confirm="finishCoupon"
    ></tf-dialog-v3>
  </div>
</template>

<script>
import refreshList from '@/components/tf-refresh-list'
import TfDialogV3 from '@/components/tf-dialog-v3'
import CouponItem from './CouponItem'
import DatePicker from './DatePicker'
import {
  getShopCouponList,
  updateCouponInfo,
  publishCoupon,
  finishCoupon,
  deleteCoupon
} from '@/api/personage/shop'

export default {
  components: {
    refreshList,
    TfDialogV3,
    CouponItem,
    DatePicker
  },
  props: {
    id: [Number, String],
    status: {
      type: [Number, String],
      default: ''
    },
    isCoupon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      shopId: '',
      couponId: '',
      activeIndex: '',
      deleteVisible: false,
      finishVisible: false,
      dateVisible: false,
      release_type: '1'
    }
  },
  created () {
    this.shopId = this.$route.query.shopId
  },
  activated () {
    this.updateSingleData()
  },
  methods: {
    // 获取我的报事报修
    getList (params) {
      return getShopCouponList({
        page: params.pages,
        coupon_status: this.status,
        shops_id: this.shopId
      })
    },
    // 刷新单条数据
    updateSingleData () {
      if (+this.status) {
        this.list.splice(this.activeIndex, 1)
        return
      }
      if (this.activeIndex !== '' && +this.couponId) {
        updateCouponInfo({
          shops_coupon_id: this.couponId
        }).then(({ data }) => {
          this.$set(this.list, this.activeIndex, data)
        })
      }
    },
    reload () {
      this.$refs.list.reload()
    },
    goCreateCoupon ({ id }, index, type) {
      this.activeIndex = index
      this.$router.push({
        name: 'shopCreateCoupon',
        query: {
          shopId: this.shopId,
          couponId: id,
          type // 1：修改，2：查看，3：复制
        }
      })
    },
    openPublish ({ id }, index) {
      this.release_type = '1'
      this.couponId = id
      this.activeIndex = index
      this.dateVisible = true
    },
    async publish (data) {
      const { startTime, endTime } = data
      if (this.release_type === '2') {
        if (!startTime) {
          this.$toast('请选择开始时间')
          return
        }
        if (!endTime) {
          this.$toast('请选择结束时间')
          return
        }
      }
      const { success } = await publishCoupon({
        shops_coupon_id: this.couponId,
        release_type: this.release_type,
        plan_stime: startTime,
        plan_etime: endTime
      })
      if (success) {
        this.dateVisible = false
        this.$toast('发布成功')
        this.updateSingleData()
      }
    },
    openDelete ({ id }, index) {
      this.couponId = id
      this.activeIndex = index
      this.deleteVisible = true
    },
    async deleteCoupon () {
      const { success } = await deleteCoupon({
        shops_coupon_id: this.couponId
      })
      if (success) {
        this.deleteVisible = false
        this.$toast('优惠券已删除')
        this.list.splice(this.activeIndex, 1)
      }
    },
    openFinish ({ id }, index) {
      this.couponId = id
      this.activeIndex = index
      this.finishVisible = true
    },
    async finishCoupon () {
      const { success } = await finishCoupon({
        shops_coupon_id: this.couponId
      })
      if (success) {
        this.finishVisible = false
        this.$toast('优惠券已结束')
        this.updateSingleData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-list {
  height: 100%;
}
.date-radio {
  padding: 30px 0 42px;
  background: #f7f7f7;
  /deep/ .van-radio__icon--checked + .van-radio__label {
    color: #000000;
  }
  /deep/ .van-icon {
    width: 36px;
    height: 36px;
    line-height: 1;
  }
  /deep/ .van-radio__icon {
    height: 36px;
  }
  /deep/ .van-radio__label {
    margin-left: 20px;
    color: #222;
    line-height: 1;
  }
  /deep/ .van-field__value .van-field__control {
    justify-content: flex-end;
  }
  /deep/ .van-radio--horizontal {
    margin-right: 30px;
    + .van-radio--horizontal {
      margin-left: 40px;
    }
  }
}
</style>
