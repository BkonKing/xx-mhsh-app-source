<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="账单"
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
    <div class="bill-info">
      <span class="bill-info-left">水费</span>
      <span class="bill-info-right">
        <span>待缴￥70</span>
        <span>已缴￥530</span>
      </span>
    </div>
    <div class="tf-body-container">
      <refreshList
        class="recordList"
        ref="recordList"
        :list.sync="recordList"
        :load="getRecordList"
      >
        <template v-slot="{ item }">
          <div class="pay-base-info">
            <div class="record-date">
              {{ item.month_name }}
            </div>
            <div class="record-paynum">
              <span>待缴 ￥{{ item.already_money }}</span>
              <span class="tf-ml-sm">已缴 ￥{{ item.already_money }}</span>
            </div>
          </div>
          <div class="pay-list">
            <div
              class="pay-item"
              v-for="(li, i) in item.child"
              :key="i"
              @click="goPayDetail(li)"
            >
              <div class="pay-item-left">￥{{ li.pay_time }}</div>
              <!-- <div class="pay-item-right">￥{{ li.money }}</div> -->
              <div class="pay-item-right-unpay">
                <span class="unpay-tag">未缴</span>￥{{ li.money }}
              </div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
    <div v-if="multiplePayAble" class="tf-padding">
      <van-button v-preventReClick size="large" type="danger" @click="goPay"
        >立即缴费</van-button
      >
    </div>
  </div>
</template>

<script>
import { getPayRecord } from '@/api/butler'
import filters from './filters'
import refreshList from '@/components/tf-refresh-list'
export default {
  name: 'livePayRecord',
  components: {
    refreshList
  },
  data () {
    return {
      costType: '4',
      isMoreUnPay: false,
      recordList: []
    }
  },
  computed: {
    multiplePayAble () {
      return this.costType === '4' && this.isMoreUnPay
    }
  },
  created () {
    // this.costType = this.$router.query.type
  },
  methods: {
    // 获取缴费记录列表
    getRecordList (params) {
      return getPayRecord({
        setmeal_days: this.changeDate
      }).then(({ data, month_data }) => {
        this.monthList = ['全部'].concat(month_data)
        return Promise.resolve({
          data
        })
      })
    },
    // 跳转缴费页面
    goPay () {
      this.$router.push({
        name: 'livePayPay',
        query: {
          projectId: this.projectId,
          id: this.id
        }
      })
    },
    // 跳转账单详情页
    goPayDetail ({ id }) {
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          id
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
  filters,
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'livePayCostDetail') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  }
}
</script>

<style lang="less" scoped>
// 头部信息
.bill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  padding: 0 30px;
  background: #fff;
  &-left {
    font-size: 30px;
    color: #222;
  }
  &-right {
    font-size: 26px;
    color: #8f8f94;
    > span {
      margin-left: 20px;
    }
  }
}
// 列表
.recordList {
  height: calc(100% - 90px);
  padding-top: 40px;
  .pay-base-info {
    margin-left: 12px;
    .record-date {
      font-size: 30px;
      line-height: 1;
      color: #222;
      font-weight: 500;
    }
    .record-paynum {
      display: flex;
      align-items: center;
      margin-top: 14px;
      font-size: 24px;
      line-height: 1;
      color: #8f8f94;
    }
  }
}
// 月份费用列表
.pay-list {
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 10px;
  .pay-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    font-size: 28px;
    &-right {
      display: flex;
      font-size: 34px;
      font-weight: 500;
    }
    &-right-unpay {
      display: flex;
      align-items: center;
      font-size: 34px;
      font-weight: 500;
      color: #eb5841;
    }
    .unpay-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 36px;
      margin-right: 20px;
      font-size: 24px;
      color: #eb5841;
      background: #eb58411a;
      border-radius: 18px;
    }
  }
  .pay-item + .pay-item {
    border-top: 2px solid @divider-color;
  }
}
.tf-ml-sm {
  margin-left: 16px;
}
</style>
