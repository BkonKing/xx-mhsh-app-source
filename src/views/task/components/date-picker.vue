<template>
  <div v-show="dateShow" class="date-body">
    <van-calendar ref="calendar" :show-subtitle="false" v-model="show" :min-date="minDate" :max-date="maxDate">
      <div class="flex-between" slot="title">
        <div @click="prev">prev</div>
        <div>2021</div>
        <div @click="next">next</div>
      </div>
      <div slot="footer">
        <van-datetime-picker
          :show-toolbar="false"
          :visible-item-count="3"
          v-model="currentTime"
          type="time"
          title="选择时间"
          :min-hour="0"
          :max-hour="23"
        />
      </div>
    </van-calendar>
  </div>
</template>

<script>
import {
  Calendar,
  DatetimePicker
} from 'vant'

export default {
  components: {
    [Calendar.name]: Calendar,
    [DatetimePicker.name]: DatetimePicker
  },
  props: {
    dateShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true,
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 0, 31),
      currentTime: '12:00',
      nowTime: '',
      nowYear: 0,
      nowMonth: 0
      // startDay: 0,
      // endDay: 0
    }
  },
  created () {
    console.log(new Date(2021, 0, 1))
    const nowTime = new Date()
    this.nowTime = nowTime
    this.nowYear = nowTime.getFullYear()
    this.nowMonth = nowTime.getMonth() + 1

    // this.nowMonth = getDate()
  },
  methods: {
    prev () {
      // this.minDate = new Date(2021, 2, 1)
      // this.maxDate = new Date(2021, 2, 31)
      this.nowYear = (this.nowMonth - 1 === 0) ? (this.nowYear - 1) : this.nowYear
      this.nowMonth = (this.nowMonth - 1 === 0) ? 12 : (this.nowMonth - 1)
      console.log(this.nowYear, this.nowMonth, this.nowMonth - 1)
      this.getMonthDay()
      // this.$refs.calendar.reset()
    },
    next () {
      // this.minDate = new Date(2021, 2, 1)
      // this.maxDate = new Date(2021, 2, 31)
      this.nowYear = (this.nowMonth + 1 === 13) ? (this.nowYear + 1) : this.nowYear
      this.nowMonth = (this.nowMonth + 1 === 13) ? 1 : (this.nowMonth + 1)
      console.log(this.nowYear, this.nowMonth, this.nowMonth - 1)
      this.getMonthDay()
      // this.$refs.calendar.reset()
    },
    getMonthDay () {
      const firstDay = new Date(this.nowYear, this.nowMonth - 1)
      const lastDay = new Date(new Date(this.nowYear, this.nowMonth).valueOf() - 60 * 60 * 1000 * 24)
      const startDate = firstDay.getFullYear() + ',' + (firstDay.getMonth() + 1) + ',' + firstDay.getDate()
      const endDate = lastDay.getFullYear() + ',' + (lastDay.getMonth() + 1) + ',' + lastDay.getDate()
      this.minDate = new Date(startDate)
      this.maxDate = new Date(endDate)
      // this.startDay = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate()
      // this.endDay = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate()
      // console.log(this.startDay, this.endDay)
    }
  }
}
</script>

<style lang="less" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
}
</style>
