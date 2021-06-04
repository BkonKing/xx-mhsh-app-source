<template>
  <div class="date-cont">
    <van-calendar ref="calendar" :show-subtitle="false" v-model="dateShow" :min-date="minDate" :max-date="maxDate" :show-confirm="false" :show-mark="false" :default-date="defaultDate" @confirm="onConfirm">
      <div class="date-header-block" slot="title">
        <div class="date-header tf-row-vertical-center">
          <div class="date-tit">完成时间</div>
          <div @click="close" class="date-close tf-row-vertical-center van-icon van-icon-cross">
          </div>
        </div>
        <div class="time-field tf-row-center">
          <div @click="timeBlur(0)" :class="{'active': timeIndex == 0}"><van-field v-model="startTime" placeholder="开始时间" disabled  /></div>
          <div class="time-hr tf-row-vertical-center"></div>
          <div @click="timeBlur(1)" :class="{'active': timeIndex == 1}"><van-field v-model="endTime" placeholder="结束时间" disabled  /></div>
        </div>
        <div class="tf-row-center opera-block">
          <div @click="prev" class="opera-btn van-icon van-icon-arrow-left"></div>
          <div class="year-month">{{ yearmonth }}</div>
          <div @click="next" class="opera-btn van-icon van-icon-arrow"></div>
        </div>
      </div>
      <div slot="footer">
        <van-datetime-picker
          :show-toolbar="false"
          :visible-item-count="3"
          :item-height="26"
          v-model="currentTime"
          @change="timeChange"
          type="time"
          title="选择时间"
          :min-hour="0"
          :max-hour="23"
        />
        <div class="date-sure">
          <div @click="dateSure" class="task-btn">确定</div>
        </div>
      </div>
    </van-calendar>
  </div>
</template>

<script>
import {
  Calendar,
  DatetimePicker,
  Field,
  Toast
} from 'vant'

export default {
  components: {
    [Calendar.name]: Calendar,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field
  },
  props: {
    value: {
      type: Boolean,
      default: false
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
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2021, 0, 31),
      defaultDate: new Date(),
      yearmonth: '', // 年月
      currentTime: '00:00',
      nowTime: '',
      nowYear: 0,
      nowMonth: 0,
      isBol: false // 是否是点击遮罩层关闭
      // startDay: 0,
      // endDay: 0
    }
  },
  created () {
    // console.log(new Date(2021, 0, 1))
    const nowTime = new Date()
    this.nowTime = nowTime
    this.nowYear = nowTime.getFullYear()
    this.nowMonth = nowTime.getMonth() + 1
    this.getMonthDay()

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
    // 获取选中月份的最小最大日期
    getMonthDay () {
      const firstDay = new Date(this.nowYear, this.nowMonth - 1)
      const lastDay = new Date(new Date(this.nowYear, this.nowMonth).valueOf() - 60 * 60 * 1000 * 24)
      const startDate = firstDay.getFullYear() + '/' + (firstDay.getMonth() + 1) + '/' + firstDay.getDate()
      const endDate = lastDay.getFullYear() + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getDate()
      this.minDate = new Date(startDate)
      this.maxDate = new Date(endDate)
      this.yearmonth = this.nowYear + '年' + this.nowMonth + '月'
      // this.startDay = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate()
      // this.endDay = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate()
      // console.log(this.startDay, this.endDay)
    },
    // 选择了日历
    onConfirm (date) {
      if (this.timeIndex == 0) {
        this.startYmd = this.formatDate(date)
        // console.log('选择了日历', this.startYmd)
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
      if (index == 0) {
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
        const nowTime = new Date(timeVal)
        this.nowTime = nowTime
        this.nowYear = nowTime.getFullYear()
        this.nowMonth = nowTime.getMonth() + 1
        this.getMonthDay()
        const dateArr = timeVal.split(' ')[0].split('-')
        dateArr[1] = dateArr[1] - 1
        // const dateStr = dateArr.join(',')
        console.log(timeVal, dateArr)
        this.defaultDate = new Date(dateArr[0], dateArr[1], dateArr[2])
      }
    },
    // 时间赋值
    setTime () {
      // 修改
      if (this.timeIndex === 0) {
        this.startTime = this.startYmd + ' ' + this.startHi
        // console.log('this.startTime', this.startTime)
      } else {
        this.endTime = this.endYmd + ' ' + this.endHi
      }
    },
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    close () {
      this.dateShow = false
    },
    dateSure () {
      this.isBol = true
      if (this.startTime && !this.endTime) {
        Toast('请选择结束时间')
        return
      } else {
        const now = new Date().getTime()
        const start = this.startTime ? new Date(this.startTime).getTime() : ''
        const end = new Date(this.endTime).getTime()
        if (end < now) {
          Toast('结束时间不能小于当前时间')
          return
        }
        if (start && end < start) {
          Toast('结束时间不能小于开始时间')
          return
        }
      }
      this.$emit('dateSure', { startTime: this.startTime, endTime: this.endTime })
      this.close()
    }
  },
  watch: {
    value (val) {
      this.dateShow = val
    },
    dateShow (val) {
      // console.log('dateShow', val)
      if (this.isBol === false) {
        this.startTime = ''
        this.endTime = ''
      }
      if (val) {
        this.onConfirm(new Date())
      }
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.date-cont {
  .van-popup--bottom.van-popup--round {
    background: #F7F7F7;
    border-radius: 20px 20px 0px 0px;
    height: auto;
  }
  /deep/.van-popup {
    .van-icon.van-popup__close-icon--top-right {
      display: none;
    }
    .van-calendar {
      background: #F7F7F7;
    }
    .van-calendar__header {
      box-shadow: none;
    }
    .van-calendar__month-title {
      display: none;
    }
    .van-calendar__weekdays,.van-calendar__body {
      width: 710px;
      margin: 0 auto;
      background-color: #fff;
    }
    .van-calendar__weekdays {
      height: 40px;
      padding-bottom: 10px;
      span {
        line-height: 40px;
        font-size: 24px;
        font-weight: 400;
        color: #AAAAAA;
      }
    }
    .van-calendar__body {
      margin-bottom: 30px;
      .van-calendar__day {
        height: 62px;
        font-size: 24px;
        font-weight: 400;
        color: #000000;
      }
      .van-calendar__selected-day {
        width: 56px;
        height: 56px;
        background: #FEBF00;
        border-radius: 10px;
        color: #000000;
      }
    }
    .van-picker__columns {
      &::after {
        content: ':';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 36px;
        font-weight: 500;
        color: #000000;
      }
      .van-picker-column:nth-child(1) {
        padding-left: 180px;
      }
      .van-picker-column:nth-child(2) {
        padding-right: 180px;
      }
    }
  }
}
/deep/.van-calendar__header-title {
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
    color: #AAAAAA;
  }
}
.active {
  /deep/.van-field {
    border: 1PX solid #FF6555;
    // box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  }
}
/deep/.time-field {
  height: 88px;
  margin-bottom: 30px;
  .van-field {
    width: 324px;
    height: 88px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .time-hr {
    width: 62px;
    justify-content: center;
    &::after {
      content: '';
      width: 24px;
      height: 2px;
      background: #AAAAAA;
      border-radius: 1px;
    }
  }
  .van-field__body {
    height: 100%;
    .van-field__control {
      text-align: center;
      font-weight: 500;
      color: #000000;
    }
  }
}
.opera-block {
  height: 106px;
  align-items: center;
  width: 710px;
  background: #FFFFFF;
  border-radius: 10px 10px 0 0;
  margin: 0 auto;
  .opera-btn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #EEEEEE;
    border-radius: 50%;
    color: #333333;
    font-size: 24px;
  }
  .year-month {
    width: 208px;
  }
}
.date-sure {
  padding: 30px 0;
}
</style>
