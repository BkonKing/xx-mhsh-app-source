<template>
  <div class="date-cont">
    <van-calendar
      v-model="dateShow"
      class="tf-date-picker"
      :class="{ 'hidden-calendar': !showCalendar }"
      ref="calendar"
      :show-subtitle="false"
      :min-date="minDate"
      :max-date="maxDate"
      :show-confirm="false"
      :show-mark="false"
      :default-date="defaultDate"
      get-container="body"
      @confirm="onConfirm"
    >
      <div class="date-header-block" slot="title">
        <div class="date-header tf-row-vertical-center">
          <div class="date-tit">{{ title }}</div>
          <div
            class="date-close tf-row-vertical-center van-icon van-icon-cross"
            @click="close"
          ></div>
        </div>
        <div class="date-header-slot"><slot></slot></div>
        <div v-show="showCalendar" class="time-field tf-row-center">
          <div @click="timeBlur(0)" :class="{ active: timeIndex == 0 }">
            <van-field v-model="startTime" placeholder="开始时间" disabled />
          </div>
          <div class="time-hr tf-row-vertical-center"></div>
          <div @click="timeBlur(1)" :class="{ active: timeIndex == 1 }">
            <van-field v-model="endTime" placeholder="结束时间" disabled />
          </div>
        </div>
        <div v-show="showCalendar" class="opera-block">
          <div
            @click="prev"
            class="opera-btn van-icon van-icon-arrow-left"
          ></div>
          <div class="year-month">{{ yearMonth }}</div>
          <div @click="next" class="opera-btn van-icon van-icon-arrow"></div>
        </div>
      </div>
      <div slot="footer">
        <van-datetime-picker
          v-show="showCalendar"
          v-model="currentTime"
          :show-toolbar="false"
          :visible-item-count="3"
          :item-height="32"
          :min-hour="0"
          :max-hour="23"
          type="time"
          title="选择时间"
          @change="timeChange"
        />
        <div class="date-sure">
          <van-button v-preventReClick @click="dateSure" class="task-btn"
            >确定</van-button
          >
        </div>
      </div>
    </van-calendar>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { Calendar } from 'vant'

export default {
  components: {
    [Calendar.name]: Calendar
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      default: ''
    },
    showCalendar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dateShow: this.value,
      timeIndex: 0, // 0开始日期 1结束日期
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      startYmd: '', // 开始时间（年月日）
      endYmd: '', // 结束时间（年月日）
      startHi: '00:00', // 开始时间（时分）
      endHi: '00:00', // 结束时间（时分）
      minDate: new Date(), // 通过最小最大日期每次值显示当前月份
      maxDate: new Date(),
      defaultDate: new Date(),
      currentTime: '00:00',
      nowTime: '',
      nowYear: 0,
      nowMonth: 0,
      isBol: false, // 是否是点击遮罩层关闭
      // startDay: 0,
      // endDay: 0
      hasStartTime: false,
      hasEndTime: false,
      noStartTime: false,
      noEndTime: false
    }
  },
  computed: {
    // 年月
    yearMonth () {
      return `${this.nowYear}年${this.nowMonth}月`
    }
  },
  created () {
    const nowTime = new Date()
    this.nowTime = nowTime
    this.nowYear = nowTime.getFullYear()
    this.nowMonth = nowTime.getMonth() + 1
    this.getMonthDay()
  },
  methods: {
    // 获取选中月份的最小最大日期
    getMonthDay () {
      const minDate = dayjs(`${this.nowYear}${this.nowMonth}`)
        .startOf('month')
        .valueOf()
      const maxDate = dayjs(`${this.nowYear}${this.nowMonth}`)
        .endOf('month')
        .valueOf()
      this.minDate = new Date(minDate)
      this.maxDate = new Date(maxDate)
    },
    prev () {
      this.nowYear = this.nowMonth - 1 === 0 ? this.nowYear - 1 : this.nowYear
      this.nowMonth = this.nowMonth - 1 === 0 ? 12 : this.nowMonth - 1
      this.getMonthDay()
    },
    next () {
      this.nowYear = this.nowMonth + 1 === 13 ? this.nowYear + 1 : this.nowYear
      this.nowMonth = this.nowMonth + 1 === 13 ? 1 : this.nowMonth + 1
      this.getMonthDay()
    },
    // 选择了日历
    onConfirm (date) {
      if (this.timeIndex === 0) {
        this.startYmd = this.formatDate(date)
      } else {
        this.endYmd = this.formatDate(date)
      }
      this.setTime()
    },
    // 选择了时间
    timeChange (picker) {
      if (this.timeIndex === 0) {
        this.startHi = this.currentTime
        if (this.startYmd) this.setTime()
      } else {
        this.endHi = this.currentTime
        if (this.endYmd) this.setTime()
      }
    },
    // 点击时间输入框
    timeBlur (index) {
      this.timeIndex = index
      let timeVal = ''
      if (index === 0) {
        this.currentTime = this.startHi
        if (this.startTime) {
          timeVal = this.startTime
        }
      } else {
        this.currentTime = this.endHi
        if (this.endTime) {
          timeVal = this.endTime
        }
      }
      if (timeVal) {
        const nowTime = new Date(this.iosFormatDate(timeVal))
        this.nowTime = nowTime
        this.nowYear = nowTime.getFullYear()
        this.nowMonth = nowTime.getMonth() + 1
        this.getMonthDay()
        const dateArr = timeVal.split(' ')[0].split('-')
        dateArr[1] = parseFloat(dateArr[1]) - 1
        this.defaultDate = new Date(dateArr[0], dateArr[1], dateArr[2])
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.calendar.reset()
          }, 0)
        })
      }
    },
    // 时间赋值
    setTime () {
      // 修改
      if (this.timeIndex === 0) {
        this.startTime = this.startYmd + ' ' + this.startHi
      } else {
        this.endTime = this.endYmd + ' ' + this.endHi
      }
    },
    setDetailTime (date) {
      if (!date) {
        this.setEndTime('')
        this.setStartTime('')
        return
      }
      const dates = date.split('~')
      let startTime, endTime
      if (dates.length === 2) {
        startTime = dates[0]
        endTime = dates[1]
      } else {
        endTime = dates[0]
      }
      this.setEndTime(endTime)
      this.setStartTime(startTime)
    },
    setEndTime (endTime) {
      this.endTime = endTime
      this.hasEndTime = true
      this.endYmd = endTime.split(' ')[0] || ''
      this.endHi = endTime.split(' ')[1] || '00:00'
    },
    setStartTime (startTime) {
      this.startTime = startTime
      this.hasStartTime = true
      this.startYmd = startTime.split(' ')[0] || ''
      this.startHi = startTime.split(' ')[1] || '00:00'
    },
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    iosFormatDate (date) {
      return date.replace(/-/g, '/')
    },
    setToday () {
      const date = new Date()
      const el = this.$refs.calendar && this.$refs.calendar.$el
      if (!this.dateShow) {
        return
      }
      if (dayjs(`${this.nowYear}${this.nowMonth}`).isSame(date, 'month')) {
        this.$nextTick(() => {
          setTimeout(() => {
            let dayDom = el.getElementsByClassName('van-calendar__day')
            dayDom = Array.from(dayDom)
            const dom = dayDom.find(ele => {
              return +ele.innerText === date.getDate()
            })
            dom.classList.add('nowDateClass')
          }, 0)
        })
      } else {
        const dom = el.getElementsByClassName('nowDateClass')
        dom.length && dom[0].classList.remove('nowDateClass')
      }
    },
    close () {
      this.dateShow = false
    },
    dateSure () {
      this.isBol = true
      if (this.showCalendar) {
        if (!this.startTime) {
          this.$toast('请选择开始时间')
          return
        } else if (!this.endTime) {
          this.$toast('请选择结束时间')
          return
        } else {
          const now = new Date().getTime()
          const start = this.startTime
            ? new Date(this.iosFormatDate(this.startTime)).getTime()
            : 0
          const end = new Date(this.iosFormatDate(this.endTime)).getTime()
          if (end < now) {
            this.$toast('结束时间不能小于当前时间')
            return
          }
          if (start && end < start) {
            this.$toast('结束时间不能小于开始时间')
            return
          }
        }
        if (this.startTime === '') {
          this.noStartTime = true
        }
        if (this.endTime === '') {
          this.noEndTime = true
        }
      }
      this.$emit('dateSure', {
        startTime: this.startTime,
        endTime: this.endTime
      })
      this.autoClose && this.close()
    }
  },
  watch: {
    value (val) {
      if (this.dateShow !== val) {
        setTimeout(() => {
          this.setToday()
          this.setDetailTime(this.data)
          this.timeBlur(0)
        }, 0)
      }
      this.dateShow = val
    },
    dateShow (val) {
      this.$emit('input', val)
    },
    yearMonth () {
      this.setToday()
    }
  }
}
</script>

<style lang="less">
.tf-date-picker {
  .nowDateClass {
    position: relative;
    z-index: 0;
    &::after {
      content: "";
      width: 56px;
      height: 56px;
      position: absolute;
      z-index: -1;
      background: #eeeeee;
      border-radius: 10px;
    }
  }
  &.van-popup--bottom.van-popup--round {
    background: #f7f7f7;
    border-radius: 20px 20px 0px 0px;
    height: auto;
  }
  &.van-popup {
    .van-icon.van-popup__close-icon--top-right {
      display: none;
    }
    .van-calendar {
      background: #f7f7f7;
    }
    .van-calendar__header {
      box-shadow: none;
    }
    .van-calendar__month-title {
      display: none;
    }
    .van-calendar__weekdays,
    .van-calendar__body,
    .date-header-slot {
      width: 710px;
      margin: 0 auto;
      background-color: #fff;
    }
    .van-calendar__weekdays {
      height: 44px;
      padding: 0 10px 14px;
      span {
        line-height: 40px;
        font-size: 24px;
        font-weight: 400;
        color: #aaaaaa;
      }
    }
    .van-calendar__body {
      margin-bottom: 30px;
      .van-calendar__days {
        padding: 0 10px 22px;
      }
      .van-calendar__day {
        height: 64px;
        font-size: 24px;
        font-weight: 400;
        line-height: 1;
        color: #000000;
      }
      .van-calendar__selected-day {
        width: 56px;
        height: 56px;
        background: #febf00;
        border-radius: 10px;
        line-height: 1;
        color: #000000;
      }
    }
    .van-picker__columns {
      &::after {
        content: ":";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 36px;
        font-weight: 500;
        color: #000000;
      }
      .van-picker-column__item {
        font-size: 36px;
      }
      .van-picker-column:nth-child(1) {
        padding-left: 180px;
      }
      .van-picker-column:nth-child(2) {
        padding-right: 180px;
      }
    }
  }
  .van-calendar__header-title {
    height: auto;
  }
  .date-header-block {
    height: auto;
  }
  .date-header {
    height: 90px;
    line-height: 90px;
    .date-tit {
      font-size: 32px;
      font-weight: 500;
      color: #000000;
      flex-grow: 1;
      text-align: center;
      padding-left: 76px;
    }
    .date-close {
      width: 50px;
      height: 50px;
      padding: 10px;
      margin-right: 26px;
      font-size: 40px;
      justify-content: center;
      color: #aaaaaa;
    }
  }
  .active {
    .van-field {
      border: 1px solid #ff6555;
      // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    }
  }
  .time-field {
    height: 88px;
    margin-bottom: 30px;
    .van-field {
      width: 324px;
      height: 88px;
      background: #ffffff;
      border-radius: 10px;
    }
    .time-hr {
      width: 62px;
      justify-content: center;
      &::after {
        content: "";
        width: 24px;
        height: 2px;
        background: #aaaaaa;
        border-radius: 1px;
      }
    }
    .van-field__body {
      height: 100%;
      .van-field__control {
        text-align: center;
        font-weight: bold;
        line-height: 1;
        color: #000000;
        &::placeholder {
          font-weight: 400;
        }
      }
    }
  }
  .opera-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 710px;
    height: 116px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    .opera-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      line-height: 1;
      text-align: center;
      background: #eeeeee;
      border-radius: 50%;
      font-size: 24px;
      color: #333333;
    }
    .year-month {
      width: 208px;
      line-height: 1;
    }
  }
  .date-sure {
    padding: 30px 0;
  }

  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
}
.tf-date-picker.hidden-calendar {
  .van-calendar__days,
  .van-calendar__weekdays {
    display: none;
  }
  .van-calendar__body {
    margin-bottom: 0 !important;
  }
}
</style>
