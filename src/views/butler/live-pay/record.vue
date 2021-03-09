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
    <div class="tf-body-container">
      <van-dropdown-menu class="filtrate-dropdown-menu">
        <van-dropdown-item ref="monthActive">
          <ul class="filtrate-list month-filtrate">
            <li
              class="filtrate-item"
              :class="{
                'filtrate-item-active': monthActive == item
              }"
              v-for="(item, i) in monthList"
              :key="i"
              @click="monthActive = item"
            >
              {{ item }}
            </li>
          </ul>
          <template #title>
            {{ monthActive === "全部" ? "账单月份" : monthActive }}
          </template>
        </van-dropdown-item>
        <van-dropdown-item ref="payType">
          <div class="type-filtrate">
            <ul class="filtrate-list">
              <li
                class="filtrate-item"
                :class="{ 'filtrate-item-active': payWay === item.value }"
                v-for="(item, i) in payWayList"
                :key="i"
                @click="payWay = item.value"
              >
                {{ item.text }}
              </li>
            </ul>
            <ul class="filtrate-list">
              <li
                class="filtrate-item"
                :class="{ 'filtrate-item-active': payType === item.value }"
                v-for="(item, i) in payTypeList"
                :key="i"
                @click="payType = item.value"
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
      <refreshList
        class="recordList"
        ref="recordList"
        :list.sync="recordList"
        :load="getRecordList"
      >
        <template v-slot="{ item }">
          <div class="pay-base-info">
            <div class="record-date">
              {{ item.valueText | dateText }}
            </div>
            <div class="record-paynum">
              <span>缴费 ￥{{ item.already_money }}</span>
              <span class="tf-ml-sm">充值 ￥{{ item.already_money }}</span>
            </div>
          </div>
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
              <div class="pay-item-right">
                <div class="pay-item-money">-{{ li.money }}</div>
                <div class="pay-item-time">余额 {{ li.money }}</div>
              </div>
            </div>
          </div>
        </template>
      </refreshList>
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
      recordList: [],
      date: '',
      monthList: [], // 缴费月份列表
      monthActive: '全部', // 筛选账单月份
      payWay: 0, // 筛选缴费类型
      payType: 0, // 筛选缴费类型
      // 筛选缴费类型列表
      payWayList: [
        { text: '全部', value: 0 },
        { text: '缴费', value: 1 },
        { text: '充值', value: 2 }
      ],
      // 筛选缴费类型
      payTypeList: [
        { text: '全部', value: 0 },
        { text: '水费', value: 1 },
        { text: '电费', value: 2 },
        { text: '燃气费', value: 3 },
        { text: '物业费', value: 4 }
      ],
      lowestMoney: '', // 筛选最低金额
      highestMoney: '', // 筛选最高金额
      isLowestMoney: '', // 确定的筛选最低金额
      isHighestMoney: '' // 确定的筛选最高金额
    }
  },
  computed: {
    detailType () {
      if (!this.payWay && !this.payType) {
        return '明细类型'
      }
      return `${this.payWayList[this.payWay].text}-${
        this.payTypeList[this.payType].text
      }`
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
  methods: {
    // 金额筛选打开事件
    openMoneyFiltrate () {
      this.lowestMoney = this.isLowestMoney
      this.highestMoney = this.isHighestMoney
    },
    // 确定金额筛选条件
    confirmFiltrateMoney () {
      if (this.lowestMoney > this.highestMoney) {
        this.isLowestMoney = this.highestMoney
        this.isHighestMoney = this.lowestMoney
      } else {
        this.isLowestMoney = this.lowestMoney
        this.isHighestMoney = this.highestMoney
      }
      this.$refs.moneyFiltrate.toggle(false)
      this.listReload()
    },
    // 重置金额筛选条件
    resetFiltrateMoney () {
      this.lowestMoney = ''
      this.highestMoney = ''
      this.isLowestMoney = ''
      this.isHighestMoney = ''
    },
    // 获取缴费记录列表
    getRecordList (params) {
      return getPayRecord({
        setmeal_days: this.monthActive,
        payWay: this.payWay,
        payType: this.payType
      }).then(({ data, month_data }) => {
        this.monthList = ['全部'].concat(month_data)
        return Promise.resolve({
          data
        })
      })
    },
    // 列表时间选择重新渲染列表
    listReload () {
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
  watch: {
    monthActive () {
      this.listReload()
    },
    payWay () {
      this.listReload()
    },
    payType () {
      this.listReload()
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
    width: 165px;
  }
}
.filtrate-list {
  display: flex;
  flex-wrap: wrap;
  padding: 40px 20px 20px 30px;
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
        font-size: 24px;
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
  }
}
// 缴费记录列表
.recordList {
  height: calc(100% - 90px);
  padding-top: 40px;
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
      font-size: 38px;
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
</style>
