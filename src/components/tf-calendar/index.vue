<template>
  <!-- 签到start -->
  <div v-show="value" class="calendar-mask-container sign-mask" catchtouchmove="true">
    <div class="calendar-mask-block" @click="toggleFunc"></div>
    <div class="sign-mask-block" style="position: relative;z-index: 1000;">
      <div class="sign-block" data-show="show">
        <div class="mask-header">
          <div class="calendar-mask-tit">签到</div>
          <div class="mask-icon mask-icon-left"></div>
          <div class="mask-icon mask-icon-right"></div>
        </div>
        <div class="sign-cont">
          <div class="mask-bar">
            <div
              class="bar-btn bar-prev tf-icon tf-icon-caret-left"
              @click.stop="handlePrev"
              data-handle="prev"
            ></div>
            <div class="bar-month">{{curYear}}年{{curMonth}}月</div>
            <template v-if="year!=curYear || month!=curMonth">
              <div
                class="bar-btn bar-next tf-icon tf-icon-caret-right"
                @click.stop="handleNext"
                data-handle="next"
              ></div>
            </template>
            <template v-else>
              <div class="bar-btn bar-next"></div>
            </template>
          </div>
          <div class="mask-week">
            <div class="week-day">日</div>
            <div class="week-day">一</div>
            <div class="week-day">二</div>
            <div class="week-day">三</div>
            <div class="week-day">四</div>
            <div class="week-day">五</div>
            <div class="week-day">六</div>
          </div>
          <div class="mask-days">
            <template>
              <div
                v-for="(item,index) in data"
                :key="index"
                :class="['date-num',item.is_prev||item.is_next ? 'gray-month' : '',item.is_sign ? 'days-sign' : '',item.is_start ? 'start-sign' : '',item.is_end ? 'end-sign' : '',item.is_start&&item.is_end ? 'only-sign':'']"
              >{{item.date}}</div>
            </template>
          </div>
        </div>
      </div>
      <div class="mask-close-block">
        <span class="tf-icon tf-icon-guanbi1" @click="toggleFunc"></span>
      </div>
    </div>
  </div>
  <!-- 签到end -->
</template>

<script>
import { signinCalendar } from '@/api/personage'
export default {
  name: 'tf-calendar',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      year: 2020, // 当天的年份
      month: 7, // 当天的月份
      curYear: 0,
      curMonth: 0,
      data: []
    }
  },
  created () {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth() + 1
    this.curYear = date.getFullYear()
    this.curMonth = date.getMonth() + 1
    this.signinCalendar()
  },
  methods: {
    /* 签到日历数据 */
    signinCalendar () {
      signinCalendar({
        year: this.curYear,
        month: this.curMonth
      }).then((res) => {
        this.data = res.data.calendar
      })
    },
    toggleFunc () {
      this.$emit('input', !this.value)
    },
    handleCalendar () {
      this.$emit('input', false)
    },
    handlePrev () {
      if (this.curMonth > 1) {
        this.curMonth--
      } else {
        this.curYear--
        this.curMonth = 12
      }
      this.signinCalendar()
    },
    handleNext () {
      if (this.curMonth < 12) {
        this.curMonth++
      } else {
        this.curYear++
        this.curMonth = 1
      }
      this.signinCalendar()
    },
    /**
     * 日历
     */
    DayNumOfMonth: function (year, month) {
      var oldmonth = month // 原参数
      var dys_array = []
      month--
      var d = new Date(year, month, 1) // 获取当月1号的时间
      d.setDate(d.getDate() + 32 - d.getDate())
      var days = 32 - d.getDate() // 计算当月有多少天
      var new_d = new Date(year, month, 1) // 重新获取当月1号的时间
      // var get_s_w = new_d.getDay();
      var get_week = new_d.getDay() // 重新获取当月1号星期几
      if (get_week > 0) {
        // 如果大于0，那么要取出上个月最后的几天
        var s_month = month - 1
        var s_ds = new Date(year, s_month, 1) // 获取上个月1号的时间
        s_ds.setDate(s_ds.getDate() + 32 - s_ds.getDate())
        var s_days = 32 - s_ds.getDate() // 计算上个月有多少天

        var start_dys = s_days - get_week + 1 // 需要从上个月哪一号开始补
        for (var i = start_dys; i <= s_days; i++) {
          // dys_array.push(i);
          dys_array.push({
            date: i,
            is_prev: true,
            is_next: false,
            is_start: false,
            is_end: false,
            is_sign: false
          })
        }
      }
      for (var n = 1; n <= days; n++) {
        // 当月的所有天数
        dys_array.push({
          date: n,
          is_prev: false,
          is_next: false,
          is_start: false,
          is_end: false,
          is_sign: false
        })
      }
      var e_ds = new Date(year, month, days) // 当月的最后一天
      var get_e_week = e_ds.getDay() // 当月的最后一天星期几
      var s_mot = 6 - parseInt(get_e_week) // 计算还需补充下一个月的天数
      if (s_mot) {
        for (var t = 1; t <= s_mot; t++) {
          dys_array.push({
            date: t,
            is_prev: false,
            is_next: true,
            is_start: false,
            is_end: false,
            is_sign: false
          })
        }
      }
      console.log(dys_array)
      this.setData({
        sign_arr: dys_array
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* 日历 start */
.calendar-mask-container {
  position: fixed;
  @flex();
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.calendar-mask-block {
  position: fixed;
  @flex();
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.mask-close-block {
  height: 120px;
  padding-top: 30px;
  @flex();
  justify-content: center;
  align-items: center;
  color: #fff;
  .tf-icon {
    font-size: 40px;
  }
}
.sign-block {
  width: 624px;
  // min-height: 784px;
  border-radius: 10px;
}
.sign-cont {
  padding: 30px 0;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tf-icon-guanbi-circle {
  font-size: 50px;
  color: #fff;
}
.mask-header {
  height: 140px;
  position: relative;
}
.calendar-mask-tit {
  height: 98px;
  line-height: 98px;
  font-size: 34px;
  color: #fff;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-image: -webkit-linear-gradient(to right, @orange, @orange-dark);
  background-image: linear-gradient(to right, @orange, @orange-dark);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.mask-icon {
  position: absolute;
  top: 0;
  width: 24px;
  height: 80px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.mask-icon-left {
  left: 80px;
}
.mask-icon-right {
  right: 80px;
}
.mask-bar {
  @flex();
  width: 570px;
  height: 60px;
  background-color: @divider-color;
  border-radius: 30px;
  margin: 0 0 0 30px;
  justify-content: space-between;
}
.bar-btn {
  width: 70px;
  height: 60px;
  position: relative;
  line-height: 60px;
  text-align: center;
  color: @gray-6;
}
.bar-month {
  width: 216px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color: @text-color;
}
.mask-week {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
.week-day {
  width: 82px;
  text-align: center;
  line-height: 80px;
  font-size: 22px;
  color: @gray-7;
}
.mask-days {
  width: 574px;
  margin-left: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  // margin-bottom: 60px;
}
.date-num {
  width: 82px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-bottom: 25px;
  color: @text-color;
  font-size: 24px;
}
.only-sign {
  width: 36px;
  margin: 0 23px;
}
.gray-month {
  color: #222;
}
.days-sign {
  background-color: #ffae00;
  // color: #fff;
}
.start-sign {
  border-top-left-radius: 36px;
  border-bottom-left-radius: 36px;
}
.end-sign {
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;
}
/* end */
</style>
