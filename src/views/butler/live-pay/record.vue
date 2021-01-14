<template>
  <div class="tf-bg">
    <van-nav-bar
      title="缴费记录"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <refreshList ref="recordList" :list.sync="recordList" :load="getRecordList">
      <template v-slot="{ item }">
        <tf-picker
          class="date-time-box"
          v-model="item.month_name"
          title="选择时间"
          :columns="monthList"
          @confirm="handleChange"
        >
          <template v-slot="{ valueText }">
            <div class="pay-base-info">
              <div class="record-date">
                {{ valueText | dateText }}
                <span class="tf-icon tf-icon-caret-down"></span>
              </div>
              <div class="record-paynum">缴费 ￥{{ item.already_money }}</div>
            </div>
          </template>
        </tf-picker>
        <div class="pay-list">
          <div
            class="pay-item"
            v-for="(li, i) in item.child"
            :key="i"
            @click="goPayDetail(li)"
          >
            <div class="pay-item-left">
              <div class="pay-item-title">{{ li.genre_name }}</div>
              <div class="pay-item-time">{{ li.pay_time }}</div>
            </div>
            <div class="pay-item-right">-{{ li.money }}</div>
          </div>
        </div>
      </template>
    </refreshList>
  </div>
</template>

<script>
import { getPayRecord } from '@/api/butler'
import filters from './filters'
import refreshList from '@/components/tf-refresh-list'
import tfPicker from '@/components/tf-picker/index'
export default {
  name: 'livePayRecord',
  components: {
    refreshList,
    tfPicker
  },
  data () {
    return {
      recordList: [],
      date: '',
      changeDate: '', // 暂存改变的月份
      monthList: [] // 缴费月份列表
    }
  },
  methods: {
    // 获取缴费记录列表
    getRecordList (params) {
      return getPayRecord({
        setmeal_days: this.changeDate
      }).then(
        ({ data, month_data }) => {
          this.monthList = month_data
          return Promise.resolve({
            data
          })
        }
      )
    },
    // 列表时间选择重新渲染列表
    handleChange (value) {
      this.changeDate = value
      this.$refs.recordList.reload()
    },
    // 跳转缴费详情页
    goPayDetail ({ id }) {
      this.$router.push({
        name: 'livePayRecordDetail',
        query: {
          id
        }
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
.pay-base-info {
  display: flex;
  justify-content: space-between;
  .record-date {
    font-size: 34px;
    color: #222;
    font-weight: 500;
    margin-left: 16px;
  }
  .record-paynum {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #8f8f94;
  }
}
.pay-list {
  background: #ffffff;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  .pay-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 145px;
    padding: 0 30px;
    &-title {
      font-size: 30px;
    }
    &-time {
      font-size: 24px;
      color: @gray-7;
      margin-top: 10px;
    }
    &-right {
      font-size: 38px;
    }
  }
  .pay-item + .pay-item {
    border-top: 1px solid @divider-color;
  }
}
.date-time-box {
  height: initial !important;
}
</style>
