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
    <!-- <refreshList :list.sync="recordList" :load="getRecordList">
      <template v-slot="{ item }"> -->
    <div class="tf-padding">
      <tf-date-time-picker
        class="date-time-box"
        type="year-month"
        v-model="date"
        title="选择时间"
        :max-date="new Date()"
      >
        <template>
          <div class="pay-base-info">
            <div class="record-date">
              {{ date || "选择日期时间" }}
              <span class="tf-icon tf-icon-caret-down"></span>
            </div>
            <div class="record-paynum">缴费 ￥120</div>
          </div>
        </template>
      </tf-date-time-picker>
      <div class="pay-list">
        <div class="pay-item" @click="goPayDetail">
          <div class="pay-item-left">
            <div class="pay-item-title">水费</div>
            <div class="pay-item-time">2020-06-06 12:12:12</div>
          </div>
          <div class="pay-item-right">-100</div>
        </div>
        <div class="pay-item">
          <div class="pay-item-left">
            <div class="pay-item-title">水费</div>
            <div class="pay-item-time">2020-06-06 12:12:12</div>
          </div>
          <div class="pay-item-right">-100</div>
        </div>
      </div>
    </div>
    <!-- </template>
    </refreshList> -->
  </div>
</template>

<script>
import { NavBar } from 'vant'
import refreshList from '@/components/tf-refresh-list'
import tfDateTimePicker from '@/components/tf-date-time-picker/index'
export default {
  name: 'livePayRecord',
  components: {
    [NavBar.name]: NavBar,
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
      const len = this.repairList.length
      const id = len && params.pages !== 1 ? this.repairList[len - 1].id : ''
      return id
    },
    // 跳转缴费详情页
    goPayDetail () {
      this.$router.push({
        name: ''
      })
    }
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
    font-weight: 600;
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
</style>
