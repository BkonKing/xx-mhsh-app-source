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
      <span class="bill-info-left">{{genreName}}</span>
      <span class="bill-info-right">
        <span v-if="qfMoney">待缴￥{{qfMoney}}</span>
        <span v-if="yjMoney">已缴￥{{yjMoney}}</span>
      </span>
    </div>
    <div class="tf-body-container">
      <refreshList
        class="recordList"
        id="billList"
        :list.sync="recordList"
        :load="getGenreBillList"
      >
        <template v-slot="{ item }">
          <div class="pay-base-info">
            <div class="record-date">
              {{ item.name }}
            </div>
            <div class="record-paynum">
              <span v-if="item.z_qf_money" class="tf-mr-sm">待缴 ￥{{ item.z_qf_money }}</span>
              <span v-if="item.z_yj_money" class="tf-mr-sm">已缴 ￥{{ item.z_yj_money }}</span>
            </div>
          </div>
          <div class="pay-list">
            <div
              class="pay-item"
              v-for="(li, i) in item.child"
              :key="i"
              @click="goPayDetail(li)"
            >
              <div class="pay-item-left">{{ li.name }}</div>
              <div v-if="li.order_status == 2" class="pay-item-right">￥{{ li.pay_money }}</div>
              <div v-else class="pay-item-right-unpay">
                <span class="unpay-tag">未缴</span>￥{{ li.qf_money }}
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
import { getGenreBillList } from '@/api/butler/livepay'
import filters from './filters'
import refreshList from '@/components/tf-refresh-list'
export default {
  name: 'livePayPayBill',
  components: {
    refreshList
  },
  data () {
    return {
      houseId: '',
      projectId: '',
      genreType: '', // 费用类别
      genreName: '', // 类别名称
      qfMoney: 0, // 欠费金额
      yjMoney: 0, // 已缴金额
      qfCount: 0, // 欠费类别数量
      recordList: [],
      scrollTop: 0
    }
  },
  computed: {
    multiplePayAble () {
      return this.genreType === 4 && this.qfCount > 1
    }
  },
  created () {
    this.genreType = parseInt(this.$route.query.genreType)
    this.houseId = this.$route.query.houseId
    this.projectId = this.$route.query.projectId
  },
  activated () {
    this.scrollTop && (document.getElementById('billList').scrollTop = this.scrollTop)
  },
  methods: {
    // 获取缴费记录列表
    getGenreBillList (params) {
      return getGenreBillList({
        genre_type: this.genreType,
        project_id: this.projectId,
        expenses_house_id: this.houseId
      }).then(({ data }) => {
        this.genreName = data.genre_name
        this.qfMoney = data.zz_qf_money
        this.yjMoney = data.zz_yj_money
        this.qfCount = data.qf_count
        return Promise.resolve({
          data: data.list
        })
      })
    },
    // 跳转其他页面缴费页面
    goPay () {
      this.$router.push({
        name: 'livePayPay',
        query: {
          projectId: this.projectId,
          houseId: this.houseId
        }
      })
    },
    // 跳转账单详情页
    goPayDetail ({ id }) {
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          orderId: id
        }
      })
    },
    // 跳转生活缴费列表页
    goLivePayList () {
      this.$router.push({
        name: 'livePayRecord',
        query: {
          houseId: this.houseId
        }
      })
    }
  },
  filters,
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.getElementById('billList').scrollTop
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
      .tf-mr-sm {
        margin-right: 20px;
      }
    }
  }
}
// 月份费用列表
.pay-list {
  margin-top: 30px;
  margin-bottom: 20px;
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
