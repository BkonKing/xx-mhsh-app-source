<template>
  <div class="tf-bg tf-body">
    <van-nav-bar
      title="生活缴费"
      :fixed="true"
      :border="false"
      placeholder
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="tf-body-container">
      <van-notice-bar
        v-if="payInfo.total > 0"
        class="swiper-nav"
        left-icon="warning"
        background="rgba(249,134,107,0.2)"
        :scrollable="false"
      >
        还需缴费￥{{ payInfo.total }}（
        {{ payInfo.current ? `&nbsp;本月￥${payInfo.current}` : "" }}
        {{ payInfo.last ? `&nbsp;往月￥${payInfo.last}` : "" }}
        ）</van-notice-bar
      >
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="handleChange"
      >
        <div class="month-bill" v-for="(item, index) in payList" :key="index">
          <div class="month-text">{{ item.date | dateText }}</div>
          <div class="unpay-number">待缴费￥{{ item.total }}</div>
          <ul class="pay-list-container">
            <li v-for="(li, i) in item.list" :key="i" class="pay-list-item">
              <van-checkbox
                class="pay-checkbox"
                checked-color="#EB5841"
                :name="`${li.id}-${li.number}`"
                :disabled="Boolean(li.coerceStatus)"
              ></van-checkbox>
              <div class="pay-info" @click="goCostDetail(li)">
                <div class="pay-info-left">
                  <span
                    class="pay-type-icon tf-icon"
                    :class="li.type | payTypeIcon"
                  ></span>
                  <span class="pay-title">{{ li.type | payTypeText }}</span>
                </div>
                <div class="pay-info-right">
                  <div class="pay-number">￥{{ li.number }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-checkbox-group>
    </div>
    <div class="pay-footer">
      <van-checkbox
        class="pay-checkbox"
        checked-color="#EB5841"
        v-model="checked"
        >全选</van-checkbox
      >
      <div>
        <span class="pay-sum"
          >合计：<span class="tf-text-primary">￥{{ payTotal }}</span></span
        >
        <van-button class="btn" :disabled="!result.length" @click="handlePay"
          >缴费({{ result.length }}项)</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, NoticeBar, CheckboxGroup, Checkbox, Button } from 'vant'
import filters from './filters'
export default {
  name: 'livePayPay',
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Button.name]: Button,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  },
  data () {
    return {
      checked: false,
      houseId: '',
      result: [],
      coerceResult: [],
      payBranches: 0,
      payTotal: 0,
      payInfo: {},
      payList: [] // 待缴费列表
    }
  },
  created () {
    this.houseId = this.$route.query.houseId
    this.getPayInfo()
  },
  mounted () {
    this.checked = true
  },
  methods: {
    // 获取缴费信息
    getPayInfo () {
      this.payInfo = {
        total: 1000,
        current: 200,
        last: 300
      }
      this.payList = [
        {
          date: 1606780800000,
          total: 500,
          payNum: 200,
          unPayNum: 300,
          list: [
            {
              id: 0,
              type: 0,
              coerceStatus: 1,
              number: 200
            },
            {
              id: 1,
              type: 1,
              coerceStatus: 0,
              number: 300
            }
          ]
        },
        {
          date: 1604188800000,
          total: 500,
          payNum: 200,
          unPayNum: 300,
          list: [
            {
              id: 2,
              type: 0,
              coerceStatus: 1,
              number: 200
            },
            {
              id: 3,
              type: 1,
              coerceStatus: 0,
              number: 300
            }
          ]
        }
      ]
      let num = 0; const result = []
      this.payList.forEach(obj => {
        num += obj.list.length
        obj.list.forEach(li => {
          if (li.coerceStatus) {
            result.push(`${li.id}-${li.number}`)
          }
        })
      })
      this.payBranches = num
      this.coerceResult = result
    },
    handleChange (result) {
      let sum = 0
      result.forEach(obj => {
        sum += parseFloat(obj.split('-')[1])
      })
      if (result.length === this.payBranches) {
        !this.checked && (this.checked = true)
      } else {
        this.checked = false
      }
      this.payTotal = sum
    },
    // 缴费
    handlePay () {
      const id = this.result.map(obj => obj.split('-')[0])
      console.log(id)
    },
    // 全选
    checkAll (type) {
      this.$refs.checkboxGroup.toggleAll(type)
    },
    // 跳转费用详情
    goCostDetail ({ id }) {
      this.$router.push({
        name: 'livePayCostDetail',
        query: {
          id,
          houseId: this.houseId
        }
      })
    }
  },
  watch: {
    checked (val) {
      if (val) {
        this.checkAll(val)
      } else {
        if (this.result.length === this.payBranches) {
          this.checkAll(false)
          this.result = JSON.parse(JSON.stringify(this.coerceResult))
        }
      }
    }
  },
  filters
}
</script>

<style lang="less" scoped>
.swiper-nav {
  height: 66px;
  margin: 30px 20px 0;
  border-radius: 10px;
  /deep/ .van-notice-bar__left-icon {
    margin-right: 10px;
  }
  /deep/ .van-notice-bar__content {
    color: #eb5841;
    font-size: 24px;
  }
  .notice-swipe {
    height: 66px;
    /deep/ .van-swipe-item {
      line-height: 66px;
    }
  }
}
.month-bill {
  padding: 0 30px;
  margin-top: 40px;
  .month-text {
    font-size: 28px;
  }
  .unpay-number {
    font-size: 24px;
    color: #8f8f94;
    margin-top: 6px;
  }
  .pay-list-container {
    width: 100%;
    margin-top: 30px;
    .pay-list-item {
      display: flex;
      .pay-checkbox {
        width: 80px;
        display: flex;
        justify-content: center;
      }
    }
    .pay-list-item + .pay-list-item {
      margin-top: 30px;
    }
    .pay-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      height: 140px;
      padding: 30px;
      background: #ffffff;
      border-radius: 10px;
      .pay-info-left {
        display: flex;
        align-items: center;
        .pay-type-icon {
          font-size: 66px;
          line-height: 1;
        }
        .pay-title {
          font-size: 30px;
          margin-left: 27px;
        }
      }
      .pay-info-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        .pay-number {
          font-size: 34px;
          font-weight: 600;
          color: #eb5841;
        }
      }
    }
    .pay-list-item + .pay-list-item {
      border-top: 1px solid #f0f0f0;
    }
  }
}
.pay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 0 20px 0 30px;
  background: #ffffff;
  .pay-sum {
    font-size: 24px;
    color: #8f8f94;
    .tf-text-primary {
      font-size: 34px;
      margin-right: 30px;
    }
  }
  .btn {
    width: 200px;
    height: 88px;
    background: linear-gradient(-90deg, #eb5841, #f9866b);
    border-radius: 10px;
    color: #fff;
    border: none;
  }
}
/deep/ .pay-checkbox {
  .van-checkbox__icon {
    height: 32px;
    line-height: 32px;
    .van-icon {
      width: 32px;
      height: 32px;
      font-size: 26px;
    }
  }
  .van-checkbox__label {
    font-size: 24px;
    color: #8f8f94;
  }
}
/deep/ .van-checkbox__icon--disabled .van-icon {
  color: #fff;
  border-color: #eb5841;
  background-color: #eb5841;
}
</style>
