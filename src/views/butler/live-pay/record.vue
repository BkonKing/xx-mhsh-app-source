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
    <refreshList :list.sync="recordList" :load="getRecordList">
      <template v-slot="{ item }">
        <tf-date-time-picker
          class="date-time-box"
          type="year-month"
          v-model="item.month_name"
          title="选择时间"
          :max-date="new Date()"
        >
          <template>
            <div class="pay-base-info">
              <div class="record-date">
                {{ item.month_name | dateText }}
                <span class="tf-icon tf-icon-caret-down"></span>
              </div>
              <div class="record-paynum">缴费 ￥{{ item.already_money }}</div>
            </div>
          </template>
        </tf-date-time-picker>
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
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
export default {
  name: 'livePayRecord',
  components: {
    refreshList,
    tfDateTimePicker
  },
  data () {
    return {
      recordList: [],
      date: ''
    }
  },
  methods: {
    // 获取缴费记录列表
    getRecordList (params) {
      return getPayRecord()
      // const len = this.repairList.length
      // const id = len && params.pages !== 1 ? this.repairList[len - 1].id : ''
      // return id
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
  filters
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
