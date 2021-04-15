<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="充缴记录"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <van-dropdown-menu class="filtrate-dropdown-menu">
      <van-dropdown-item ref="monthActive">
        <ul class="filtrate-list month-filtrate">
          <li
            class="filtrate-item"
            :class="{
              'filtrate-item-active': monthActive == item.value
            }"
            v-for="(item, i) in monthList"
            :key="i"
            @click="changeMonth(item)"
          >
            {{ item.text }}
          </li>
        </ul>
        <template #title>
          {{ monthActive === "" ? "账单月份" : monthName }}
        </template>
      </van-dropdown-item>
      <van-dropdown-item ref="payType">
        <div class="type-filtrate">
          <ul class="filtrate-list">
            <li
              class="filtrate-item"
              :class="{ 'filtrate-item-active': billType === item.value }"
              v-for="(item, i) in billTypeList"
              :key="i"
              @click="changeBillType(item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <ul class="filtrate-list">
            <li
              class="filtrate-item"
              :class="{ 'filtrate-item-active': payType === item.value }"
              v-for="(item, i) in showPayTypeList"
              :key="i"
              @click="changePayType(item)"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
        <template #title>
          {{ detailType }}
        </template>
      </van-dropdown-item>
      <van-dropdown-item ref="moneyFiltrate" @open="openMoneyFiltrate">
        <div class="money-filtrate">
          <div class="tf-flex">
            <van-field
              class="money-input"
              v-model="lowestMoney"
              type="number"
              placeholder="最低金额"
            >
              <template v-slot:left-icon>
                ￥
              </template>
            </van-field>
            <span class="money-range"></span>
            <van-field
              class="money-input"
              v-model="highestMoney"
              type="number"
              placeholder="最高金额"
            >
              <template v-slot:left-icon>
                ￥
              </template>
            </van-field>
          </div>
          <div class="flex-end">
            <van-button
              class="money-btn money-reset"
              size="small"
              round
              @click="resetFiltrateMoney"
              >重置</van-button
            >
            <van-button
              class="money-btn"
              size="small"
              round
              type="primary"
              :disabled="!lowestMoney && !highestMoney"
              @click="confirmFiltrateMoney"
              >确定</van-button
            >
          </div>
        </div>
        <template #title>
          {{ moneyFiltrate }}
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="tf-body-container">
      <refreshList
        class="recordList"
        ref="recordList"
        id="recordList"
        :list.sync="recordList"
        :load="getRecordList"
      >
        <template v-slot="{ item }">
          <div class="pay-base-info">
            <div class="record-date">
              {{ item.month_name | date }}
            </div>
            <div class="record-paynum">
              <span v-if="item.z_renew" class="tf-mr-sm"
                >缴费 ￥{{ item.z_renew }}</span
              >
              <span v-if="item.z_recharge" class="tf-mr-sm"
                >充值 ￥{{ item.z_recharge }}</span
              >
            </div>
          </div>
          <div class="pay-list">
            <div
              class="pay-item"
              v-for="(li, i) in item.list"
              :key="i"
              @click="goPayDetail(li)"
            >
              <div class="pay-item-left">
                <div class="pay-item-title">{{ li.name }}</div>
                <div class="pay-item-time">{{ li.pay_time }}</div>
              </div>
              <div class="pay-item-right">
                <div class="pay-item-money">
                  {{ li.bill_type == 1 ? "+" : "-" }}{{ li.money }}
                </div>
                <div class="pay-item-time">余额 {{ li.balance }}</div>
              </div>
            </div>
          </div>
        </template>
      </refreshList>
    </div>
  </div>
</template>

<script>
import {
  getMonthList,
  getGenreList,
  getPayLogList
} from '@/api/butler/livepay'
import filters from './filters'
import refreshList from '@/components/tf-refresh-list'
export default {
  name: 'livePayRecord',
  components: {
    refreshList
  },
  data () {
    return {
      houseId: '',
      recordList: [],
      date: '',
      monthList: [], // 充缴月份列表
      monthActive: '', // 筛选账单月份
      monthName: '', // 账单月份显示文本
      billType: 0, // 筛选账单类型
      payType: '', // 筛选缴费类型
      billTypeName: '全部', // 筛选账单类型名称
      payTypeName: '全部', // 筛选缴费类型名称
      // 筛选缴费类型列表
      billTypeList: [
        { text: '全部', value: 0 },
        { text: '缴费', value: 2 },
        { text: '充值', value: 1 }
      ],
      payTypeList: [], // 缴费筛选缴费类型
      genreList: [], // 充值筛选缴费类型
      lowestMoney: '', // 筛选最低金额
      highestMoney: '', // 筛选最高金额
      isLowestMoney: '', // 确定的筛选最低金额
      isHighestMoney: '', // 确定的筛选最高金额
      scrollTop: 0
    }
  },
  computed: {
    detailType () {
      if (!this.billType && !this.payType) {
        return '明细类型'
      }
      if (!this.payType) {
        return this.billTypeName
      }
      return `${this.billTypeName}-${this.payTypeName}`
    },
    showPayTypeList () {
      return this.billType !== 1 ? this.payTypeList : this.genreList
    },
    moneyFiltrate () {
      if (!this.isLowestMoney && !this.isHighestMoney) {
        return '金额'
      } else if (!this.isLowestMoney) {
        return `￥${this.isHighestMoney}以下`
      } else if (!this.isHighestMoney) {
        return `￥${this.isLowestMoney}以上`
      } else {
        return `￥${this.isLowestMoney}-${this.isHighestMoney}`
      }
    }
  },
  created () {
    this.houseId = this.$route.query.houseId
    this.getMonthList()
    this.getGenreList()
  },
  activated () {
    this.scrollTop &&
      (document.getElementById('recordList').scrollTop = this.scrollTop)
  },
  methods: {
    // 获取月份记录月份列表
    getMonthList () {
      getMonthList({
        expenses_house_id: this.houseId
      }).then(({ data }) => {
        this.monthList = data || []
      })
    },
    // 获取充缴记录明细类型
    getGenreList () {
      getGenreList({
        expenses_house_id: this.houseId
      }).then(({ pay_data, recharge_data }) => {
        this.payTypeList = pay_data || []
        this.genreList = recharge_data || []
      })
    },
    // 账单月份
    changeMonth ({ value, text }) {
      this.monthActive = value
      this.monthName = text
    },
    // 账单类型
    changeBillType ({ value, text }) {
      // 切换到充值，并且当前缴费类型充值需要有
      if (
        !(
          value === 1 &&
          this.genreList.findIndex(
            obj => obj.value === this.payType && obj.value !== '4'
          ) !== -1
        ) &&
        !(
          value !== 1 &&
          this.payTypeList.findIndex(obj => obj.value === this.payType) !==
            -1 &&
          (this.billType !== 1 || this.payType !== '4')
        )
      ) {
        this.payType = ''
        this.payTypeName = '全部'
      }
      this.billType = value
      this.billTypeName = text
      this.listReload()
      this.closeMenu('payType')
    },
    // 缴费/充值种类
    changePayType ({ value, text }) {
      this.payType = value
      this.payTypeName = text
      this.listReload()
      this.closeMenu('payType')
    },
    // 金额筛选打开事件
    openMoneyFiltrate () {
      this.lowestMoney = this.isLowestMoney
      this.highestMoney = this.isHighestMoney
    },
    // 确定金额筛选条件
    confirmFiltrateMoney () {
      if (parseFloat(this.lowestMoney) > parseFloat(this.highestMoney)) {
        this.isLowestMoney = parseFloat(this.highestMoney)
        this.isHighestMoney = parseFloat(this.lowestMoney)
      } else {
        this.isLowestMoney = parseFloat(this.lowestMoney)
        this.isHighestMoney = parseFloat(this.highestMoney)
      }
      this.closeMenu('moneyFiltrate')
      this.listReload()
    },
    // 重置金额筛选条件
    resetFiltrateMoney () {
      this.lowestMoney = ''
      this.highestMoney = ''
      this.isLowestMoney = ''
      this.isHighestMoney = ''
      this.listReload()
    },
    // 获取缴费记录列表
    getRecordList (params) {
      const param = {
        expenses_house_id: this.houseId,
        month_name: this.monthActive,
        bill_type: this.billType,
        genre_type: this.payType,
        genre_id: this.payType,
        min_money: this.isLowestMoney,
        max_money: this.isHighestMoney
      }
      return getPayLogList(param).then(({ data }) => {
        return Promise.resolve({
          data
        })
      })
    },
    // 列表时间选择重新渲染列表
    listReload () {
      this.$refs.recordList.reload()
    },
    // 关闭菜单下拉框
    closeMenu (ref) {
      this.$refs[ref].toggle(false)
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
  watch: {
    monthActive () {
      this.listReload()
      this.closeMenu('monthActive')
    }
  },
  filters,
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.getElementById('recordList').scrollTop
    if (to.name !== 'livePayRecordDetail') {
      this.$store.commit('deleteKeepAlive', from.name)
      this.$destroy()
    }
    next()
  }
}
</script>

<style lang="less" scoped>
// 月份筛选
.month-filtrate {
  .filtrate-item {
    width: 223px;
  }
}
// 明细类型
.type-filtrate {
  padding: 0 30px;
  .filtrate-list {
    padding: 35px 0 20px;
  }
  .filtrate-list:first-child {
    border-bottom: 2px dotted #f0f0f0;
  }
  .filtrate-list + .filtrate-list {
    margin-right: -10px;
  }
  .filtrate-item {
    min-width: 165px;
  }
}
.filtrate-list {
  display: flex;
  flex-wrap: wrap;
  padding: 34px 20px 20px 30px;
  .filtrate-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66px;
    padding: 0 20px;
    margin-right: 10px;
    margin-bottom: 20px;
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    font-size: 26px;
    line-height: 1;
    color: #8f8f94;
  }
  .filtrate-item-active {
    border-color: #eb5841;
    color: #eb5841;
  }
}
// 金额筛选
.money-filtrate {
  padding: 55px 30px 60px;
  .money-input {
    width: 295px;
    height: 88px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    /deep/ .van-field__left-icon {
      display: flex;
      align-items: center;
      font-size: 34px;
    }
    /deep/ .van-field__body {
      height: 100%;
      .van-field__control {
        height: 100%;
        font-size: 34px;
        &::placeholder {
          font-size: 24px;
        }
      }
    }
  }
  .money-range {
    width: 50px;
    height: 2px;
    margin: auto 25px;
    background: #000000;
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
  }
  .money-btn {
    width: 160px;
    font-size: 30px;
  }
  .money-btn + .money-btn {
    margin-left: 20px;
  }
  .money-reset {
    background: #aaa;
    border-color: #aaa;
    color: #fff;
  }
}
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
    margin-top: 10px;
    font-size: 24px;
    line-height: 1;
    color: #8f8f94;
    .tf-mr-sm {
      margin-right: 20px;
    }
  }
}
// 缴费记录列表
.recordList {
  height: 100%;
  padding-top: 40px;
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
    height: 145px;
    &-title {
      font-size: 30px;
    }
    &-time {
      font-size: 24px;
      color: @gray-7;
      margin-top: 10px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 34px;
    }
    &-money {
      line-height: 42px;
    }
  }
  .pay-item + .pay-item {
    border-top: 1px solid @divider-color;
  }
}
.tf-ml-sm {
  margin-left: 16px;
}
// 下拉菜单
/deep/ .van-dropdown-menu__bar {
  height: 90px;
  box-shadow: initial;
  .van-dropdown-menu__title {
    font-size: 28px;
    &:after {
      margin-top: -9px;
      right: 4px;
      border: 6px solid;
      border-color: transparent transparent #aaaaaa #aaaaaa;
    }
    &.van-dropdown-menu__title--down:after {
      margin-top: -3px;
    }
  }
  .van-dropdown-menu__title--active:after {
    border-color: transparent transparent #eb5841 #eb5841;
  }
}
</style>
